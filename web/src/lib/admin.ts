import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
export const ADMIN_COOKIE = 'exegeomai_admin_session';
const PROJECT_URL = 'https://ibwooiejzxhbzplnldcz.supabase.co';
type Env = Record<string, string | undefined>;
export type AdminUser = { id: string; email: string };
export type WaitlistStats = {
  total: number; today: number; last7Days: number; last30Days: number;
  latestSignup: string | null; updatedAt: string; timezone: string;
  daily: { date: string; count: number }[];
};
type Dependencies = { env?: Env; fetch?: typeof fetch };
export function adminConfiguration(env: Env = process.env) {
  const ids = (env.ADMIN_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  const key = env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY;
  const secret = env.SUPABASE_SERVICE_ROLE_KEY;
  const salt = env.ADMIN_RATE_LIMIT_SALT;
  const site = env.ADMIN_SITE_URL || env.WAITLIST_SITE_URL;
  const ipHeader = env.ADMIN_TRUSTED_IP_HEADER || env.WAITLIST_TRUSTED_IP_HEADER;
  if (!ids.length || ids.some(id => !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id)) ||
      !key || !secret || !salt || salt.length < 32 || !site || !ipHeader ||
      (env.SUPABASE_URL && env.SUPABASE_URL !== PROJECT_URL)) return null;
  try {
    const url = new URL(site);
    if (env.NODE_ENV === 'production' && url.protocol !== 'https:') return null;
    return { ids, key, secret, salt, origin: url.origin, ipHeader };
  } catch { return null; }
}
export function privateReply(status: number, body: object) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow' } });
}
export async function getAdminUser(token: string | undefined, dependencies: Dependencies = {}): Promise<AdminUser | null> {
  const config = adminConfiguration(dependencies.env);
  if (!config || !token || token.length > 8192) return null;
  try {
    const response = await (dependencies.fetch || fetch)(`${PROJECT_URL}/auth/v1/user`, {
      headers: { apikey: config.key, Authorization: `Bearer ${token}` },
      cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const user = await response.json();
    // Never trust client-editable user_metadata or merely decode a JWT.
    if (!config.ids.includes(user.id) || typeof user.email !== 'string' || !user.email_confirmed_at || user.is_anonymous) return null;
    return { id: user.id, email: user.email };
  } catch { return null; }
}
async function boundedJson(request: Request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) throw Error('content-type');
  const reader = request.body?.getReader(); if (!reader) throw Error('body');
  const parts: Uint8Array[] = []; let length = 0;
  try { for (;;) { const { value, done } = await reader.read(); if (done) break;
    length += value.byteLength; if (length > 4096) { await reader.cancel(); throw Error('size'); } parts.push(value);
  } } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(parts).toString('utf8'));
}
export async function handleAdminLogin(request: Request, dependencies: Dependencies = {}) {
  const env = dependencies.env || process.env;
  const config = adminConfiguration(env); const fetcher = dependencies.fetch || fetch;
  if (!config) return privateReply(503, { error: 'Admin access is not configured yet. Contact the site owner.' });
  if (request.headers.get('origin') !== config.origin) return privateReply(403, { error: 'Please sign in from this website.' });
  const ip = request.headers.get(config.ipHeader)?.trim();
  if (!ip || !isIP(ip)) return privateReply(503, { error: 'Secure sign-in is temporarily unavailable.' });
  let body;
  try { body = await boundedJson(request); } catch { return privateReply(400, { error: 'Invalid sign-in request.' }); }
  if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.email !== 'string' ||
      typeof body.password !== 'string' || !body.password || body.password.length > 1024 ||
      body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return privateReply(400, { error: 'Enter a valid email and password.' });
  const email = body.email.trim().toLowerCase();
  const hash = (value: string) => createHmac('sha256', config.salt).update(value).digest('hex');
  try {
    const limited = await fetcher(`${PROJECT_URL}/rest/v1/rpc/consume_admin_login_attempt`, {
      method: 'POST', headers: { apikey: config.secret, Authorization: `Bearer ${config.secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_ip_hash: hash(`ip:${ip}`), p_email_hash: hash(`email:${email}`) }),
      cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    if (!limited.ok) return privateReply(503, { error: 'Secure sign-in is temporarily unavailable.' });
    const allowed: unknown = await limited.json();
    if (allowed === false) { const r = privateReply(429, { error: 'Too many sign-in attempts. Try again in 15 minutes.' }); r.headers.set('Retry-After', '900'); return r; }
    if (allowed !== true) return privateReply(503, { error: 'Secure sign-in is temporarily unavailable.' });
    const signed = await fetcher(`${PROJECT_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: config.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: body.password }), cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    if (!signed.ok) return privateReply(401, { error: 'Unable to sign in with an authorised admin account.' });
    const session = await signed.json();
    if (typeof session.access_token !== 'string' || !/^[A-Za-z0-9_.-]{20,8192}$/.test(session.access_token) ||
        !Number.isFinite(session.expires_in) || session.expires_in <= 0) return privateReply(503, { error: 'Secure sign-in is temporarily unavailable.' });
    const user = await getAdminUser(session.access_token, { env, fetch: fetcher });
    if (!user) return privateReply(401, { error: 'Unable to sign in with an authorised admin account.' });
    const ttl = Math.min(Math.floor(session.expires_in), 3600);
    const response = privateReply(200, { success: true });
    response.headers.set('Set-Cookie', `${ADMIN_COOKIE}=${session.access_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${ttl}${env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    return response;
  } catch { return privateReply(503, { error: 'Secure sign-in is temporarily unavailable.' }); }
}
export async function handleAdminStats(token: string | undefined, dependencies: Dependencies = {}) {
  const config = adminConfiguration(dependencies.env);
  if (!config) return privateReply(503, { error: 'Admin access is not configured yet.' });
  const user = await getAdminUser(token, dependencies);
  if (!user) return privateReply(401, { error: 'Sign in with an authorised admin account.' });
  try {
    const response = await (dependencies.fetch || fetch)(`${PROJECT_URL}/rest/v1/rpc/get_launch_waitlist_stats`, {
      method: 'POST', headers: { apikey: config.secret, Authorization: `Bearer ${config.secret}`, 'Content-Type': 'application/json' },
      body: '{}', cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return privateReply(503, { error: 'Waiting-list data is unavailable. Check the database migration and service configuration.' });
    const data: unknown = await response.json();
    const stats = validateStats(data);
    if (!stats) return privateReply(503, { error: 'The waiting-list service returned an invalid response.' });
    // Allowlist response fields; never proxy arbitrary database payloads or email lists.
    return privateReply(200, stats);
  } catch { return privateReply(503, { error: 'Waiting-list data is temporarily unavailable.' }); }
}
export function validateStats(data: unknown): WaitlistStats | null {
  if (!data || typeof data !== 'object') return null;
  const s = data as WaitlistStats;
  if (![s.total,s.today,s.last7Days,s.last30Days].every(n=>Number.isSafeInteger(n) && n>=0) ||
      typeof s.updatedAt !== 'string' || !Number.isFinite(Date.parse(s.updatedAt)) || s.timezone !== 'Africa/Johannesburg' ||
      (s.latestSignup !== null && (typeof s.latestSignup !== 'string' || !Number.isFinite(Date.parse(s.latestSignup)))) ||
      !Array.isArray(s.daily) || s.daily.length !== 30 || s.daily.some(d=>!d || !/^\d{4}-\d{2}-\d{2}$/.test(d.date) || !Number.isSafeInteger(d.count) || d.count<0)) return null;
  return { total:s.total,today:s.today,last7Days:s.last7Days,last30Days:s.last30Days,latestSignup:s.latestSignup,updatedAt:s.updatedAt,timezone:s.timezone,daily:s.daily.map(d=>({date:d.date,count:d.count})) };
}
