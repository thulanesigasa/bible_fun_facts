import { createHmac } from "node:crypto";
import { isIP } from "node:net";

const MAX_BODY_BYTES = 4096;
const PROJECT_URL = "https://ibwooiejzxhbzplnldcz.supabase.co";
const ACCEPTED =
  "Your launch-notification request is recorded. If you were already subscribed, your existing entry is unchanged.";
type Dependencies = {
  env?: Record<string, string | undefined>;
  fetch?: typeof fetch;
};
function reply(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(status === 429 ? { "Retry-After": "900" } : {}),
    },
  });
}
export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (
    email.length > 254 ||
    !/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email)
  )
    return null;
  const [local, domain] = email.split("@");
  if (
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..")
  )
    return null;
  if (
    domain
      .split(".")
      .some(
        (label) =>
          !label ||
          label.length > 63 ||
          label.startsWith("-") ||
          label.endsWith("-"),
      )
  )
    return null;
  return email;
}
async function boundedJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES)
    throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  let length = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export async function handleWaitlist(
  request: Request,
  dependencies: Dependencies = {},
) {
  if (request.method !== "POST")
    return reply(405, { error: "Method not allowed." });
  const env = dependencies.env ?? process.env;
  const fetcher = dependencies.fetch ?? fetch;
  // Fail closed until the deployment is configured. Never fall back to another project.
  const secret = env.SUPABASE_SERVICE_ROLE_KEY;
  const salt = env.WAITLIST_RATE_LIMIT_SALT;
  const site = env.WAITLIST_SITE_URL;
  const ipHeader = env.WAITLIST_TRUSTED_IP_HEADER;
  if (
    !secret ||
    !salt ||
    salt.length < 32 ||
    !site ||
    !ipHeader ||
    (env.SUPABASE_URL && env.SUPABASE_URL !== PROJECT_URL)
  )
    return reply(503, {
      error: "The waiting list is not ready yet. Please try again later.",
    });
  let allowedOrigin: string;
  try {
    allowedOrigin = new URL(site).origin;
  } catch {
    return reply(503, {
      error: "The waiting list is temporarily unavailable.",
    });
  }
  if (request.headers.get("origin") !== allowedOrigin)
    return reply(403, {
      error: "Please submit the form from the exégeomai website.",
    });
  if (
    !/^application\/json(?:\s*;|$)/i.test(
      request.headers.get("content-type") || "",
    )
  )
    return reply(415, { error: "A JSON request is required." });
  // Set this only to a header that the hosting ingress overwrites (not arbitrary X-Forwarded-For).
  const ip = request.headers.get(ipHeader)?.trim();
  if (!ip || !isIP(ip))
    return reply(503, {
      error:
        "We could not securely process your request. Please try again later.",
    });
  let body: unknown;
  try {
    body = await boundedJson(request);
  } catch (error) {
    return reply(error instanceof RangeError ? 413 : 400, {
      error:
        error instanceof RangeError
          ? "The request is too large."
          : "Invalid request. Please check the form.",
    });
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return reply(400, { error: "Invalid request. Please check the form." });
  const payload = body as Record<string, unknown>;
  const email = normalizeEmail(payload.email);
  if (!email)
    return reply(400, { error: "Please enter a valid email address." });
  if (payload.consent !== true)
    return reply(400, {
      error: "Please agree to receive launch notifications.",
    });
  if (payload.website !== undefined && payload.website !== "")
    return reply(400, { error: "We could not accept this request." });
  const key = createHmac("sha256", salt).update(ip).digest("hex");
  try {
    const response = await fetcher(
      `${PROJECT_URL}/rest/v1/rpc/register_launch_waitlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: secret,
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          p_email: email,
          p_consent: true,
          p_ip_hash: key,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok)
      return reply(503, {
        error: "We could not confirm your request. Please try again later.",
      });
    const result: unknown = await response.json();
    if (result === "rate_limited")
      return reply(429, {
        error: "Too many requests. Please wait 15 minutes and try again.",
      });
    if (result !== "accepted")
      return reply(503, {
        error: "We could not confirm your request. Please try again later.",
      });
    // Only a committed database result reaches this branch; duplicates return the same response.
    return reply(200, { success: true, message: ACCEPTED });
  } catch {
    return reply(503, {
      error: "We could not confirm your request. Please try again later.",
    });
  }
}
