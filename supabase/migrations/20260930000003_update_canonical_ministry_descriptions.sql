-- =============================================================================
-- Migration: 20260930000003_update_canonical_ministry_descriptions.sql
--
-- Updates all four canonical ministries with:
--   - Corrected headquarters (God Embassy: Pretoria, South Africa)
--   - Accurate, date-free descriptions written as "Name founded by Founder"
--   - Corrected founder names
-- =============================================================================

-- ── God Embassy ──────────────────────────────────────────────────────────────
UPDATE public.ministries
SET
  founder              = 'Prophet Isaiah Brian Sovi & Pastor Shanna Sovi',
  headquarters         = 'Pretoria',
  headquarters_country = 'South Africa',
  description          = 'God Embassy is a global ministry led by Prophet Isaiah Brian Sovi and Pastor Shanna Sovi, commissioned to raise a generation that encounters God, walks in authority and impacts nations through the power of Jesus Christ.',
  updated_at           = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001'
  AND name = 'God Embassy';

-- ── Christ Embassy ───────────────────────────────────────────────────────────
UPDATE public.ministries
SET
  founder     = 'Rev. Dr. Chris Oyakhilome',
  description = 'Christ Embassy (Believers LoveWorld Inc.) is a global Christian ministry founded by Rev. Dr. Chris Oyakhilome, dedicated to giving lives a divine meaning and demonstrating the character of the Holy Spirit through the Word of God.',
  updated_at  = NOW()
WHERE id = '00000000-0000-0000-0000-000000000002'
  AND name = 'Christ Embassy';

-- ── Spirit Embassy ────────────────────────────────────────────────────────────
UPDATE public.ministries
SET
  founder     = 'Prophet Uebert Angel & Prophetess Beverly Angel',
  description = 'Spirit Embassy the GoodNews Church is a global ministry founded by Prophet Uebert Angel and Prophetess Beverly Angel, with over 3.2 million registered citizens worldwide. Recognized as a leading voice in the prophetic movement, the ministry preaches the Good News of the Grace of God — the source of supernatural power that empowers every believer to live a victorious life.',
  updated_at  = NOW()
WHERE id = '00000000-0000-0000-0000-000000000003'
  AND name = 'Spirit Embassy';

-- ── ECG The Jesus Nation Church ───────────────────────────────────────────────
UPDATE public.ministries
SET
  description = 'Founded solidly on the gospel of Jesus Christ, ECG The Jesus Nation Church is a global entity setting the pace in fulfilling the Great Commission. A church without borders, ECG exists in more than 70 countries through branches, clusters, homecells, and online congregations — bringing the message of salvation through the prophetic voice as the world prepares for the second coming of our Lord Jesus Christ.',
  updated_at  = NOW()
WHERE id = '00000000-0000-0000-0000-000000000004'
  AND name = 'ECG The Jesus Nation Church';
