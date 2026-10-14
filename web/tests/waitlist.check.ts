import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { handleWaitlist, normalizeEmail } from "../src/lib/waitlist";

const db = new PGlite();
const env = {
  SUPABASE_SERVICE_ROLE_KEY: "test-only-key",
  WAITLIST_RATE_LIMIT_SALT: "test-only-salt-32-characters-long!!",
  WAITLIST_SITE_URL: "https://exegeomai.app",
  WAITLIST_TRUSTED_IP_HEADER: "x-test-ip",
};
let rpcCalls = 0;
const databaseFetch: typeof fetch = async (url, init) => {
  rpcCalls++;
  assert.equal(
    url,
    "https://ibwooiejzxhbzplnldcz.supabase.co/rest/v1/rpc/register_launch_waitlist",
  );
  const args = JSON.parse(String(init?.body));
  assert.match(args.p_ip_hash, /^[a-f0-9]{64}$/);
  assert.equal(
    (init?.headers as Record<string, string>).Authorization,
    "Bearer test-only-key",
  );
  try {
    const { rows } = await db.query<{ result: string }>(
      "select public.register_launch_waitlist($1,$2,$3) as result",
      [args.p_email, args.p_consent, args.p_ip_hash],
    );
    return Response.json(rows[0].result);
  } catch {
    return Response.json({ error: "database error" }, { status: 500 });
  }
};
function req(
  payload: unknown = {
    email: "reader@example.com",
    consent: true,
    website: "",
  },
  headers: Record<string, string> = {},
  body?: string,
) {
  return new Request("https://exegeomai.app/api/waitlist", {
    method: "POST",
    headers: {
      origin: "https://exegeomai.app",
      "content-type": "application/json",
      "x-test-ip": "192.0.2.1",
      ...headers,
    },
    body: body ?? JSON.stringify(payload),
  });
}
const call = (request: Request) =>
  handleWaitlist(request, { env, fetch: databaseFetch });
