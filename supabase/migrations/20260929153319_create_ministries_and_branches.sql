-- =============================================================================
-- Migration: 20260929153319_create_ministries_and_branches.sql
--
-- Creates the full ministry directory schema:
--   - ministries     : church/ministry organizations (pre-seeded + user-registered)
--   - branches       : campus branches, homecells, clusters linked to a ministry
--
-- Features:
--   - UUID primary keys
--   - Row-Level Security (RLS): public read, authenticated insert/update
--   - is_preadded flag to distinguish canonical seed data from user entries
--   - PostGIS-compatible lat/lng columns for geographic radar projections
--   - Automatic updated_at via trigger
-- =============================================================================

-- ---------------------------------------------------------------------------
-- MINISTRIES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ministries (
  id                    UUID          NOT NULL DEFAULT gen_random_uuid(),
  name                  TEXT          NOT NULL,
  founder               TEXT          NOT NULL,
  headquarters          TEXT          NOT NULL DEFAULT 'Johannesburg',
  headquarters_country  TEXT          NOT NULL DEFAULT 'South Africa',
  description           TEXT          NOT NULL DEFAULT '',
  category              TEXT          NOT NULL DEFAULT 'Evangelical & Apostolic',
  branches_count        INTEGER       NOT NULL DEFAULT 0,
  homecells_count       INTEGER       NOT NULL DEFAULT 0,
  website               TEXT,
  contact_email         TEXT,
  contact_phone         TEXT,
  is_preadded           BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  CONSTRAINT ministries_pkey PRIMARY KEY (id),
  CONSTRAINT ministries_name_unique UNIQUE (name)
);

-- ---------------------------------------------------------------------------
-- BRANCHES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.branches (
  id              UUID          NOT NULL DEFAULT gen_random_uuid(),
  ministry_id     UUID          NOT NULL REFERENCES public.ministries(id) ON DELETE CASCADE,
  ministry_name   TEXT          NOT NULL,
  name            TEXT          NOT NULL,
  type            TEXT          NOT NULL DEFAULT 'branch'
                    CHECK (type IN ('branch', 'homecell', 'cell_branch', 'sub_cluster', 'cluster')),
  leader_name     TEXT          NOT NULL DEFAULT '',
  contact_number  TEXT          NOT NULL DEFAULT '',
  contact_email   TEXT,
  town            TEXT          NOT NULL DEFAULT '',
  province        TEXT          NOT NULL DEFAULT '',
  country         TEXT          NOT NULL DEFAULT 'South Africa',
  postal_code     TEXT          NOT NULL DEFAULT '',
  address         TEXT          NOT NULL DEFAULT '',
  meeting_times   TEXT          NOT NULL DEFAULT 'Sundays: 09:30 AM',
  latitude        DOUBLE PRECISION NOT NULL DEFAULT -26.2041,
  longitude       DOUBLE PRECISION NOT NULL DEFAULT 28.0473,
  is_preadded     BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  CONSTRAINT branches_pkey PRIMARY KEY (id)
);

-- Index for fast ministry-based lookups
CREATE INDEX IF NOT EXISTS idx_branches_ministry_id ON public.branches(ministry_id);
CREATE INDEX IF NOT EXISTS idx_branches_town ON public.branches(town);
CREATE INDEX IF NOT EXISTS idx_branches_country ON public.branches(country);
CREATE INDEX IF NOT EXISTS idx_branches_type ON public.branches(type);

-- ---------------------------------------------------------------------------
-- AUTOMATIC updated_at TRIGGER
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_ministries_updated_at ON public.ministries;
CREATE TRIGGER tr_ministries_updated_at
  BEFORE UPDATE ON public.ministries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_branches_updated_at ON public.branches;
CREATE TRIGGER tr_branches_updated_at
  BEFORE UPDATE ON public.branches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- ROW-LEVEL SECURITY (RLS)
-- ---------------------------------------------------------------------------
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches   ENABLE ROW LEVEL SECURITY;

-- Public: anyone can read all ministries and branches (global church directory)
CREATE POLICY "public_read_ministries"
  ON public.ministries FOR SELECT
  USING (TRUE);

CREATE POLICY "public_read_branches"
  ON public.branches FOR SELECT
  USING (TRUE);

-- Authenticated users can insert new ministries and branches
CREATE POLICY "authenticated_insert_ministries"
  ON public.ministries FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "authenticated_insert_branches"
  ON public.branches FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- Authenticated users can update only their own (non-preadded) records
