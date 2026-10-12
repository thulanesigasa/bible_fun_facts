-- Derive directory counters from persisted branch rows, never client input.
CREATE OR REPLACE FUNCTION public.sync_ministry_counts()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP <> 'INSERT' THEN
    UPDATE public.ministries m
    SET branches_count = (SELECT count(*) FROM public.branches b
                          WHERE b.ministry_id = OLD.ministry_id AND b.type <> 'homecell'),
        homecells_count = (SELECT count(*) FROM public.branches b
                           WHERE b.ministry_id = OLD.ministry_id AND b.type = 'homecell')
    WHERE m.id = OLD.ministry_id;
  END IF;
  IF TG_OP <> 'DELETE' THEN
    UPDATE public.ministries m
    SET branches_count = (SELECT count(*) FROM public.branches b
                          WHERE b.ministry_id = NEW.ministry_id AND b.type <> 'homecell'),
        homecells_count = (SELECT count(*) FROM public.branches b
                           WHERE b.ministry_id = NEW.ministry_id AND b.type = 'homecell')
    WHERE m.id = NEW.ministry_id;
  END IF;
  RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.sync_ministry_counts() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS refresh_branch_directory_counters ON public.branches;
CREATE TRIGGER refresh_branch_directory_counters
AFTER INSERT OR UPDATE OR DELETE ON public.branches
FOR EACH ROW EXECUTE FUNCTION public.sync_ministry_counts();