before(async () => {
  await db.exec(
    "create role anon; create role authenticated; create role service_role bypassrls; grant usage on schema public to anon, authenticated, service_role;",
  );
  // Match legacy Supabase defaults to prove the migration explicitly removes public grants.
  await db.exec(
    "alter default privileges in schema public grant all on tables to anon, authenticated, service_role; alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;",
  );
  await db.exec(
    await readFile(
      new URL(
        "../../supabase/migrations/20261013061117_launch_waitlist.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec("set role service_role");
});
after(() => db.close());
test("normalises valid email; rejects malformed addresses and unsafe types", () => {
  assert.equal(
    normalizeEmail(" Reader+tag@Example.COM "),
    "reader+tag@example.com",
  );
  for (const value of [
    null,
    [],
    42,
    "bad",
    "a@b",
    "x..y@example.com",
    ".x@example.com",
    "x.@example.com",
    "x@-example.com",
    "x@example..com",
    "x@example.com\r\nBcc:x@evil.com",
    "a".repeat(65) + "@example.com",
  ])
    assert.equal(normalizeEmail(value), null, String(value));
});
test("invalid email, consent, JSON, honeypot and origin never reach the database", async () => {
  for (const payload of [
    { email: "bad", consent: true },
    { email: "a@example.com", consent: "true" },
    { email: "a@example.com", consent: false },
    { email: "a@example.com", consent: true, website: "bot" },
    null,
    [],
  ])
    assert.equal((await call(req(payload))).status, 400);
  assert.equal((await call(req({}, {}, "{"))).status, 400);
  assert.equal(
    (await call(req(undefined, { origin: "https://evil.example" }))).status,
    403,
  );
  assert.equal(
    (await call(req(undefined, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal((await call(req(undefined, {}, "x".repeat(4097)))).status, 413);
  assert.equal(rpcCalls, 0);
});
test("configuration, wrong project and missing trusted IP fail closed", async () => {
  assert.equal((await handleWaitlist(req(), { env: {} })).status, 503);
  assert.equal(
    (
      await handleWaitlist(req(), {
        env: { ...env, SUPABASE_URL: "https://wrong.supabase.co" },
      })
    ).status,
    503,
  );
  assert.equal(
    (await call(req(undefined, { "x-test-ip": "unknown" }))).status,
    503,
  );
  assert.equal(rpcCalls, 0);
});
test("inserts without an account and returns same response on case-insensitive duplicates", async () => {
  const first = await call(req());
  assert.equal(first.status, 200);
  const firstBody = await first.json();
  assert.equal(firstBody.success, true);
  const rowsBefore = await db.query("select * from public.launch_waitlist");
  assert.equal(rowsBefore.rows.length, 1);
  const second = await call(
    req({ email: " Reader@EXAMPLE.com ", consent: true }),
  );
  assert.deepEqual(await second.json(), firstBody);
  const rowsAfter = await db.query("select * from public.launch_waitlist");
  assert.deepEqual(rowsAfter.rows, rowsBefore.rows);
});
test("persistent IP limit rejects sixth attempt without saving the email", async () => {
  for (let i = 0; i < 3; i++)
    assert.equal(
      (await call(req({ email: `another${i}@example.com`, consent: true })))
        .status,
      200,
    );
  const limited = await call(
    req({ email: "blocked@example.com", consent: true }),
  );
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "900");
  assert.equal(
    (
      await db.query(
        "select email from public.launch_waitlist where email='blocked@example.com'",
      )
    ).rows.length,
    0,
  );
});
test("server never claims success on a failed or unexpected database response", async () => {
  for (const fetcher of [
    async () => Response.json({ error: "private detail" }, { status: 500 }),
    async () => Response.json("unexpected"),
    async () => {
      throw new Error("secret");
    },
  ]) {
    const response = await handleWaitlist(req(), { env, fetch: fetcher });
    assert.equal(response.status, 503);
    const json = await response.json();
    assert.equal(json.success, undefined);
    assert.ok(!JSON.stringify(json).includes("secret"));
  }
});
test("anonymous and authenticated roles cannot read, insert, mutate, or call the RPC", async () => {
  await db.exec("reset role");
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`set role ${role}`);
    for (const sql of [
      "select * from public.launch_waitlist",
      "select * from public.launch_waitlist_limits",
      "insert into public.launch_waitlist(email) values('attacker@example.com')",
      "delete from public.launch_waitlist",
      "select public.register_launch_waitlist('attack@example.com',true,repeat('a',64))",
    ])
      await assert.rejects(db.query(sql), /permission denied/);
    await db.exec("reset role");
  }
  const { rows } = await db.query<{ relrowsecurity: boolean }>(
    "select relrowsecurity from pg_class where relname in ('launch_waitlist','launch_waitlist_limits')",
  );
  assert.ok(rows.every((row) => row.relrowsecurity));
  assert.equal(
    (
      await db.query(
        "select * from pg_policies where tablename like 'launch_waitlist%'",
      )
    ).rows.length,
    0,
  );
  await db.exec("set role service_role");
});
test("SQL constraints and consent validation reject bad input", async () => {
  await assert.rejects(
    db.query(
      "select public.register_launch_waitlist('test@example.com',false,repeat('a',64))",
    ),
    /Invalid waitlist/,
  );
  await assert.rejects(
    db.query("insert into public.launch_waitlist(email) values('broken')"),
    /check constraint/,
  );
});
test("expired buckets reset and old buckets are cleaned", async () => {
  await db.exec(
    "update public.launch_waitlist_limits set window_start=now()-interval '2 days'; insert into public.launch_waitlist_limits values('old',now()-interval '2 days',1);",
  );
  assert.equal(
    (await call(req({ email: "fresh@example.com", consent: true }))).status,
    200,
  );
  assert.equal(
    (
      await db.query(
        "select * from public.launch_waitlist_limits where bucket_key='old'",
      )
    ).rows.length,
    0,
  );
});
test("global limit persists across IPs and stops writes", async () => {
  await db.exec(
    "update public.launch_waitlist_limits set attempts=500 where bucket_key='global'",
  );
  assert.equal(
    (
      await call(
        req(
          { email: "globalblocked@example.com", consent: true },
          { "x-test-ip": "192.0.2.250" },
        ),
      )
    ).status,
    429,
  );
  assert.equal(
    (
      await db.query(
        "select * from public.launch_waitlist where email='globalblocked@example.com'",
      )
    ).rows.length,
    0,
  );
});

test('unique constraint prevents simultaneous duplicate subscriptions', async () => {
  await db.exec("update public.launch_waitlist_limits set window_start=now()-interval '2 days'");
  const responses = await Promise.all(Array.from({length:4},(_,index)=>call(req({email:index%2?'Concurrent@EXAMPLE.com':'concurrent@example.com',consent:true},{'x-test-ip':`192.0.2.${100+index}`}))));
  assert.ok(responses.every(response=>response.status===200));
  assert.equal((await db.query("select * from public.launch_waitlist where email='concurrent@example.com'")).rows.length,1);
});

test('RLS independently hides rows even if a read grant is accidentally restored', async () => {
  await db.exec('reset role; begin; grant select on public.launch_waitlist to anon, authenticated;');
  try {
    for(const role of ['anon','authenticated']) {
      await db.exec(`set local role ${role}`);
      assert.equal((await db.query('select * from public.launch_waitlist')).rows.length,0);
      await db.exec('reset role');
    }
  } finally {await db.exec('rollback; set role service_role');}
});

test('triggers email dispatch callback upon accepted waitlist sign-up', async () => {
  let emailedAddress: string | null = null;
  const customCall = (request: Request) =>
    handleWaitlist(request, {
      env,
      fetch: databaseFetch,
      sendEmail: (email) => {
        emailedAddress = email;
      },
    });

  const response = await customCall(
    req(
      { email: "welcome@example.com", consent: true, website: "" },
      { "x-test-ip": "192.0.2.77" },
    ),
  );
  assert.equal(response.status, 200);
  assert.equal(emailedAddress, "welcome@example.com");
});
