-- Adversarial, transaction-scoped local RLS smoke test.
-- Aborts on any unauthorized read/write. Leaves no test data on success.
BEGIN;

INSERT INTO auth.users (
 id, instance_id, aud, role, email, encrypted_password,
 raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES
 ('11111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'rls-test-a@example.invalid', 'test-hash',
  '{}', '{"username":"rls_test_alpha"}', now(), now()),
 ('22222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'rls-test-b@example.invalid', 'test-hash',
  '{}', '{"username":"rls_test_beta"}', now(), now());

SET LOCAL ROLE anon;
DO $$
BEGIN
 IF EXISTS (SELECT 1 FROM public.profiles
            WHERE id = '11111111-1111-4111-8111-111111111111') THEN
   RAISE EXCEPTION 'Anonymous caller can read private profile';
 END IF;
END $$;

RESET ROLE;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', true);
SELECT set_config('request.jwt.claim.role', 'authenticated', true);

INSERT INTO public.ministries (name, founder)
VALUES ('RLS verification owned ministry', 'Test Founder');
DO $$
BEGIN
 IF NOT EXISTS (
   SELECT 1 FROM public.ministries
   WHERE name = 'RLS verification owned ministry'
     AND created_by = auth.uid()
 ) THEN
   RAISE EXCEPTION 'Authenticated ministry insert did not bind owner';
 END IF;
END $$;

INSERT INTO public.branches (ministry_id, ministry_name, name)
SELECT id, 'RLS verification owned ministry', 'RLS verification test branch'
FROM public.ministries WHERE name = 'RLS verification owned ministry';

SELECT public.set_my_privacy_preference('show_streaks_publicly', false);
SELECT public.set_my_privacy_preference('is_discoverable', true);
DO $$
BEGIN
 IF NOT EXISTS (
   SELECT 1 FROM public.user_privacy_settings
   WHERE user_id = auth.uid()
     AND is_discoverable IS TRUE AND show_streaks_publicly IS FALSE
 ) THEN
   RAISE EXCEPTION 'Atomic privacy RPC overwrote an unrelated privacy setting';
 END IF;
END $$;

INSERT INTO public.user_verse_highlights (user_id, verse_key, color)
VALUES (auth.uid(), 'JHN.3.16', '#FF0000');

RESET ROLE;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '22222222-2222-4222-8222-222222222222', true);
SELECT set_config('request.jwt.claim.role', 'authenticated', true);

DO $$
DECLARE affected int;
BEGIN
 UPDATE public.ministries SET description = 'unauthorized'
 WHERE name = 'RLS verification owned ministry';
 GET DIAGNOSTICS affected = ROW_COUNT;
 IF affected <> 0 THEN
   RAISE EXCEPTION 'Cross-account ministry update succeeded';
 END IF;

 UPDATE public.branches SET town = 'unauthorized'
 WHERE name = 'RLS verification test branch';
 GET DIAGNOSTICS affected = ROW_COUNT;
 IF affected <> 0 THEN
   RAISE EXCEPTION 'Cross-account branch update succeeded';
 END IF;

 UPDATE public.user_privacy_settings SET is_discoverable = false
 WHERE user_id = '11111111-1111-4111-8111-111111111111';
 GET DIAGNOSTICS affected = ROW_COUNT;
 IF affected <> 0 THEN
   RAISE EXCEPTION 'Cross-account privacy update succeeded';
 END IF;

 IF EXISTS (
   SELECT 1 FROM public.user_verse_highlights
   WHERE user_id = '11111111-1111-4111-8111-111111111111'
 ) THEN
   RAISE EXCEPTION 'Cross-account private highlight read succeeded';
 END IF;

 IF EXISTS (
   SELECT 1 FROM public.profiles
   WHERE id = '11111111-1111-4111-8111-111111111111'
 ) THEN
   RAISE EXCEPTION 'Cross-account private profile read succeeded';
 END IF;

 IF NOT EXISTS (
   SELECT 1 FROM public.search_public_scholars('rls_test_alpha', 10)
   WHERE username = 'rls_test_alpha' AND public_streak IS NULL
 ) THEN
   RAISE EXCEPTION 'Opt-in scholar directory did not enforce public field allowlist';
 END IF;
END $$;

ROLLBACK;
