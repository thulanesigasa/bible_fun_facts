-- Master Prompt 2: enforce authenticated ownership for community directory edits.
-- Forward-only and deliberately deny edits to legacy unowned rows pending verification.
-- IMPORTANT: apply to a staging database and verify before production deployment.

ALTER TABLE public.ministries
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.branches
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Existing user-submitted records cannot safely be attributed to an owner
-- from public metadata. Leave created_by NULL; administrators must explicitly
-- adjudicate ownership using trusted evidence, not arbitrary claims.
CREATE INDEX IF NOT EXISTS idx_ministries_created_by ON public.ministries(created_by);
CREATE INDEX IF NOT EXISTS idx_branches_created_by ON public.branches(created_by);

ALTER TABLE public.ministries ALTER COLUMN created_by SET DEFAULT auth.uid();
ALTER TABLE public.branches ALTER COLUMN created_by SET DEFAULT auth.uid();

-- Prevent owners from reassigning ownership or marking their rows canonical.
-- RLS alone is insufficient for protecting columns on permitted UPDATEs.
CREATE OR REPLACE FUNCTION public.protect_directory_ownership()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF auth.role() <> 'service_role' THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.created_by IS DISTINCT FROM auth.uid() OR NEW.is_preadded IS DISTINCT FROM FALSE THEN
        RAISE EXCEPTION 'Directory owner or canonical status cannot be changed';
      END IF;
    ELSE
      IF NEW.created_by IS DISTINCT FROM OLD.created_by
         OR NEW.is_preadded IS DISTINCT FROM OLD.is_preadded THEN
        RAISE EXCEPTION 'Directory owner or canonical status cannot be changed';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_ministry_ownership ON public.ministries;
CREATE TRIGGER protect_ministry_ownership
BEFORE INSERT OR UPDATE ON public.ministries
FOR EACH ROW EXECUTE FUNCTION public.protect_directory_ownership();

DROP TRIGGER IF EXISTS protect_branch_ownership ON public.branches;
CREATE TRIGGER protect_branch_ownership
BEFORE INSERT OR UPDATE ON public.branches
FOR EACH ROW EXECUTE FUNCTION public.protect_directory_ownership();

-- Keep public read behavior unchanged. Restrict only writes.
DROP POLICY IF EXISTS "authenticated_insert_ministries" ON public.ministries;
DROP POLICY IF EXISTS "authenticated_update_ministries" ON public.ministries;
DROP POLICY IF EXISTS "authenticated_insert_branches" ON public.branches;
DROP POLICY IF EXISTS "authenticated_update_branches" ON public.branches;

CREATE POLICY "authenticated_insert_ministries"
  ON public.ministries FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid() AND is_preadded = FALSE);

CREATE POLICY "authenticated_update_ministries"
  ON public.ministries FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND created_by = auth.uid() AND is_preadded = FALSE)
  WITH CHECK (created_by = auth.uid() AND is_preadded = FALSE);

CREATE POLICY "authenticated_insert_branches"
  ON public.branches FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid() AND is_preadded = FALSE);

CREATE POLICY "authenticated_update_branches"
  ON public.branches FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND created_by = auth.uid() AND is_preadded = FALSE)
  WITH CHECK (created_by = auth.uid() AND is_preadded = FALSE);

-- Future hardening: authenticate/cross-check the SECURITY DEFINER
-- increment_ministry_count RPC separately; it must not be treated as secure
-- merely because write policies on the base tables are now tightened.
