-- Master Prompt 2 privacy hardening: prevent public email disclosure.
-- Forward-only migration: stage and validate community discovery before deploy.

-- Never return account email addresses to anonymous callers.
REVOKE ALL ON FUNCTION public.resolve_email_by_username(TEXT) FROM PUBLIC, anon, authenticated;
DROP FUNCTION IF EXISTS public.resolve_email_by_username(TEXT);

DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can read own private profile" ON public.profiles;
CREATE POLICY "Users can read own private profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid()));

-- A narrowly scoped, non-PII public directory endpoint. The view must be
-- security-invoker so table RLS applies; a public policy is introduced only
-- after explicit privacy preferences and their server-side enforcement exist.
-- Existing community search requiring public profile reads must be redesigned
-- against an allowlisted public directory before release.

-- Stop arbitrary uploads to other users' avatar paths.
DROP POLICY IF EXISTS "Authenticated users can upload avatars." ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar." ON storage.objects;

CREATE POLICY "Users can upload own avatars"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
    AND lower(storage.extension(name)) IN ('avif', 'webp', 'png', 'jpg', 'jpeg')
  );

CREATE POLICY "Users can update own avatars"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = (SELECT auth.uid())::text)
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
    AND lower(storage.extension(name)) IN ('avif', 'webp', 'png', 'jpg', 'jpeg')
  );

CREATE POLICY "Users can delete own avatars"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = (SELECT auth.uid())::text);

-- The previous SECURITY DEFINER counter RPC accepted untrusted ministry IDs
-- and could mutate canonical ministry counters for any caller.
REVOKE ALL ON FUNCTION public.increment_ministry_count(UUID,TEXT) FROM PUBLIC, anon, authenticated;
-- Branch counts should be recalculated from rows by an authorized server process,
-- not incremented through a client-callable privileged function.