CREATE POLICY "authenticated_update_ministries"
  ON public.ministries FOR UPDATE
  TO authenticated
  USING (is_preadded = FALSE);

CREATE POLICY "authenticated_update_branches"
  ON public.branches FOR UPDATE
  TO authenticated
  USING (is_preadded = FALSE);

-- Allow service role (edge functions, admin tools) to manage all records
CREATE POLICY "service_role_all_ministries"
  ON public.ministries FOR ALL
  TO service_role
  USING (TRUE);

CREATE POLICY "service_role_all_branches"
  ON public.branches FOR ALL
  TO service_role
  USING (TRUE);

-- ---------------------------------------------------------------------------
-- RPC: increment_branch_or_homecell_count
-- Atomically increments branch/homecell counter on a ministry after insert
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.increment_ministry_count(
  p_ministry_id   UUID,
  p_branch_type   TEXT
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF p_branch_type = 'homecell' THEN
    UPDATE public.ministries
    SET homecells_count = homecells_count + 1
    WHERE id = p_ministry_id;
  ELSE
    UPDATE public.ministries
    SET branches_count = branches_count + 1
    WHERE id = p_ministry_id;
  END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- CANONICAL SEED DATA: Pre-added Ministries (mirror of TS mock data)
-- ---------------------------------------------------------------------------
INSERT INTO public.ministries
  (id, name, founder, headquarters, headquarters_country, description, category,
   branches_count, homecells_count, website, contact_email, contact_phone,
   is_preadded, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'God Embassy',
    'Prophet Isaiah Brian Sovi & Pastor Shanna Sovi',
    'Pretoria',
    'South Africa',
    'God Embassy is a global ministry led by Prophet Isaiah Brian Sovi and Pastor Shanna Sovi, commissioned to raise a generation that encounters God, walks in authority and impacts nations through the power of Jesus Christ.',
    'Apostolic & Kingdom Reformation',
    0, 0,
    'https://godembassy.org', 'contact@godembassy.org', '+27 12 000 0000',
    TRUE, NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Christ Embassy',
    'Rev. Dr. Chris Oyakhilome',
    'Lagos',
    'Nigeria',
    'Christ Embassy (Believers LoveWorld Inc.) is a global Christian ministry founded by Rev. Dr. Chris Oyakhilome, dedicated to giving lives a divine meaning and demonstrating the character of the Holy Spirit through the Word of God.',
    'Word of Faith & Evangelism',
    0, 0,
    'https://christembassy.org', 'info@loveworld360.com', '+234 1 888 8888',
    TRUE, NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Spirit Embassy',
    'Prophet Uebert Angel & Prophetess Beverly Angel',
    'London',
    'United Kingdom',
    'Spirit Embassy the GoodNews Church is a global ministry founded by Prophet Uebert Angel and Prophetess Beverly Angel, with over 3.2 million registered citizens worldwide. Recognized as a leading voice in the prophetic movement, the ministry preaches the Good News of the Grace of God — the source of supernatural power that empowers every believer to live a victorious life.',
    'Prophetic & Grace Revelation',
    0, 0,
    'https://spiritembassy.org', 'info@spiritembassy.com', '+44 207 123 4567',
    TRUE, NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'ECG The Jesus Nation Church',
    'Prophet Shepherd Bushiri',
    'Lilongwe',
    'Malawi',
    'Founded solidly on the gospel of Jesus Christ, ECG The Jesus Nation Church is a global entity setting the pace in fulfilling the Great Commission. A church without borders, ECG exists in more than 70 countries through branches, clusters, homecells, and online congregations — bringing the message of salvation through the prophetic voice as the world prepares for the second coming of our Lord Jesus Christ.',
    'Prophetic & Apostolic Community',
    0, 0,
    'https://jesusnation.org', 'info@ecgchurch.org', '+265 1 777 999',
    TRUE, NOW()
  )
ON CONFLICT (name) DO NOTHING;

-- ---------------------------------------------------------------------------
-- CANONICAL SEED DATA: Pre-added Branches
-- ---------------------------------------------------------------------------
INSERT INTO public.branches
  (id, ministry_id, ministry_name, name, type, leader_name, contact_number,
   town, province, country, postal_code, address, meeting_times,
   latitude, longitude, is_preadded, created_at)
VALUES
  -- GOD EMBASSY
  (
    '00000000-0000-0001-0000-000000000001',
    '00000000-0000-0000-0000-000000000001', 'God Embassy',
    'God Embassy Johannesburg Central', 'branch', 'Pastor David Ndlovu', '+27 11 402 1100',
    'Johannesburg', 'Gauteng', 'South Africa', '2000',
    '88 Marshall Street, Marshalltown, Johannesburg',
    'Sundays: 09:30 AM & 12:00 PM | Wednesdays: 18:30 PM',
    -26.2041, 28.0473, TRUE, '2023-01-15T00:00:00Z'
  ),
  (
    '00000000-0000-0001-0000-000000000002',
    '00000000-0000-0000-0000-000000000001', 'God Embassy',
    'Sandton Kingdom Cell #1', 'homecell', 'Deacon Mark Sibanda', '+27 82 555 1234',
    'Sandton', 'Gauteng', 'South Africa', '2196',
    '14 Grayston Drive, Sandhurst, Sandton',
    'Tuesdays: 19:00 PM',
    -26.1076, 28.0567, TRUE, '2023-03-20T00:00:00Z'
  ),
  (
    '00000000-0000-0001-0000-000000000003',
    '00000000-0000-0000-0000-000000000001', 'God Embassy',
    'God Embassy Cape Town Campus', 'branch', 'Pastor Sergei Kovalenko', '+27 21 424 5500',
    'Cape Town', 'Western Cape', 'South Africa', '8000',
    '120 Bree Street, Cape Town CBD',
    'Sundays: 10:00 AM | Fridays: 19:00 PM',
    -33.9249, 18.4241, TRUE, '2023-05-10T00:00:00Z'
  ),
  (
    '00000000-0000-0001-0000-000000000004',
    '00000000-0000-0000-0000-000000000001', 'God Embassy',
    'Tshwane Kingdom Sub-Cluster A', 'sub_cluster', 'Elder Grace Van Zyl', '+27 12 342 9876',
    'Pretoria', 'Gauteng', 'South Africa', '0001',
    'Hatfield Plaza Zone, Pretoria',
    'Thursdays: 18:00 PM',
    -25.7479, 28.2293, TRUE, '2023-06-12T00:00:00Z'
  ),
  -- CHRIST EMBASSY
  (
    '00000000-0000-0002-0000-000000000001',
    '00000000-0000-0000-0000-000000000002', 'Christ Embassy',
    'Christ Embassy Healing School & Randburg Church', 'branch', 'Pastor Ose Oyakhilome', '+27 11 326 2460',
    'Randburg', 'Gauteng', 'South Africa', '2194',
    '303 Pretoria Avenue, Randburg',
    'Sundays: 08:30 AM & 10:30 AM | Wednesdays: 18:00 PM',
    -26.0936, 27.9947, TRUE, '2018-01-01T00:00:00Z'
  ),
  (
    '00000000-0000-0002-0000-000000000002',
    '00000000-0000-0000-0000-000000000002', 'Christ Embassy',
    'Midrand Kings Cell #4', 'homecell', 'Brother Emmanuel Dube', '+27 71 888 4422',
    'Midrand', 'Gauteng', 'South Africa', '1685',
    'Halfway Gardens, Midrand',
    'Wednesdays: 19:00 PM',
    -25.9992, 28.1263, TRUE, '2022-04-18T00:00:00Z'
  ),
  (
    '00000000-0000-0002-0000-000000000003',
    '00000000-0000-0000-0000-000000000002', 'Christ Embassy',
    'Christ Embassy Durban Central', 'branch', 'Pastor Archie Aseme', '+27 31 305 7700',
    'Durban', 'KwaZulu-Natal', 'South Africa', '4000',
    '41 Anton Lembede Street, Durban Central',
    'Sundays: 09:00 AM | Thursdays: 18:00 PM',
    -29.8587, 31.0218, TRUE, '2020-02-14T00:00:00Z'
  ),
  (
    '00000000-0000-0002-0000-000000000004',
    '00000000-0000-0000-0000-000000000002', 'Christ Embassy',
    'Lagos Zone 1 Megacell Cluster', 'cluster', 'Pastor Lanre Alabi', '+234 1 888 1234',
    'Lagos', 'Lagos State', 'Nigeria', '100001',
    'LoveWorld Convocation Arena, Oregun, Ikeja',
    'Saturdays: 16:00 PM',
    6.5244, 3.3792, TRUE, '2019-11-20T00:00:00Z'
  ),
  -- SPIRIT EMBASSY
  (
    '00000000-0000-0003-0000-000000000001',
    '00000000-0000-0000-0000-000000000003', 'Spirit Embassy',
    'Spirit Embassy Johannesburg (The GoodNews Church)', 'branch', 'Pastor Felix Angel', '+27 11 784 9000',
    'Sandton', 'Gauteng', 'South Africa', '2196',
    'Rivonia Road & 5th Street, Sandton CBD',
    'Sundays: 10:00 AM | Tuesdays: 19:00 PM',
    -26.1076, 28.0567, TRUE, '2021-08-01T00:00:00Z'
  ),
  (
    '00000000-0000-0003-0000-000000000002',
    '00000000-0000-0000-0000-000000000003', 'Spirit Embassy',
    'Spirit Embassy Harare City Church', 'branch', 'Pastor Brian Chitando', '+263 24 270 0110',
    'Harare', 'Harare Province', 'Zimbabwe', '00263',
    'Samora Machel Avenue, Harare CBD',
    'Sundays: 09:00 AM & 11:30 AM',
    -17.8252, 31.0335, TRUE, '2015-04-10T00:00:00Z'
  ),
  (
    '00000000-0000-0003-0000-000000000003',
    '00000000-0000-0000-0000-000000000003', 'Spirit Embassy',
    'Spirit Embassy London Global Campus', 'branch', 'Prophet Uebert Angel', '+44 207 888 9900',
    'London', 'Greater London', 'United Kingdom', 'EC1A 1BB',
    'Canary Wharf Conference Centre, London',
    'Sundays: 11:00 AM | Thursdays: 19:30 PM',
    51.5074, -0.1278, TRUE, '2012-01-10T00:00:00Z'
  ),
  (
    '00000000-0000-0003-0000-000000000004',
    '00000000-0000-0000-0000-000000000003', 'Spirit Embassy',
    'Centurion Prophetic Cell Group', 'homecell', 'Sister Tendai Moyo', '+27 73 999 1122',
    'Centurion', 'Gauteng', 'South Africa', '0157',
    'Eldoraigne, Centurion',
    'Thursdays: 18:30 PM',
    -25.8603, 28.1894, TRUE, '2023-09-01T00:00:00Z'
  ),
  -- ECG THE JESUS NATION CHURCH
  (
    '00000000-0000-0004-0000-000000000001',
    '00000000-0000-0000-0000-000000000004', 'ECG The Jesus Nation Church',
    'ECG Pretoria Showgrounds Mega Branch', 'branch', 'Pastor Charles Chirwa', '+27 12 327 4400',
    'Pretoria', 'Gauteng', 'South Africa', '0001',
    'Pretoria Showgrounds, Soutter Street, Pretoria West',
    'Sundays: 08:00 AM & 12:00 PM | Fridays (Miracle Night): 19:00 PM',
    -25.7479, 28.2293, TRUE, '2016-01-01T00:00:00Z'
  ),
  (
    '00000000-0000-0004-0000-000000000002',
    '00000000-0000-0000-0000-000000000004', 'ECG The Jesus Nation Church',
    'ECG Lilongwe Jesus Nation Center', 'branch', 'Prophet Shepherd Bushiri', '+265 1 777 222',
    'Lilongwe', 'Central Region', 'Malawi', '00265',
    'Golden Peacock Complex, Area 13, Lilongwe',
    'Sundays: 09:00 AM & 02:00 PM | Wednesdays: 17:30 PM',
    -13.9626, 33.7741, TRUE, '2020-11-15T00:00:00Z'
  ),
  (
    '00000000-0000-0004-0000-000000000003',
    '00000000-0000-0000-0000-000000000004', 'ECG The Jesus Nation Church',
    'Soweto Jesus Nation Cell #7', 'homecell', 'Elder Thabo Mokoena', '+27 83 444 8811',
    'Soweto', 'Gauteng', 'South Africa', '1804',
    'Diepkloof Zone 4, Soweto',
    'Tuesdays: 18:30 PM',
    -26.2708, 27.8585, TRUE, '2022-08-10T00:00:00Z'
  ),
  (
    '00000000-0000-0004-0000-000000000004',
    '00000000-0000-0000-0000-000000000004', 'ECG The Jesus Nation Church',
    'Blantyre Metro Cell Cluster', 'cluster', 'Pastor Kelvin Phiri', '+265 1 820 440',
    'Blantyre', 'Southern Region', 'Malawi', '00265',
    'Chichiri Convention Area, Blantyre',
    'Thursdays: 17:30 PM',
    -15.7861, 35.0058, TRUE, '2021-03-05T00:00:00Z'
  )
ON CONFLICT (id) DO NOTHING;
