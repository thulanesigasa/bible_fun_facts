-- ==============================================================================
-- Supabase Canonical Seed Data
-- Automatically generated from src/data/mockDatabase.ts
-- ==============================================================================

-- 1. Seed Categories
INSERT INTO public.categories (id, name, slug, description, icon)
VALUES ('history', 'History', 'history', 'Ancient Near Eastern and Greco-Roman historical events and archaeological context', 'landmark')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

INSERT INTO public.categories (id, name, slug, description, icon)
VALUES ('language', 'Language', 'language', 'Original Hebrew, Aramaic, and Koine Greek linguistic depth and Strong numbers', 'languages')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

INSERT INTO public.categories (id, name, slug, description, icon)
VALUES ('people', 'People', 'people', 'Patriarchs, kings, prophets, apostles, and historical figures', 'users')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

INSERT INTO public.categories (id, name, slug, description, icon)
VALUES ('prophecy', 'Prophecy', 'prophecy', 'Messianic covenants, typology, and apocalyptic fulfillment', 'compass')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

INSERT INTO public.categories (id, name, slug, description, icon)
VALUES ('customs', 'Customs', 'customs', 'Ancient Near Eastern ceremonies, cultural practices, and daily life idioms', 'scroll')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- 2. Seed Facts (120 items)
INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f1',
  'customs',
  'The Potter''s House',
  'Jeremiah 18:2-3',
  'Go down to the potter''s house, and there I will give you my message.',
  'Pottery was essential in ancient Israel for storing water, grain, and wine. The potter''s wheel was a stone disk spun by foot, requiring great skill. Broken pots were reshaped while the clay remained soft.',
  'God''s object lesson at the potter''s house showed Israel that they were clay in His hands. Just as the potter had authority over the clay, God had the right to reshape nations according to their response to Him.',
  'yatsar',
  'yatsar',
  'to form, fashion, create',
  'H3335',
  'Customs',
  '{"Potter","Israel","Formation"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f2',
  'history',
  'The Gates of Dawn',
  'Psalm 24:7-10',
  'Lift up your heads, you gates; be lifted up, you ancient doors, that the King of glory may come in.',
  'Ancient city gates had decorative heads carved above them, often of conquered kings or deities. ''Lift up your heads'' was a literal command to the gatekeepers to raise these carved heads to let the victorious king enter.',
  'When a king returned victorious from battle, the gates would be opened in triumph. The King of glory entering was a proclamation of God''s absolute sovereignty over every earthly power and stronghold.',
  'sha-ar',
  'sha''ar',
  'gate, city gate, entrance',
  'H8179',
  'History',
  '{"Gates","King","Victory"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f3',
  'customs',
  'The Footstool of Repentance',
  'Luke 15:21-22',
  'The son said to him, ''Father, I have sinned against heaven and against you.''',
  'In the ancient Near East, when a disgraced son returned home, he would prostrate himself at the father''s feet as a footstool in act of complete submission. The father in the parable running toward his son broke all social protocol.',
  'Jewish fathers of honor did not run. Running exposed the legs, which was considered shameful. Yet the father ran - showing that God''s love shatters cultural dignity to embrace the repentant.',
  'hamarton',
  'hamarton',
  'I have sinned, missed the mark',
  'G264',
  'Customs',
  '{"Repentance","Father","Prodigal"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f4',
  'language',
  'The Shema - One God',
  'Deuteronomy 6:4',
  'Hear, O Israel: The LORD our God, the LORD is one.',
  'The Shema was recited morning and evening by Jewish men. It was inscribed on mezuzot placed at doorposts. In the polytheistic ancient world, declaring one God was a radical countercultural statement.',
  'Jewish boys memorized the Shema as their first scripture. It was the last prayer of the dying and the declaration of martyrs. Jesus quoted it as the greatest commandment, affirming its centrality to faith.',
  'echad',
  'echad',
  'one, united, a unified whole',
  'H259',
  'Language',
  '{"Shema","Unity","God"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f5',
  'people',
  'Elijah''s Mantle',
  '2 Kings 2:13-14',
  'Elisha then picked up Elijah''s cloak that had fallen from him and went back and stood on the bank of the Jordan.',
  'The mantle (cloak) in ancient Israel represented a prophet''s calling, authority, and spirit. Elijah throwing his mantle on Elisha in 1 Kings 19 was an official transfer of prophetic commission.',
  'When Elisha picked up Elijah''s fallen mantle, he struck the water just as Elijah did - demonstrating continuity of prophetic authority. The double portion of spirit he requested was the firstborn son''s inheritance share.',
  'adderet',
  'adderet',
  'mantle, cloak, magnificence',
  'H155',
  'People',
  '{"Elijah","Elisha","Prophet","Mantle"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f6',
  'prophecy',
  'Daniel''s Visions of World Empires',
  'Daniel 2:31-35',
  'You looked, O king, and there before you stood a large statue - an enormous, dazzling statue, awesome in appearance.',
  'Daniel''s interpretation of Nebuchadnezzar''s statue outlined 4 world empires: Babylon (gold), Persia (silver), Greece (bronze), Rome (iron). Archaeologists have confirmed the sequence of these empires in stunning detail.',
  'Nebuchadnezzar''s dream was not just prophecy but a divine declaration that God controls human kingdoms. The stone cut without hands represents Christ''s kingdom that will crush all earthly powers.',
  'tsel-em',
  'tselem',
  'image, likeness, statue',
  'H6754',
  'Prophecy',
  '{"Daniel","Babylon","Empires","Prophecy"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f7',
  'customs',
  'The Passover Lamb''s Selection Day',
  'Exodus 12:3-6',
  'Tell the whole community of Israel that on the tenth day of this month each man is to take a lamb for his family.',
  'The lamb was selected on Nisan 10 and kept until Nisan 14 - 4 days in the home. This was deliberate: the family bonded with the lamb, making the sacrifice costly. Jesus entered Jerusalem on Nisan 10.',
  'The Passover lamb had to be without blemish. During the 4 days before slaughter, priests inspected it. Similarly, during Jesus'' final week, the religious leaders interrogated Him and found no fault - declaring Him the spotless Lamb.',
  'pasach',
  'pasach',
  'to pass over, to spare, Passover',
  'H6452',
  'Customs',
  '{"Passover","Lamb","Exodus","Jesus"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f8',
  'language',
  'The Name Above All Names',
  'Philippians 2:9-10',
  'Therefore God exalted him to the highest place and gave him the name that is above every name.',
  'In Greek culture, a name represented a person''s character, authority, and power. To give someone your name was to grant them full legal authority to act on your behalf. Jesus received the Father''s name - YHWH.',
  'Roman legal documents required that all transactions be done ''in the name of'' a recognized authority. Paul''s proclamation that every knee would bow was a direct challenge to Caesar''s claim of lordship over all nations.',
  'onoma',
  'onoma',
  'name, character, authority, reputation',
  'G3686',
  'Language',
  '{"Name","Jesus","Authority","Exaltation"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f9',
  'customs',
  'The Horns of the Altar',
  'Exodus 27:2',
  'Make a horn at each of the four corners, so that the horns and the altar are of one piece.',
  'Ancient altars in Israel had four horn-like projections at their corners. These horns were the most sacred part of the altar, where the blood of sacrifices was applied for atonement.',
  'Grappling with the horns of the altar was an act of transparency and seeking asylum. A person fleeing for their life could find safety by holding onto these horns, symbolizing an appeal to God’s mercy and justice.',
  'qeren',
  'qeren',
  'horn, power, strength, corner',
  'H1111',
  'Customs',
  '{"Altar","Mercy","Sacrifice"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f10',
  'history',
  'The Widow''s Mite',
  'Mark 12:41-42',
  'A poor widow came and put in two very small copper coins, worth only a few cents.',
  'The ''mite'' or ''lepton'' was the smallest denomination of currency in circulation in ancient Judea. It was practically worthless in terms of buying power, but it represented the total daily survival wage for the poorest.',
  'Jesus sat opposite the treasury and watched people putting in money. Great sums were announced by trumpets of the wealthy, but Jesus honored the widow because she gave not out of her surplus, but out of her poverty.',
  'lepton',
  'lepton',
  'small, thin, a tiny copper coin',
  'G3016',
  'History',
  '{"Giving","Widow","Faith"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f11',
  'language',
  'The Wine Press of Gethsemane',
  'Matthew 26:36',
  'Then Jesus went with his disciples to a place called Gethsemane.',
  'The name ''Gethsemane'' literally means ''Oil Press'' (Gath Shemani). It was an olive grove with a stone press used to crush olives to extract their oil. The process involved weighted stones slowly pressing out the liquid.',
  'Jesus'' agony in the garden mirrored the pressing of olives. Just as the olives had to be crushed to release the valuable oil, Jesus felt the weight of the world''s sin pressing upon Him before His ultimate sacrifice.',
  'gethsemani',
  'gethsēmani',
  'an oil press, olive press',
  'G1068',
  'Language',
  '{"Gethsemane","Prayer","Suffering"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f12',
  'history',
  'The Roman Road System',
  'Acts 13:4-5',
  'The two of them, sent on their way by the Holy Spirit, went down to Seleucia and sailed from there.',
  'The ''Pax Romana'' (Roman Peace) allowed for the creation of a vast network of stone-paved roads spanning thousands of miles. These roads were designed for military transport but became the highways for the Gospel''s spread.',
  'Paul and the early missionaries used these roads to travel safely across the empire. These ''stone arteries'' made it possible for letters and messengers to move faster than ever before in human history.',
  'hodos',
  'hodos',
  'way, road, path, journey',
  'G3598',
  'History',
  '{"Roman","Travel","Missions"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f13',
  'customs',
  'The Golden Censer',
  'Revelation 8:3-4',
  'Another angel, who had a golden censer, came and stood at the altar.',
  'In the Tabernacle, the censer was a container for coals taken from the bronze altar, used to burn holy incense on the gold altar. The rising smoke represented the prayers of the saints ascending to God.',
  'The priest would enter the Holy Place twice a day to burn incense. If the incense was not burning, the connection between the people and God was symbolized as broken. In Revelation, this smoke is the fragrance of the Church.',
  'libanotos',
  'libanōtos',
  'frankincense censer, incense burner',
  'G3031',
  'Customs',
  '{"Prayer","Heaven","Worship"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f14',
  'history',
  'Nehemiah''s Night Inspection',
  'Nehemiah 2:13-15',
  'By night I went out through the Valley Gate toward the Jackal Well and the Dung Gate, examining the walls.',
  'Jerusalem had been in ruins for nearly 150 years before Nehemiah arrived. The city gates were burned and its walls breached, leaving it defenseless against surrounding enemies like Sanballat and Tobiah.',
  'Nehemiah''s late-night inspection was to assess the damage without tipping off his rivals. In ancient warfare, a city with broken walls had no social or legal status; it was effectively a ''non-city''.',
  'chomah',
  'chōmāh',
  'wall, protection, safety',
  'H2346',
  'History',
  '{"Nehemiah","Jerusalem","Restoration"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f15',
  'customs',
  'The Festive Shofar',
  'Psalm 81:3',
  'Sound the ram’s horn at the New Moon, and when the moon is full, on the day of our feast.',
  'The shofar is a hollowed-out ram’s horn used in ancient Israel as a trumpet. It was blown during the Feast of Trumpets (Rosh Hashanah) and to announce the Year of Jubilee every 50 years.',
  'The shofar was not considered a musical instrument but a voice - a call to repentance and a reminder of the ram that replaced Isaac on Mount Moriah. Its blast signaled both warning and celebration.',
  'shofar',
  'shōphār',
  'horn, trumpet, ram’s horn',
  'H7782',
  'Customs',
  '{"Trumpet","Feast","Warning"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f16',
  'history',
  'The City on a Hill',
  'Matthew 5:14',
  'You are the light of the world. A town built on a hill cannot be hidden.',
  'Ancient cities, especially in Palestine, were built on elevated plateaus (tells) for defense. Because they were built of white limestone, they would literally glow under the light of the moon and sun.',
  'Travelers in the dark Middle East would navigate by the faint glowing silhouette of a city on a hill. Jesus used this to emphasize that the visibility of a disciple’s good works is an inherent part of their identity.',
  'polis',
  'polis',
  'city, town, inhabitant center',
  'G4172',
  'History',
  '{"Light","Witness","Elevation"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f17',
  'customs',
  'The Fig Tree Sign',
  'Micah 4:4',
  'Everyone will sit under their own vine and under their own fig tree, and no one will make them afraid.',
  'Fig trees were prized for their sweet fruit and shade in the intense heat of Israel. They were often planted near vineyards. To sit under your own tree was the ultimate symbol of peace and prosperity.',
  'In biblical times, the fig tree was also a symbol of national security. When war came, trees were the first to be destroyed. Therefore, a thriving fig tree indicated a land at rest under God’s protection.',
  'teenah',
  'te’ēnāh',
  'fig tree, fig, fruit',
  'H8384',
  'Customs',
  '{"Peace","Fruit","Security"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f18',
  'language',
  'The Salt of the Earth',
  'Matthew 5:13',
  'You are the salt of the earth. But if the salt loses its saltiness, how can it be made salty again?',
  'Salt in the ancient world was not just a seasoning but a vital preservative. Without it, meat would rot in a few hours. It was so valuable it was sometimes used as currency for Roman soldiers (the origin of the word salary).',
  'Covenants were often sealed with salt, known as a "salt covenant" (Numbers 18:19). For a disciple to be salt means they are a preservative against the corruption of the world and a sign of God’s enduring promise.',
  'halas',
  'halas',
  'salt, prudence, wisdom',
  'G217',
  'Language',
  '{"Salt","Preservation","Wisdom"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f19',
  'history',
  'The Centurion''s Authority',
  'Matthew 8:8-9',
  'Lord, I am not worthy for You to come under my roof, but just say the word, and my servant will be healed.',
  'A centurion was a professional Roman soldier in command of 100 men. They were the backbone of the Roman army. This specific centurion understood that authority did not require physical presence, only a command.',
  'For a Gentile centurion to approach a Jewish teacher was unheard of. Furthermore, his understanding of delegated authority - that Jesus was under God’s authority as he was under Caesar’s - was what Jesus called "great faith".',
  'exousia',
  'exousia',
  'power, authority, right, influence',
  'G1849',
  'History',
  '{"Authority","Soldier","Faith"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f20',
  'customs',
  'The Phylacteries of Devotion',
  'Matthew 23:5',
  'Everything they do is done for people to see: They make their phylacteries wide.',
  'Phylacteries (tefillin) are small black leather boxes containing parchment scrolls with scriptures (like the Shema). They are strapped to the forehead and arm during morning prayers.',
  'The practice originated from a literal interpretation of Deuteronomy 6:8 ("Tie them as symbols on your hands"). Jesus criticized the Pharisees for making these boxes larger than necessary to draw attention to their piety.',
  'phylaktērion',
  'phylaktērion',
  'safeguard, amulet, phylactery',
  'G5440',
  'Customs',
  '{"Pharisees","Prayer","Ritual"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f21',
  'history',
  'The Sower''s Soil',
  'Mark 4:3-8',
  'A farmer went out to sow his seed. As he was scattering the seed, some fell along the path.',
  'Farming in ancient Palestine involved "broadcast" sowing - throwing seed across the entire field before plowing. This explains why seed landed on rocky ground or among thorns before it was tilled into the earth.',
  'The "path" was the hard-packed soil between fields where people walked. It was impossible for seed to penetrate. The rocky soil had a thin layer of earth over limestone bedrock, causing plants to sprout quickly but die without roots.',
  'sporos',
  'sporos',
  'seed, sowing, word of God',
  'G4703',
  'History',
  '{"Parable","Growth","Seed"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f22',
  'history',
  'The Tabernacle Veil',
  'Exodus 26:31-33',
  'The curtain will separate the Holy Place from the Most Holy Place.',
  'The veil was a thick, intricately woven curtain made of blue, purple, and scarlet yarn and fine linen. It stood approximately 15 feet high and several inches thick, depicting embroidered cherubim.',
  'The veil prevented everyone except the High Priest (once a year) from entering the Presence of God. Its tearing from top to bottom at Jesus’ death symbolized that the barrier between God and humanity was forever removed.',
  'parapetasma',
  'parapetasma',
  'curtain, veil, screen',
  'G2665',
  'History',
  '{"Tabernacle","Presence","Jesus"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f23',
  'customs',
  'The High Priest''s Breastplate',
  'Exodus 28:15',
  'Fashion a breastpiece for making decisions—the work of skilled hands.',
  'The breastplate was a square pouch worn over the heart, set with twelve precious stones representing the twelve tribes of Israel. Inside the pouch were the Urim and Thummim, used to discern God''s will.',
  'When the High Priest entered the Holy Place, he ''carried the names of the sons of Israel over his heart.'' This symbolized his role as an intercessor, bringing the entire nation before God''s presence.',
  'choshen',
  'chōshen',
  'breastpiece, sacred pouch',
  'H2833',
  'Customs',
  '{"Priest","Israel","Intercession"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f24',
  'customs',
  'The Outer Darkness',
  'Matthew 8:12',
  'But the subjects of the kingdom will be thrown outside, into the darkness.',
  'Ancient Near Eastern banquets were held at night in brightly lit halls. To be "thrown outside" meant being cast into the pitch-black night, which was often dangerous due to wild animals and the cold.',
  'The contrast between the warm, well-lit wedding feast and the freezing, pitch-black "outer darkness" was a powerful metaphor for being excluded from the community’s joy and safety. It represented the ultimate social and spiritual rejection.',
  'skotos',
  'skotos',
  'darkness, obscurity, misery',
  'G4655',
  'Customs',
  '{"Judgment","Exclusion","Parable"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f25',
  'customs',
  'The Tearing of Clothes',
  'Joel 2:13',
  'Rend your heart and not your garments. Return to the LORD your God.',
  'Tearing one’s garments (qeriah) was a spontaneous and visceral expression of grief, horror, or deep repentance in ancient Israel. It was required by law when hearing blasphemy or witnessing a tragedy.',
  'The tear was usually about a hand’s breadth in size on the chest area. Joel’s call to "rend your heart" was a challenge to move beyond external ritual into genuine, internal transformation. God is more concerned with the heart’s posture than the garment’s state.',
  'qara',
  'qāra’',
  'to tear, rend, rip open',
  'H7167',
  'Customs',
  '{"Repentance","Grief","Ritual"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f26',
  'customs',
  'The Samaritan''s Oil and Wine',
  'Luke 10:34',
  'He went to him and bandaged his wounds, pouring on oil and wine.',
  'In first-century medicine, wine acted as an antiseptic (due to alcohol content) while oil acted as a soothing agent and a lubricant for bandages. Combining them was a standard treatment for open wounds.',
  'The Samaritan used his own traveling supplies to treat a stranger-turned-enemy. By pouring out these costly commodities, he demonstrated a sacrificial love that went beyond mere pity to active, practical restoration.',
  'elaion',
  'elaion',
  'olive oil, oil',
  'G1637',
  'Customs',
  '{"Healing","Mercy","Medicine"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f27',
  'history',
  'The Wedding Feast at Cana',
  'John 2:1-3',
  'On the third day a wedding took place at Cana in Galilee.',
  'Jewish weddings in the first century were week-long celebrations. Running out of wine was a massive social disaster that could result in legal action against the groom’s family for failing to provide promised hospitality.',
  'Jesus’ first miracle took place in the context of saving a family''s honor. The massive amount of wine produced (six stone jars) wasn''t just about utility; it was a sign of the abundant, overflowing joy of the Messiah’s kingdom.',
  'oinos',
  'oinos',
  'wine',
  'G3631',
  'History',
  '{"Miracle","Marriage","Honor"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f28',
  'history',
  'Feeding the 5000',
  'John 6:9-10',
  'Here is a boy with five small barley loaves and two small fish.',
  'Barley was the food of the poor, often used as animal fodder. It was significantly cheaper than wheat. The "small fish" were likely salted or dried sardines, a staple protein for the common people around the Sea of Galilee.',
  'The fact that a boy had these supplies suggest he was a worker or a laborer’s son. Jesus taking the "lowly" food of the poor and multiplying it showed that God’s kingdom provides for the humble and satisfies every need.',
  'krithinos',
  'krithinos',
  'of barley, barley-made',
  'G2916',
  'History',
  '{"Miracle","Provision","Humility"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f29',
  'people',
  'The Transfiguration',
  'Matthew 17:1-2',
  'There he was transfigured before them. His face shone like the sun.',
  'Mount Hermon is the most likely site for the Transfiguration. Its name means "Sanctuary" or "Forbidden." The appearance of Moses (the Law) and Elijah (the Prophets) validated Jesus as the fulfillment of all redemptive history.',
  'Jesus'' face shining like the sun was a direct callback to Moses’ face shining after being in God''s presence. However, Jesus’ light came from within, revealing His true, divine nature rather than a reflected glory.',
  'metamorphoo',
  'metamorphoō',
  'to transform, change form, transfigure',
  'G3339',
  'People',
  '{"Divinity","Prophets","Glory"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f30',
  'history',
  'The Sermon on the Mount',
  'Matthew 5:1-2',
  'Now when Jesus saw the crowds, he went up on a mountainside and sat down.',
  'The "Mount of Beatitudes" overlooks the Sea of Galilee. Its natural bowl-like shape acts as a natural amphitheater, allowing thousands to hear a speaker clearly from the mountainside.',
  'In the ancient world, teachers sat down while students stood up to listen. By sitting, Jesus was assuming the official posture of authority (ex cathedra). He wasn’t just offering advice; He was laying down the constitution of His kingdom.',
  'beatitudo',
  'makarios',
  'blessed, happy, fortunate',
  'G3107',
  'History',
  '{"Teachings","Authority","Kingdom"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f31',
  'history',
  'The Sea of Galilee',
  'Matthew 4:18',
  'As Jesus was walking beside the Sea of Galilee, he saw two brothers.',
  'The Sea of Galilee is actually a freshwater lake, the lowest freshwater lake on Earth. Its unique geography—surrounded by hills—makes it prone to sudden, violent windstorms as cold air rushes down from Mount Hermon.',
  'The fishing industry was the economic heart of the region. "Fishermen" were not just hobbyists but part of a sophisticated commercial guild. Jesus calling them to be "fishers of men" was a radical pivot from a local trade to a global mission.',
  'thalassa',
  'thalassa',
  'sea, lake, large body of water',
  'G2281',
  'History',
  '{"Jesus","Disciples","Geography"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f32',
  'customs',
  'The Vineyard Workers',
  'Matthew 20:1-2',
  'For the kingdom of heaven is like a landowner who went out early in the morning to hire workers.',
  'Day laborers in ancient Israel would gather in the town square (the marketplace) at sunrise, hoping to be hired for the day. A denarius was the standard daily wage for a soldier or laborer.',
  'Hiring workers at the 11th hour was an act of extreme generosity, as they would have been the most desperate. The landowner paying everyone the same wage challenged human concepts of merit-based justice with divine grace.',
  'ergates',
  'ergatēs',
  'worker, laborer, fieldhand',
  'G2040',
  'Customs',
  '{"Grace","Labor","Generosity"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f33',
  'customs',
  'Near Eastern Hospitality',
  'Genesis 18:2-5',
  'Let a little water be brought, and then you may all wash your feet and rest under this tree.',
  'In the ancient Near East, hospitality to strangers was a sacred duty, not an option. A guest was under the absolute protection of the host once they entered the home or ate together.',
  'Washing a guest’s feet was the first act of hospitality, removing the dust of travel. Abraham’s immediate response to "run" to meet the strangers showed his high regard for the duty of welcoming the traveler.',
  'philoxenia',
  'philoxenia',
  'love of strangers, hospitality',
  'G5381',
  'Customs',
  '{"Welcome","Duty","Abraham"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f34',
  'customs',
  'The Anointing at Bethany',
  'John 12:3',
  'Then Mary took about a pint of pure nard, an expensive perfume.',
  'Pure nard was an oil imported from the Himalayas. A "pint" (litra) would have cost approximately 300 denarii—a full year’s salary for an average worker.',
  'Mary''s act of pouring the entire jar on Jesus’ feet and wiping them with her hair was a scandalous display of devotion. In ancient culture, a woman’s hair was her glory; to use it as a towel for feet was an act of supreme humility.',
  'myron',
  'myron',
  'ointment, perfume, fragrant oil',
  'G3464',
  'Customs',
  '{"Devotion","Sacrifice","Mary"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f35',
  'prophecy',
  'The Valley of Dry Bones',
  'Ezekiel 37:1-3',
  'He led me back and forth among them, and I saw a great many bones on the floor of the valley.',
  'Ezekiel was writing as an exile in Babylon. The "dry bones" represented the house of Israel, which felt its hope was lost and its connection to the promised land severed forever.',
  'Leaving bones unburied was the ultimate disgrace in the ancient Near East. Ezekiel’s prophecy that the breath of God would reanimate these bones was a shocking promise of national and spiritual resurrection.',
  'ruach',
  'ruach',
  'breath, wind, spirit',
  'H7307',
  'Prophecy',
  '{"Ezekiel","Restoration","Spirit"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f36',
  'prophecy',
  'The Suffering Servant',
  'Isaiah 53:5',
  'But he was pierced for our transgressions, he was crushed for our iniquities.',
  'This prophecy was written 700 years before Jesus. It describes a "servant" who takes on the suffering of others. The specificity of "pierced" and "crushed" mirrors the physical realities of crucifixion.',
  'The concept of a substitutionary sacrifice—one person dying for another—was rooted in the sacrificial system. Isaiah points to a human servant who would fulfill what the millions of animals could only symbolize.',
  'chalal',
  'chālal',
  'to pierce, bore through, wound',
  'H2490',
  'Prophecy',
  '{"Isaiah","Atonement","Prophecy"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f37',
  'prophecy',
  'Malachi''s Messenger',
  'Malachi 3:1',
  'I will send my messenger, who will prepare the way before me.',
  'Malachi was the last prophet before the 400 years of silence. He promised a "messenger" who would function as a herald for the coming King, much like a royal envoy preparing a road.',
  'In ancient diplomacy, a herald was sent ahead to ensure the path was smooth and the city was ready for a royal visit. John the Baptist fulfilled this role, calling the nation to the "smooth path" of repentance.',
  'mal-ak',
  'mal’āk',
  'messenger, angel, envoy',
  'H4397',
  'Prophecy',
  '{"Messenger","Arrival","Prophecy"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f38',
  'prophecy',
  'The New Jerusalem',
  'Revelation 21:1-2',
  'I saw a new heaven and a new earth... and I saw the Holy City, the new Jerusalem.',
  'John was writing to Christians suffering under Roman persecution. The "New Jerusalem" was the ultimate counter-city to Rome, symbolizing a place where God’s presence and peace are permanent.',
  'The city is described as a cube, mirroring the dimensions of the Holy of Holies in the Tabernacle. This signifies that in the final state, the entire city is one massive "Presence of God," where no temple is needed.',
  'kainos',
  'kainos',
  'new in quality, fresh, unused',
  'G2537',
  'Prophecy',
  '{"Heaven","Jerusalem","Hope"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f39',
  'customs',
  'The Armor of God',
  'Ephesians 6:13-17',
  'Therefore put on the full armor of God, so that when the day of evil comes, you may be able to stand your ground.',
  'Paul was under house arrest in Rome, likely chained to a Roman soldier, as he wrote this. He used the literal equipment of the Roman legionary—the belt, breastplate, sandals, shield, helmet, and sword—as a metabolic blueprint for spiritual defense.',
  'The Roman legionary’s armor was designed for standing firm in a formation (the phalanx or testudo). Paul’s emphasis on "standing" reflects the military reality that victory wasn’t about individual heroics but about holding the line together.',
  'panoplia',
  'panoplia',
  'full armor, complete suit of armor',
  'G3833',
  'Customs',
  '{"Armor","Protection","Spiritual Warfare"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f40',
  'language',
  'The Fruit of the Spirit',
  'Galatians 5:22-23',
  'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.',
  'In agricultural Galatia, "fruit" (karpos) was the ultimate evidence of a plant’s health and the quality of its soil. Paul contrasts this organic growth with the "works" (erga) of the flesh, which are manufactured rather than grown.',
  'The list is presented as "fruit" (singular), not "fruits" (plural). This suggests that these qualities aren’t a buffet to choose from but a unified whole that grows from the same spiritual root. One cannot have true joy without love and peace.',
  'karpos',
  'karpos',
  'fruit, result, produce, outcome',
  'G2590',
  'Language',
  '{"Growth","Spirit","Character"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f41',
  'language',
  'The Logos - The Word',
  'John 1:1',
  'In the beginning was the Word, and the Word was with God, and the Word was God.',
  'In Greek philosophy, the "Logos" was the rational principle that unified the universe. In Jewish thought, it was the "Memra"—the creative word of God. John masterfully bridges these two worlds by declaring that the Logos is a Person: Jesus.',
  'By identifying Jesus as the Logos, John was telling both Greeks and Jews that the ultimate meaning of life and the creative power of God had become flesh. It was a revolutionary claim that changed the definition of divinity.',
  'logos',
  'logos',
  'word, reason, account, divine utterance',
  'G3056',
  'Language',
  '{"Jesus","Creation","Divinity"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f42',
  'language',
  'Koinonia - Deep Fellowship',
  'Acts 2:42',
  'They devoted themselves to the apostles’ teaching and to fellowship.',
  'In first-century Greek, "Koinonia" was used to describe business partnerships or common ownership. It wasn’t just a social gathering; it was a radical sharing of life, resources, and mission.',
  'Early Christian fellowship involved breaking bread in homes and holding everything in common. This communal lifestyle was a powerful witness in the fragmented Roman world, showing that Christ had broken down ethnic and social barriers.',
  'koinonia',
  'koinōnia',
  'fellowship, partnership, participation',
  'G2842',
  'Language',
  '{"Community","Sharing","Church"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f43',
  'language',
  'Metanoia - Repentance',
  'Matthew 3:2',
  'Repent, for the kingdom of heaven has come near.',
  'The Greek word "Metanoia" literally means "change of mind" (meta = change, nous = mind). It was a military term for making a 180-degree turn in direction.',
  'Biblical repentance isn’t just feeling sorry (remorse); it is a fundamental shift in one’s worldview and behavior. It is the act of turning away from one’s own kingdom toward the King of kings.',
  'metanoia',
  'metanoia',
  'repentance, change of mind, conversion',
  'G3341',
  'Language',
  '{"Turning","Change","Conversion"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f44',
  'language',
  'Chesed - Loving-kindness',
  'Lamentations 3:22',
  'Because of the LORD’s great love we are not consumed, for his compassions never fail.',
  '"Chesed" is one of the most important words in the Old Testament. It describes God’s loyal, covenant-keeping love—a love that is both a feeling and a committed action.',
  'In ancient Israel, "chesed" was the glue of the covenant. It meant that even when one party failed, the other (God) remained faithful out of his own character. It is often translated as "steadfast love" or "loyal kindness."',
  'chesed',
  'chesed',
  'goodness, kindness, faithfulness',
  'H2617',
  'Language',
  '{"Love","Covenant","Loyalty"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f45',
  'language',
  'Shalom - Complete Peace',
  'Numbers 6:24-26',
  'The LORD lift up His countenance upon you, and give you peace.',
  'In the Hebrew mind, "Shalom" is far more than the absence of conflict. It is a state of holistic wholeness, safety, and prosperity in every dimension of life—physical, emotional, and spiritual.',
  'Shalom was the standard greeting and farewell in Israel. To wish someone shalom was to pray that everything in their life would be returned to its original, perfect order as intended by the Creator.',
  'shalom',
  'shalom',
  'peace, completeness, welfare, health',
  'H7965',
  'Language',
  '{"Peace","Wholeness","Greeting"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f46',
  'customs',
  'The High Priest’s Bells',
  'Exodus 28:33-35',
  'The sound of the bells will be heard when he enters the Holy Place before the LORD.',
  'The hem of the High Priest’s blue robe was decorated with pomegranates and golden bells. These bells ensured that the sound of the priest’s movement would be heard by those standing in the outer courts.',
  'The sound of the bells served as a vital sign that the priest was still alive and performing the ritual for the people. It allowed the congregation to join in spirit with the unseen work happening behind the veil.',
  'pa-amon',
  'pa’amōn',
  'bell, rhythmic sound',
  'H6472',
  'Customs',
  '{"Priest","Tabernacle","Ritual"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f47',
  'customs',
  'The Urim and Thummim',
  'Exodus 28:30',
  'Also put the Urim and the Thummim in the breastpiece, so they may be over Aaron’s heart.',
  'The Urim ("Lights") and Thummim ("Perfections") were sacred objects used by the High Priest to determine God’s will in difficult national decisions. Their exact nature—stones, coins, or gems—remains an archaeological mystery.',
  'They were used as a "living lot" to get a "yes" or "no" answer from God. This practice showed that in ancient Israel, the King and the people were directly accountable to the divine word and direction.',
  'urim',
  '’ūrīm',
  'lights, fire, revelation',
  'H224',
  'Customs',
  '{"Decision","God’s Will","Priest"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f48',
  'history',
  'The Cities of Refuge',
  'Numbers 35:6',
  'Six of the towns you give the Levites will be cities of refuge.',
  'In an era of "blood vengeance," where families could legally retaliate against a killer, God established six cities where anyone who had killed someone accidentally could find legal asylum and a fair trial.',
  'The roads to these cities were required to be broad, smooth, and well-marked with signs saying "Refuge!" (Miklat). This legal system introduced the concept of intent and due process into human jurisprudence.',
  'miqlat',
  'miqlāṭ',
  'refuge, asylum, shelter',
  'H4733',
  'History',
  '{"Justice","Refuge","Law"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f49',
  'customs',
  'The Scapegoat Ritual',
  'Leviticus 16:21-22',
  'The goat will carry on itself all their sins to a remote place.',
  'On the Day of Atonement (Yom Kippur), two goats were chosen. One was sacrificed, but the other—the scapegoat—had the sins of the nation confessedly placed upon its head before being led into the wilderness.',
  'The scapegoat represented the complete removal of sin from the camp. It was a visual demonstration that God doesn’t just forgive guilt; He separates the transgressor from the transgression as far as the east is from the west.',
  'aza-zel',
  '‘ăzā’zēl',
  'entire removal, scapegoat',
  'H5799',
  'Customs',
  '{"Atonement","Forgiveness","Wilderness"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f50',
  'customs',
  'The Nazirite Vow',
  'Numbers 6:2-3',
  'If a man or woman wants to make a special vow... they must abstain from wine.',
  'A Nazirite (meaning "Separate One") was a person who took a voluntary vow of total dedication to God. This involved three restrictions: no grapes/wine, no cutting hair, and no touching a dead body.',
  'The vow was usually temporary but could be lifelong (like Samson or Samuel). The uncut hair was a visible, external sign of internal "crown" of holiness—showing that the person belonged exclusively to the LORD.',
  'nazir',
  'nāzīr',
  'separate, consecrated, crowned',
  'H5139',
  'Customs',
  '{"Holiness","Vow","Samson"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f51',
  'history',
  'The Year of Jubilee',
  'Leviticus 25:10',
  'Consecrate the fiftieth year and proclaim liberty throughout the land to all its inhabitants.',
  'Every 50 years, Israel celebrated the Jubilee. All debts were canceled, all slaves were freed, and all ancestral lands that had been sold were returned to their original families.',
  'The Jubilee ensured that no family in Israel remained in permanent poverty. It reminded the nation that the land belonged to God, and they were merely tenants. It was a radical "great reset" based on divine compassion.',
  'yobel',
  'yōbēl',
  'ram’s horn, jubilee, trumpet blast',
  'H3104',
  'History',
  '{"Freedom","Justice","Economics"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f52',
  'history',
  'The Kinnor Harp of David',
  '1 Samuel 16:23',
  'Whenever the spirit from God came on Saul, David would take his lyre and play.',
  'The "lyre" (kinnor) was the most popular stringed instrument in ancient Israel. It was a 10-stringed harp likely made of cypress or sandalwood. David, a master musician, used its soothing tones to calm the king’s turmoil.',
  'Music was integrated into the very fabric of spiritual life in Israel. David eventually organized 4,000 Levites to provide 24/7 musical worship in the Tabernacle, turning the sanctuary into a "House of Song."',
  'kinnor',
  'kinnōr',
  'harp, lyre, stringed instrument',
  'H3658',
  'History',
  '{"Music","Worship","David"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f53',
  'customs',
  'The Heavy Millstone',
  'Matthew 18:6',
  'It would be better for them to have a large millstone hung around their neck.',
  'A "large millstone" (mylos onikos) refers to the heavy stone pulled by a donkey in a commercial mill. These stones could weigh over 1,500 pounds, making it impossible for anyone to survive if submerged with one.',
  'Jesus used this extreme image to warn against causing a "little one" (a new believer or child) to stumble. In an honor-shame culture, this was a proclamation that harming the vulnerable is a crime of eternal weight.',
  'mylos',
  'mylos',
  'millstone, mill',
  'G3458',
  'Customs',
  '{"Warning","Justice","Protection"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f54',
  'customs',
  'The Fisherman’s Net',
  'Matthew 13:47',
  'The kingdom of heaven is like a net that was let down into the lake.',
  'Ancient Galilee fishermen used a "dragnet" (sagenē)—a large net weighted at the bottom and corked at the top. It would be pulled between two boats or from the shore, catching everything in its path regardless of quality.',
  'The net caught both "clean" and "unclean" fish (according to Levitical law). The sorting only happened once the net was pulled to shore. Jesus used this to show that the gospel invitation is universal, but a final separation is inevitable.',
  'sagene',
  'sagēnē',
  'dragnet, large fishing net',
  'G4522',
  'Customs',
  '{"Kingdom","Judgment","Galilee"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f55',
  'prophecy',
  'The Olive Branch',
  'Genesis 8:11',
  'When the dove returned to him in the evening, there in its beak was a freshly plucked olive leaf!',
  'Olive trees are incredibly resilient and can survive for months underwater. The "freshly plucked" leaf was the first tangible proof that the floodwaters had receded enough for vegetation to begin regenerating.',
  'Because the olive tree was the first to reappear after the judgment of the flood, it became the universal symbol for hope, peace, and the restoration of God’s favor. It remains a primary symbol of peace to this day.',
  'zayit',
  'zayit',
  'olive tree, olive, branch',
  'H2132',
  'Prophecy',
  '{"Hope","Peace","Creation"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f56',
  'history',
  'The Rejected Cornerstone',
  'Psalm 118:22',
  'The stone the builders rejected has become the cornerstone.',
  'In ancient masonry, the cornerstone was the most important stone in the building. It was perfectly square and used as the reference point for every other stone in the foundation. If the cornerstone was off, the whole building would be crooked.',
  'Tradition says that during the building of Solomon’s Temple, a uniquely shaped stone arrived early and was cast aside as useless by the builders. Only later did they realize it was the precise stone needed for the summit or corner.',
  'rosh pinnah',
  'rō’š pinnāh',
  'head of the corner, cornerstone',
  'H6438',
  'History',
  '{"Jesus","Foundation","Temple"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f57',
  'language',
  'The Mustard Seed Growth',
  'Matthew 13:31-32',
  'The kingdom of heaven is like a mustard seed... though it is the smallest of all seeds.',
  'The black mustard seed was the smallest seed locally known to Palestinian farmers. Despite its tiny start, it can grow into a large shrub reaching 10-15 feet in height, large enough to support birds.',
  'Jesus used the mustard seed to illustrate the "exponential" nature of the kingdom. It starts invisible and insignificantly, but it has an inherent, explosive life that eventually provides shelter and influence for the entire world.',
  'sinapi',
  'sinapi',
  'mustard plant, mustard seed',
  'G4615',
  'Language',
  '{"Faith","Growth","Kingdom"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f58',
  'history',
  'The Widow’s Endless Oil',
  '2 Kings 4:2-6',
  'Your servant has nothing there at all, she said, except a small jar of olive oil.',
  'Olive oil was the "liquid gold" of ancient Israel. It was used for cooking, light, medicine, and trade. A widow in debt was often forced to sell her children into slavery to repay creditors.',
  'Elisha''s miracle of the oil required the widow to take an act of faith—gathering empty jars from neighbors. It showed that God’s provision is often scaled to our capacity to ''contain'' and receive it through faith.',
  'asuk',
  '’āsūk',
  'flask, jar, oil-flask',
  'H610',
  'History',
  '{"Provision","Miracle","Faith"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f59',
  'customs',
  'The Ten Virgins’ Lamps',
  'Matthew 25:1',
  'Ten virgins took their lamps and went out to meet the bridegroom.',
  'Ancient wedding processions happened at night. The "lamps" (lampas) were actually torches—wooden sticks wrapped in oil-soaked rags. They burned brightly but needed constant oil saturation every 15-20 minutes.',
  'Waiting for the bridegroom required "hidden preparation." The oil represented the internal spiritual readiness that cannot be shared or borrowed at the last second. The visible light was only possible because of the stored oil.',
  'lampas',
  'lampas',
  'torch, lamp, light',
  'G2985',
  'Customs',
  '{"Waiting","Readiness","Parable"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f60',
  'customs',
  'The White Stone of Approval',
  'Revelation 2:17',
  'I will also give that person a white stone with a new name written on it.',
  'In ancient Greek courts, jurors used white and black stones to vote. A black stone meant "guilty," and a white stone meant "acquitted." White stones were also used as tokens or "tessera" for admission to special banquets.',
  'To receive a white stone from the King was a declaration of total acquittal and an invitation to the eternal feast. The "new name" symbolized a transformation of identity that only the recipient and the Giver truly understand.',
  'psēphos',
  'psēphos',
  'pebble, stone, vote',
  'G5586',
  'Customs',
  '{"Identity","Victory","Heaven"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f61',
  'people',
  'Ruth''s Radical Loyalty',
  'Ruth 1:16-17',
  'Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.',
  'Ruth was a Moabite, a nation often at odds with Israel. Her decision to follow Naomi back to Bethlehem was not just a family commitment but a total renunciation of her national and religious identity to join the people of Yahweh.',
  'In the ancient world, women''s identities were tied to their husbands or fathers. As a childless widow from an enemy nation, Ruth''s commitment to Naomi was an act of extreme vulnerability, relying entirely on God’s law of the ''gleaning'' for survival.',
  'dabak',
  'dābaq',
  'to cling, cleave, keep close',
  'H1692',
  'People',
  '{"Ruth","Loyalty","Moab"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f62',
  'people',
  'Boaz the Kinsman Redeemer',
  'Ruth 4:9-10',
  'Today you are witnesses that I have bought from Naomi all the property of Elimelek.',
  'Boaz was a "Gibbor Chayil" (a man of standing) in Bethlehem. His role as a kinsman redeemer (Goel) was a legal provision in Israel where a filter relative would buy back land or marry a widow to keep a family line from becoming extinct.',
  'The exchange of a sandal (v. 7) was the legal "handshake" of the day, symbolizing the transfer of the right to walk on and own the land. Boaz’s redemption of Ruth is a powerful Old Testament shadow of Christ’s redemption of humanity.',
  'ga-al',
  'gā’al',
  'to redeem, act as kinsman, ransom',
  'H1350',
  'People',
  '{"Boaz","Redemption","Bethlehem"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f63',
  'people',
  'Deborah the Judge',
  'Judges 4:4-5',
  'Now Deborah, a prophet, the wife of Lappidoth, was leading Israel at that time.',
  'Deborah is the only female judge mentioned in the book of Judges. She functioned as a supreme court justice, settling disputes under her palm tree, during a time of extreme Canaanite oppression under King Jabin.',
  'While most judges were military deliverers, Deborah was a prophet who provided the strategic word that led to victory. Her leadership showed that God’s Spirit can empower anyone, regardless of traditional social hierarchies, for national rescue.',
  'shaphat',
  'šāphaṭ',
  'to judge, govern, deliver, rule',
  'H8199',
  'People',
  '{"Deborah","Judge","Leadership"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f64',
  'people',
  'Stephen the First Martyr',
  'Acts 7:59-60',
  'While they were stoning him, Stephen prayed, "Lord Jesus, receive my spirit."',
  'Stephen was one of the first seven deacons chosen to serve the Greek-speaking widows in Jerusalem. His bold defense of the gospel before the Sanhedrin resulted in him becoming the first person to die specifically for the faith in Jesus.',
  'As he died, Stephen mirrored Jesus’ words from the cross: "Lord, do not hold this sin against them." Standing by and giving approval to this execution was a young man named Saul, who would later become the Apostle Paul.',
  'martys',
  'martys',
  'witness, martyr',
  'G3144',
  'People',
  '{"Stephen","Martyr","Witness"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f65',
  'people',
  'Lydia the Seller of Purple',
  'Acts 16:14-15',
  'One of those listening was a woman from the city of Thyatira named Lydia, a dealer in purple cloth.',
  'Purple dye, extracted from murex snails, was incredibly expensive and worn primarily by royalty and the extremely wealthy. Lydia was a professional businesswoman who likely managed a significant household and trade network.',
  'Lydia was the first convert in Europe. Her home in Philippi became the meeting place for the first European church, demonstrating the vital role that affluent and capable women played in financing and hosting early mission efforts.',
  'porphyropōlis',
  'porphyropōlis',
  'a woman selling purple, a female dealer in purple',
  'G4211',
  'People',
  '{"Lydia","Business","Philippi"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f66',
  'people',
  'Silas the Faithful Companion',
  'Acts 15:22',
  'Then the apostles and elders... decided to choose some of their own men and send them to Antioch with Paul and Barnabas. They chose Judas... and Silas.',
  'Silas was a leader in the Jerusalem church and a Roman citizen. He was Paul’s primary companion during the second missionary journey, enduring the prison at Philippi alongside him.',
  'In the ancient world, traveling with a companion was essential for safety and legal testimony. Silas’ status as a Roman citizen was crucial in Philippi, as it forced the local magistrates to apologize for their illegal treatment of the missionaries.',
  'silouanos',
  'silouanos',
  'woodland, woody, forest-lover',
  'G4610',
  'People',
  '{"Silas","Missions","Companion"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f67',
  'people',
  'Barnabas the Son of Encouragement',
  'Acts 4:36-37',
  'Joseph, a Levite from Cyprus... whom the apostles called Barnabas (which means “son of encouragement”), sold a field he owned.',
  'Barnabas was an early Christian leader who famously vouched for Saul (Paul) when the other apostles were afraid of him. He was known for his generosity and his ability to see potential in people that others had written off.',
  'His name ''Son of Encouragement'' (paraklēsis) is the same root used for the Holy Spirit (Paraclete). Barnabas’ ministry was defined by ''coming alongside'' people to strengthen them, whether by giving money or emotional support.',
  'paraklēsis',
  'paraklēsis',
  'encouragement, exhortation, comfort',
  'G3874',
  'People',
  '{"Barnabas","Encouragement","Paul"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f68',
  'people',
  'Priscilla and Aquila',
  'Acts 18:1-3',
  'There he met a Jew named Aquila... with his wife Priscilla, because Claudius had ordered all Jews to leave Rome.',
  'This husband-and-wife team were tentmakers who fled Rome and eventually moved to Ephesus. They were key teachers who famously took Apollos aside and explained the word of God more accurately to him.',
  'Paul speaks of them as "fellow workers" who risked their lives for him. Their ministry model as a couple—working a trade while planting and hosting churches—became a foundational pattern for "tentmaking" missions.',
  'synergos',
  'synergos',
  'fellow worker, companion in labor',
  'G4904',
  'People',
  '{"Priscilla","Aquila","Marriage"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f69',
  'people',
  'Timothy the Young Leader',
  '1 Timothy 4:12',
  'Don’t let anyone look down on you because you are young, but set an example for the believers.',
  'Timothy was a native of Lystra with a Jewish mother and a Greek father. He was such a trusted protégé that Paul sent him to handle difficult situations in major cities like Ephesus and Corinth.',
  'In a culture where age was synonymous with wisdom, Timothy’s youth was a potential barrier to his authority. Paul reminded him that his example in character was more important than his years of life.',
  'neotes',
  'neotēs',
  'youth, youthful age',
  'G3503',
  'People',
  '{"Timothy","Youth","Leadership"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f70',
  'people',
  'Philemon and Onesimus',
  'Philemon 1:15-16',
  'He is no longer a slave, but better than a slave, as a dear brother.',
  'Philemon was a wealthy house-church leader in Colossae. Onesimus was his runaway slave who met Paul in prison and became a Christian. Paul’s letter to Philemon is a radical appeal to treat a slave as a legal and spiritual equal.',
  'In Roman law, runaway slaves could be executed. Paul’s call for Onesimus to be received "no longer as a slave but as a brother" was a direct, spiritual subversion of the entire Roman social order.',
  'adephos',
  'adelphos',
  'brother, fellow believer',
  'G80',
  'People',
  '{"Philemon","Onesimus","Brotherhood"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f71',
  'people',
  'The Restoration of Peter',
  'John 21:15',
  'Jesus said to Simon Peter, "Simon son of John, do you love me more than these?"',
  'Peter had denied Jesus three times around a charcoal fire during the trial. After the resurrection, Jesus met him on the beach around another charcoal fire to ask him the same question three times, allowing for a complete three-fold restoration.',
  'Jesus'' shift from the word ''Agape'' (sacrificial love) to ''Phileo'' (brotherly affection) in this conversation shows He was meeting Peter in his frailty while still commissioning him to ''feed my sheep.''',
  'phileo',
  'phileō',
  'to love with friendship or affection',
  'G5368',
  'People',
  '{"Peter","Restoration","Love"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f72',
  'people',
  'Mary Magdalene',
  'Luke 8:1-3',
  'Mary (called Magdalene) from whom seven demons had come out.',
  'Mary was from Magdala, a wealthy fishing town. Contrary to popular medieval legends, there is no biblical evidence she was a prostitute; she was a woman of means who helped finance Jesus’ ministry.',
  'As the first person to see the resurrected Christ, Mary Magdalene held a position of extreme importance. In a culture where a woman’s testimony was not legally valid in court, Jesus chose her to be the first "apostle to the apostles."',
  'apóstolos',
  'apostolos',
  'one sent forth, messenger',
  'G652',
  'People',
  '{"Mary","Resurrection","Witness"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f73',
  'people',
  'Martha’s Service',
  'Luke 10:40-42',
  'Martha was distracted by all the preparations that had to be made.',
  'Martha was likely the elder sister and head of the household in Bethany. Her "distraction" was actually fulfillng the sacred Near Eastern duty of hospitality for a huge group appearing at her door.',
  'While Jesus gently corrected her for being "worried and upset," He deeply loved Martha. It was her confession of faith in John 11, not Peter’s, that serves as the theological climax of the raising of Lazarus.',
  'diakonia',
  'diakonia',
  'service, ministry, administration',
  'G1248',
  'People',
  '{"Martha","Service","Bethany"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f74',
  'people',
  'Lazarus of Bethany',
  'John 11:43-44',
  'Jesus called in a loud voice, "Lazarus, come out!" The dead man came out, his hands and feet wrapped with strips of linen.',
  'Lazarus had been in the tomb for four days. In Jewish belief, the soul hovered near the body for three days, so being dead for four meant there was absolutely no doubt that his life was permanently gone.',
  'The "strips of linen" (keiria) were the burial traditional of the day. Lazarus’ raising was the final "sign" in John’s Gospel that led directly to the decision of the religious leaders to have Jesus killed.',
  'zoe',
  'zoe',
  'life, the state of one who is possessed of vitality',
  'G2222',
  'People',
  '{"Lazarus","Resurrection","Miracle"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f75',
  'people',
  'Zacchaeus the Tax Collector',
  'Luke 19:1-5',
  'He was a chief tax collector and was wealthy... so he ran ahead and climbed a sycamore-fig tree to see him.',
  'As a "chief" tax collector, Zacchaeus oversaw other collectors and was considered a traitor and a spiritual outcast by his fellow Jews. He was "buying" the right to extort money for Rome.',
  'For a wealthy man of standing to climb a tree was a total loss of dignity. Jesus’ decision to "stay at your house" was a massive scandal, as refined guests would never eat with such a notorious sinner.',
  'architelones',
  'architelōnēs',
  'chief tax collector',
  'G754',
  'People',
  '{"Zacchaeus","Repentance","Tax"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f76',
  'people',
  'Cornelius the Centurion',
  'Acts 10:1-2',
  'A centurion named Cornelius... a devout and God-fearing man who gave generously to those in need.',
  'Cornelius was an officer in the "Italian Regiment" stationed in Caesarea. He was a "God-fearer"—a Gentile who worshiped Yahweh and followed Jewish ethics but had not undergone circumcision.',
  'Cornelius’ conversion was the ''Gentile Pentecost.'' It was the moment the Holy Spirit broke the boundary of Judaism once and for all, proving to Peter that God ''does not show favoritism.''',
  'prosēlytos',
  'prosēlytos',
  'one who has come over, a proselyte',
  'G4339',
  'People',
  '{"Cornelius","Gentiles","Faith"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f77',
  'people',
  'Philip the Evangelist',
  'Acts 8:26-27',
  'Now an angel of the Lord said to Philip, "Go south to the road—the desert road—that goes down from Jerusalem to Gaza."',
  'Philip was one of the seven deacons (like Stephen) who fled Jerusalem after the persecution began. He was the first to take the gospel to the Samaritans and later to an African official from Ethiopia.',
  'The "Ethiopian eunuch" he baptized was a high-ranking official in the court of the Candace (the Queen of Ethiopia). This single meeting is traditionally credited with planting the seeds of Christianity in Africa.',
  'euangelistes',
  'euaggelistēs',
  'evangelist, bringer of good news',
  'G2099',
  'People',
  '{"Philip","Evangelist","Ethiopia"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f78',
  'people',
  'Dorcas the Compassionate',
  'Acts 9:36',
  'In Joppa there was a disciple named Tabitha (which translated is Dorcas); she was always doing good and helping the poor.',
  'Dorcas (meaning "Gazelle") was a seamstress whose death caused massive grief in Joppa. The widows she helped showed Peter the "robes and other clothing" she had made for them.',
  'Peter raising her from the dead was the first recorded resurrection performed by an apostle. It solidified the authority of the apostles as true representatives of the power of the risen Jesus.',
  'mathētria',
  'mathētria',
  'a female disciple',
  'G3115',
  'People',
  '{"Dorcas","Compassion","Widows"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f79',
  'people',
  'Apollos the Learned',
  'Acts 18:24-25',
  'Now a Jew named Apollos... an eloquent man, arrived at Ephesus; he was mighty in the Scriptures.',
  'Apollos was from Alexandria, the intellectual capital of the Roman Empire. He was a brilliant speaker but initially only knew the "baptism of John" until Priscilla and Aquila discipled him.',
  'Apollos became a key leader in Corinth. His intellectual and eloquent approach to the gospel was so popular that people started dividing themselves, saying, "I follow Paul" or "I follow Apollos."',
  'logios',
  'logios',
  'learned, eloquent, skilled in words',
  'G3052',
  'People',
  '{"Apollos","Ephesus","Eloquence"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f80',
  'people',
  'John the Beloved',
  'John 13:23',
  'One of them, the disciple whom Jesus loved, was reclining next to him.',
  'John was the youngest of the apostles and the only one traditionally believed to have died of old age rather than martyrdom. He wrote the Gospel of John, three epistles, and the book of Revelation.',
  'John’s identity as the "disciple whom Jesus loved" shows his deep personal intimacy with Christ. He was the one Jesus entrusted with the care of His mother, Mary, at the crucifixion.',
  'agapētos',
  'agapētos',
  'beloved, esteemed, favorite',
  'G27',
  'People',
  '{"John","Beloved","Apostle"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f81',
  'people',
  'Thomas the "Twin"',
  'John 20:24-25',
  'Unless I see the nail marks in his hands... I will not believe.',
  'Thomas, whose name means ''Twin'' (Didymus), is often unfairly remembered only for his doubt. Earlier in John’s Gospel, he was the only one brave enough to say, ''Let us also go [to Jerusalem], that we may die with him.''',
  'His confession ''My Lord and my God!'' upon seeing the risen Jesus is the theological high point of John''s Gospel. Tradition holds that Thomas carried the gospel all the way to India, where he was eventually martyred.',
  'didymos',
  'didymos',
  'two-fold, twin',
  'G1324',
  'People',
  '{"Thomas","Doubt","Faith","India"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f82',
  'people',
  'Jude the Brother of Jesus',
  'Jude 1:1',
  'Jude, a servant of Jesus Christ and a brother of James...',
  'Jude (also called Judas) was one of the younger biological brothers of Jesus. Like James, he did not believe in Jesus during His earthly ministry but became a pillar of the church after the resurrection.',
  'His short letter is a fierce warning against false teachers. Jude refers to himself not as ''Jesus’ brother'' (though he was), but as His ''servant'' (doulos), showing his profound submission to his older brother''s divinity.',
  'doulos',
  'doulos',
  'servant, slave, bond-servant',
  'G1401',
  'People',
  '{"Jude","Brother","Servant"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f83',
  'prophecy',
  'The Seven Lamps of Fire',
  'Revelation 4:5',
  'In front of the throne, seven lamps were blazing. These are the seven spirits of God.',
  'In the ancient Tabernacle, the Menorah (seven-branched lampstand) was the only light in the Holy Place. John’s vision sees the spiritual reality behind this furniture—the complete, perfect presence of the Holy Spirit.',
  'The number seven in Hebrew (sheva) represents completion and perfection. The "seven spirits" symbolize the Holy Spirit in the fullness of His seven-fold character as described in Isaiah 11:2 (wisdom, understanding, counsel, might, knowledge, fear of the Lord).',
  'hepta',
  'hepta',
  'seven',
  'G2033',
  'Prophecy',
  '{"Spirit","Throne","Presence"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f84',
  'prophecy',
  'The Four Living Creatures',
  'Revelation 4:6-8',
  'In the center, around the throne, were four living creatures... each with six wings and eyes all over.',
  'These beings share characteristics with Ezekiel’s cherubim and Isaiah’s seraphim. Each represents a different aspect of creation: the lion (wild animals), the ox (domestic animals), the man (humanity), and the eagle (birds).',
  'The "eyes all over" symbolize divine omniscience—that nothing in creation is hidden from God’s sight. Their constant worship "Holy, holy, holy" is the eternal rhythm of the throne room, representing the ceaseless praise of all that God has made.',
  'zoon',
  'zōon',
  'living being, creature, animal',
  'G2226',
  'Prophecy',
  '{"Worship","Creation","Cherubim"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f85',
  'prophecy',
  'The Twenty-Four Elders',
  'Revelation 4:4',
  'Surrounding the throne were twenty-four other thrones, and seated on them were twenty-four elders.',
  'The number 24 is often seen as the combination of the 12 tribes of Israel (Old Covenant) and the 12 apostles (New Covenant). They represent the entire, unified people of God falling down before the Creator.',
  'The elders casting their "crowns" before the throne is a radical act of submission. In the ancient world, a lesser king would remove his crown when entering the presence of a greater king (a Suzerain) as an acknowledgment of delegated authority.',
  'presbyteros',
  'presbyteros',
  'elder, senior, person of authority',
  'G4245',
  'Prophecy',
  '{"Elders","Submission","Church"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f86',
  'prophecy',
  'The Seven-Sealed Scroll',
  'Revelation 5:1-3',
  'I saw in the right hand of him who sat on the throne a scroll with writing on both sides and sealed with seven seals.',
  'In Roman law, a will or a legal deed of inheritance was required to be sealed with seven seals of seven witnesses. Only the rightful heir had the authority to break the seals and claim the inheritance.',
  'The scroll represents the "Title Deed to the Earth." The crisis of the vision—that "no one was found worthy"—highlights that humanity had lost its right to rule. Only the "Lion of Judah" (Jesus) could take the scroll because of His victory.',
  'biblion',
  'biblion',
  'scroll, book, document',
  'G975',
  'Prophecy',
  '{"Scroll","Jesus","Authority"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f87',
  'prophecy',
  'The Four Horsemen',
  'Revelation 6:1-8',
  'I looked, and there before me was a white horse... a fiery red one... a black one... and a pale one.',
  'The horsemen represent natural and human forces unleashed on the earth: Conquest (white), Civil War (red), Famine (black), and Death (pale). These were the standard "divine judgments" understood in the ancient world.',
  'The black horseman carrying "scales" represents an economic crisis where wheat and barley were sold by weight—a sign of extreme scarcity. Despite the judgment, the oil and wine (luxury items) were "not to be damaged," showing God’s restraint.',
  'hippos',
  'hippos',
  'horse',
  'G2462',
  'Prophecy',
  '{"Horsemen","Judgment","Tribulation"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f88',
  'prophecy',
  'The Souls Under the Altar',
  'Revelation 6:9-10',
  'I saw under the altar the souls of those who had been slain because of the word of God.',
  'In the Tabernacle, the blood of the sacrifices was poured out at the base of the altar. John’s vision sees the lives (blood) of the martyrs in the same location, showing their deaths as a sacred sacrifice to God.',
  'Their cry "How long, Sovereign Lord?" was a common prayer of the suffering in Israel (Psalm 13). The "white robes" they were given represent acquittal and festive victory, signaling that their sacrifice was not in vain.',
  'psyche',
  'psychē',
  'soul, life, breath, heart',
  'G5590',
  'Prophecy',
  '{"Martyrs","Altar","Sacrifice"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f89',
  'prophecy',
  'The Great Multitude',
  'Revelation 7:9',
  'There before me was a great multitude that no one could count, from every nation, tribe, people and language.',
  'In the Roman Empire, diversity was often managed through forced assimilation to Latin culture. John’s vision shows a kingdom where differences (tribes/languages) are preserved and celebrated in worship, not erased.',
  'Holding ''palm branches'' was a cultural sign of victory and joy, used during the Feast of Tabernacles. This scene is the fulfillment of God’s promise to Abraham that his descendants would be a blessing to ''all the families of the earth.''',
  'ethnos',
  'ethnos',
  'nation, people group, outsiders',
  'G1484',
  'Prophecy',
  '{"Multitude","Diversity","Worship"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f90',
  'prophecy',
  'The Two Witnesses',
  'Revelation 11:3-4',
  'I will appoint my two witnesses, and they will prophesy for 1,260 days.',
  'The witnesses are described as "the two olive trees and the two lampstands." This is a direct reference to Zechariah 4, where Joshua (priest) and Zerubbabel (king) were the conduits of God’s Spirit.',
  'Their 1,260-day ministry (exactly 42 months or 3.5 years) represents a limited time of testing. They function like Moses (turning water to blood) and Elijah (shutting the heavens), embodying the full testimony of the Law and the Prophets.',
  'martys',
  'martys',
  'witness, testifier, martyr',
  'G3144',
  'Prophecy',
  '{"Witnesses","Prophecy","Signs"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f91',
  'prophecy',
  'The Woman and the Dragon',
  'Revelation 12:1',
  'A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet.',
  'The imagery of the sun, moon, and 12 stars is a direct dream of Joseph (Genesis 37), identifying the woman as Israel. The dragon (Satan) waits to devour her child (Jesus), but He is snatched up to God.',
  'Ancient myths often featured a goddess being pursued by a dragon, but John subverts these to tell the actual cosmic history of the Messiah’s birth and the spiritual war against the people of God.',
  'semeion',
  'sēmeion',
  'sign, miracle, wonder, mark',
  'G4592',
  'Prophecy',
  '{"Sign","Israel","Spiritual War"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f92',
  'prophecy',
  'The Beast from the Sea',
  'Revelation 13:1-2',
  'The dragon stood on the shore... and I saw a beast coming out of the sea.',
  'To the first-century reader, the "sea" represented the Gentile nations (specifically Rome across the Mediterranean). The beast’s composite appearance (lion, bear, leopard) connects it to the empires in Daniel 7.',
  'The beast represents a deified state power that demands worship. In John’s day, this was the Imperial Cult of Rome, where citizens were forced to declare "Caesar is Lord" to participate in society.',
  'therion',
  'thērion',
  'wild beast, animal, monster',
  'G2342',
  'Prophecy',
  '{"Beast","Rome","Empire"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f93',
  'prophecy',
  'The Mark of the Beast',
  'Revelation 13:16-17',
  'It also forced all people... to receive a mark on their right hands or on their foreheads.',
  'In the ancient world, slaves were often branded with their master’s mark, and soldiers with their general’s mark. Receiving a mark was a sign of total ownership and allegiance.',
  'The mark was a spiritual parody of the Jewish Shema, which was "bound on the hand and forehead." It represented the ultimate choice: allegiance to the state for economic survival, or allegiance to God through suffering.',
  'charagma',
  'charagma',
  'mark, stamp, brand, engraving',
  'G5480',
  'Prophecy',
  '{"Mark","Allegiance","Faith"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f94',
  'prophecy',
  'The Three Angels’ Messages',
  'Revelation 14:6-7',
  'I saw another angel flying in midair, and he had the eternal gospel to proclaim.',
  'In an age without mass communication, "flying in midair" was the only way to reach all "nations, tribes, and languages." The messages warn of judgment while offering the final call to worship the true Creator.',
  'His cry "Fear God and give him glory" challenged the fear of Caesar. In ancient culture, a message from an angel (angelos) was a legal summons from a higher court that could not be ignored without penalty.',
  'angelos',
  'angelos',
  'messenger, angel, envoy',
  'G32',
  'Prophecy',
  '{"Angels","Proclamation","Gospel"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f95',
  'prophecy',
  'The Harvest of the Earth',
  'Revelation 14:14-15',
  'I looked, and there before me was a white cloud, and seated on the cloud was one "like a son of man".',
  'Jesus often used agricultural metaphors for the end of the age. Here, two harvests occur: the "grain harvest" (the gathering of the righteous) and the "grape harvest" (the gathering of the wicked for judgment).',
  'The "sickle" was the tool of judgment. The grape harvest involved a "winepress outside the city"—a symbol of being cast out from the community of God into the winepress of His divine wrath against injustice.',
  'therismos',
  'therismos',
  'harvest, reaping, time of gathering',
  'G2326',
  'Prophecy',
  '{"Harvest","Judgment","End Times"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f96',
  'prophecy',
  'The Seven Bowls of Wrath',
  'Revelation 16:1',
  'Go, pour out the seven bowls of God’s wrath on the earth.',
  'The "bowls" (phialai) were wide, shallow saucers used in the Temple for liquid offerings. Here, they are inverted, showing that what was once offered to God as worship is now poured back on a rebellious world as judgment.',
  'These judgments—darkness, sores, blood—parallel the ten plagues of Egypt. They are God’s final response to a world that has "de-created" itself by rejecting the Source of life and choosing the "mark" of destruction.',
  'phiale',
  'phialē',
  'bowl, vial, broad shallow cup',
  'G5357',
  'Prophecy',
  '{"Bowls","Wrath","Plagues"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f97',
  'prophecy',
  'The Fall of Babylon',
  'Revelation 18:2-3',
  'Fallen! Fallen is Babylon the Great!',
  '"Babylon" was the spiritual and political code word for Rome. Just as the original Babylon fell in one night to the Persians, John prophesies that the proud Roman system would suddenly collapse under its own weight.',
  'The merchants of the earth "weep and mourn" over her because their luxury trade (gold, pearls, slaves) has ended. Revelation challenges believers to "come out of her," meaning to detach their identity and security from a corrupt worldly system.',
  'Babalōn',
  'Babylōn',
  'confused, gate of god, Babylon',
  'G897',
  'Prophecy',
  '{"Babylon","Rome","Judgment"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f98',
  'prophecy',
  'The Marriage Supper of the Lamb',
  'Revelation 19:7',
  'For the wedding of the Lamb has come, and his bride has made herself ready.',
  'Biblical prophecy begins with a marriage (Adam and Eve) and ends with a marriage. The "Lamb" is Jesus, and the "Bride" is the Church. This feast is the ultimate celebration of the permanent union between God and His people.',
  'Her dress is "fine linen, bright and clean," which John defines as "the righteous acts of the saints." This shows that while salvation is a gift, the readiness for the feast involves a life transformed by the Spirit’s power.',
  'gamos',
  'gamos',
  'marriage, wedding, feast',
  'G1062',
  'Prophecy',
  '{"Wedding","Church","Jesus"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f99',
  'prophecy',
  'The Rider on the White Horse',
  'Revelation 19:11-13',
  'I saw heaven standing open and there before me was a white horse, whose rider is called Faithful and True.',
  'In a Roman "Triumph," a victorious general would ride into the city on a white horse. Jesus is the divine Conqueror, but His weapon is unique: a "sharp sword" coming from His mouth—His Word.',
  'His name "Faithful and True" is the ultimate contrast to the "Deceiver." His robe is "dipped in blood"—likely His own—showing that His victory was won through sacrifice, not through the slaughter of others.',
  'pistis',
  'pistos',
  'faithful, reliable, trustworthy',
  'G4103',
  'Prophecy',
  '{"Conqueror","Jesus","Victory"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f100',
  'prophecy',
  'The Great White Throne',
  'Revelation 20:11-12',
  'Then I saw a great white throne... and the dead, great and small, standing before the throne.',
  'In an unjust world where powerful kings often avoided accountability, this vision of a "White Throne" guaranteed that every human life would be evaluated by a perfectly pure and holy Judge.',
  'The "books were opened" represented the record of human deeds. However, another book—the "Book of Life"—was the ultimate deciding factor. It shows that judgment is real, but mercy is the final word for those who belong to the Lamb.',
  'thronos',
  'thronos',
  'seat, chair of state, throne',
  'G2362',
  'Prophecy',
  '{"Judgment","Throne","Justice"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f101',
  'language',
  'Agape - Sacrificial Love',
  '1 Corinthians 13:4',
  'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
  'In the Greek-speaking world, "Agape" was a rare word until the early Christians adopted it to describe the unique, unconditional love of God. It was distinct from romantic or brotherly love.',
  'Agape is a love of the will, not just the emotions. It is the choice to seek the highest good of another person, even at one’s own expense. This radical concept was the primary "mark" of the early church that shocked the Roman world.',
  'agape',
  'agapē',
  'love, benevolence, good will',
  'G26',
  'Language',
  '{"Love","Character","Agape"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f102',
  'language',
  'Phileo - Brotherly Affection',
  'John 21:17',
  'He said to him the third time, "Simon son of John, do you love me?"',
  'Phileo describes the warm, tender affection shared between close friends or family members. It is the root of the word "Philadelphia" (City of Brotherly Love).',
  'When Jesus restored Peter, He shifted to using ''phileo,'' meeting Peter in his human frailty. It shows that God values our genuine, emotional friendship and affection as much as our sacrificial commitment.',
  'phileo',
  'phileō',
  'to love with friendship, to be fond of',
  'G5368',
  'Language',
  '{"Friendship","Love","Peter"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f103',
  'language',
  'Doxa - Divine Glory',
  'Luke 2:14',
  'Glory to God in the highest heaven, and on earth peace to those on whom his favor rests.',
  'In secular Greek, "Doxa" meant an opinion or reputation. However, the biblical writers infused it with the Hebrew concept of "Kabod"—the heavy, crushing weight of God’s actual presence.',
  'To give God glory (doxa) is to acknowledge His weight and importance above all else. It is not just praise, but a recognition of His manifest splendor and the "radiance" that emanates from His character.',
  'doxa',
  'doxa',
  'glory, splendor, brightness, majesty',
  'G1391',
  'Language',
  '{"Glory","Presence","Worship"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f104',
  'language',
  'Eirene - The Greek Peace',
  'John 14:27',
  'Peace I leave with you; my peace I give you. I do not give to you as the world gives.',
  'The Greek word "Eirene" was the equivalent of the Hebrew "Shalom." In Roman culture, peace (pax) was the absence of war, but in the New Testament, it is the presence of wholeness.',
  'Eirene refers to a state of rest and tranquility that comes from being in a right relationship with God. It is a peace that "transcends understanding" because it doesn’t depend on external circumstances being calm.',
  'eirene',
  'eirēnē',
  'peace, tranquility, rest, harmony',
  'G1515',
  'Language',
  '{"Peace","Rest","Restoration"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f105',
  'language',
  'Charis - Radical Grace',
  'Ephesians 2:8',
  'For it is by grace you have been saved, through faith—and this is not from yourselves.',
  'In the ancient world, "Charis" was the word used for a king’s favor or a gift given to a subject. It carried the idea of "unmerited beauty" or a "joy-producing gift."',
  'Biblical grace (charis) is the absolute opposite of karma. It is God giving us what we do not deserve (mercy) and withholding what we do deserve (judgment). It is the power that enables a life that human effort cannot achieve.',
  'charis',
  'charis',
  'grace, favor, kindness, gift',
  'G5485',
  'Language',
  '{"Grace","Gift","Salvation"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f106',
  'language',
  'Pistis - Active Faith',
  'Hebrews 11:1',
  'Now faith is confidence in what we hope for and assurance about what we do not see.',
  'Pistis is more than intellectual agreement. In the first century, it meant "allegiance" or "loyalty" to a person or a cause. To have faith in Christ was to pledge one’s life to Him as King.',
  'Faith (pistis) is described as "assurance" (hypostasis)—the title deed to a property. It is the spiritual evidence that what God has promised is already a legal reality in the heavenly realm.',
  'pistis',
  'pistis',
  'faith, trust, belief, fidelity',
  'G4102',
  'Language',
  '{"Faith","Trust","Allegiance"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f107',
  'language',
  'Elpis - Certain Hope',
  'Romans 5:5',
  'And hope does not put us to shame, because God’s love has been poured out into our hearts.',
  'Unlike the English word "hope" (which means a wish), the Greek "Elpis" means a "certain expectation." It is the confident waiting for something that is guaranteed to happen.',
  'Biblical hope (elpis) is an anchor for the soul (Hebrews 6:19). It doesn’t cross its fingers; it rests because the One who promised is faithful. It is the "joyful anticipation" of God’s final victory.',
  'elpis',
  'elpis',
  'hope, expectation, trust, confidence',
  'G1680',
  'Language',
  '{"Hope","Anchor","Future"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f108',
  'language',
  'Kerygma - The Proclamation',
  '1 Corinthians 1:21',
  'God was pleased through the foolishness of what was preached to save those who believe.',
  'In the ancient world, a "Keryx" (herald) would arrive at a city and proclaim the decree of a king. "Kerygma" is the content of that proclamation—the announcement that a new King has arrived.',
  'The early church didn’t just offer "advice" or "philosophies." They proclaimed the "kerygma"—the historical fact of Jesus’ death and resurrection. It was a royal announcement that demanded a response of allegiance.',
  'kerygma',
  'kerygma',
  'preaching, proclamation, announcement',
  'G2782',
  'Language',
  '{"Preaching","Herald","Kingdom"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f109',
  'language',
  'Diakonia - Humble Service',
  'Mark 10:45',
  'For even the Son of Man did not come to be served, but to serve.',
  'In Greek culture, being a "diakonos" (servant/waiter) was considered shameful and low-status. Dignity was found in being served, not in serving others.',
  'Jesus completely inverted this cultural value. He took the "diakonia" of a waiter and made it the supreme mark of leadership. To "minister" (diakoneō) is to practically meet the needs of others with the heart of a servant.',
  'diakonia',
  'diakonia',
  'service, ministry, waiting at table',
  'G1248',
  'Language',
  '{"Service","Leadership","Humility"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f110',
  'language',
  'Martyrion - The Courageous Witness',
  'Acts 1:8',
  'But you will receive power... and you will be my witnesses (martyres) in Jerusalem.',
  'A "Martys" was a legal witness who testified to what they had seen and heard. In the early church, this testimony often led to death, which is how the word "martyr" took on its secondary meaning.',
  'Being a witness (martyrion) meant that one’s life was on the line for the truth of their message. The "power" Jesus promised was specifically the internal fortitude to stand as a witness even in the face of death.',
  'martyrion',
  'martyrion',
  'testimony, proof, witness',
  'G3142',
  'Language',
  '{"Witness","Courage","Martyrdom"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f111',
  'language',
  'Parakletos - The Comforter',
  'John 14:16',
  'And I will ask the Father, and he will give you another advocate to help you and be with you forever.',
  'In Greek life, a "Parakletos" was a legal advocate or an expert called to "stand alongside" someone in a court of law. They provided defense, counsel, and strength to the accused.',
  'Jesus calls the Holy Spirit "another" Parakletos—meaning someone of the same kind as Himself. The Spirit isn’t just a "feeling"; He is a Person who stands with the believer to guide, defend, and empower them.',
  'parakletos',
  'paraklētos',
  'advocate, comforter, helper, counselor',
  'G3875',
  'Language',
  '{"Holy Spirit","Helper","Advocate"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f112',
  'language',
  'Hupomone - Active Endurance',
  'James 1:3',
  'Because you know that the testing of your faith produces perseverance (hupomonēn).',
  'Hupomone literally means "to remain under" (hupo = under, mone = remain). It was used of a soldier who stayed at his post under heavy fire, or a plant that stood firm against a storm.',
  'Biblical endurance (hupomone) is not passive resignation. It is "victorious persistence"—the quality that turns a trial into a triumph by staying faithful to the end regardless of the pressure.',
  'hupomone',
  'hypomonē',
  'patience, endurance, steadfastness',
  'G5281',
  'Language',
  '{"Perseverance","Faith","Strength"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f113',
  'language',
  'Suneidesis - The Inner Witness',
  'Romans 2:15',
  'They show that the requirements of the law are written on their hearts, their consciences also bearing witness.',
  'The Greek concept of "Suneidesis" means "to know together with." It describes the internal "moral compass" that God has placed in every human heart, regardless of their religious background.',
  'Paul argues that even Gentiles who do not have the written Law are accountable to God because their conscience (suneidesis) acts as an internal courtroom, either excusing or accusing their behavior.',
  'suneidesis',
  'syneidēsis',
  'conscience, moral consciousness',
  'G4893',
  'Language',
  '{"Conscience","Morality","Law"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f114',
  'history',
  'The Pool of Bethesda',
  'John 5:2',
  'Now there is in Jerusalem near the Sheep Gate a pool... surrounded by five covered colonnades.',
  'For centuries, critics doubted the existence of this pool because of its unique "five colonnade" description. However, archaeologists in the 19th century excavated the exact site, confirming John’s detail.',
  'Bethesda was a "healing pool" associated with miracles. Jesus’ healing of the man there challenged the local superstitions by showing that He alone was the true Source of restoration, independent of the water’s movement.',
  'Bethesda',
  'Bēthesda',
  'house of mercy, house of grace',
  'G952',
  'History',
  '{"Bethesda","Healing","Archaeology"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f115',
  'history',
  'The Antonia Fortress',
  'Acts 21:34-37',
  'The commander... ordered that Paul be taken into the barracks.',
  'The Antonia Fortress was a massive Roman military barracks built by Herod the Great at the northwest corner of the Temple Mount. It allowed Roman soldiers to monitor the Temple activities almost instantly.',
  'Because the fortress was connected to the Temple, Roman soldiers could intervene in a riot in seconds. Paul was rescued from a mob here, and many believe the Praetorium (where Jesus was tried) was located within its walls.',
  'parembolé',
  'parembolē',
  'barracks, army, fortress, camp',
  'G3925',
  'History',
  '{"Rome","Fortress","Military"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f116',
  'history',
  'The Library of Ephesus',
  'Acts 19:10',
  'This went on for two years, so that all the Jews and Greeks who lived in the province of Asia heard the word.',
  'Ephesus was the intellectual capital of Asia Minor. The Library of Celsus (completed later, but representing the city’s culture) highlight the city’s extreme emphasis on Greco-Roman learning and philosophy.',
  'Paul spent two years in Ephesus, likely teaching in the Hall of Tyrannus. The city’s strategic location and focus on learning made it the perfect hub for the gospel to spread to the entire "province of Asia."',
  'Asiana',
  'Asia',
  'Asia, the Roman province of Asia',
  'G773',
  'History',
  '{"Ephesus","Education","Strategy"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f117',
  'history',
  'The Areopagus (Mars Hill)',
  'Acts 17:19',
  'Then they took him and brought him to a meeting of the Areopagus.',
  'The Areopagus was a prominent rock outcropping near the Acropolis in Athens. It served as the meeting place for the city’s high council, which oversaw religion, morality, and education.',
  'Paul was brought here not as a criminal, but as an ''introducer of new gods.'' His brilliant speech there correctly identified their ''Unknown God'' as the Creator, using their own poets to build a cultural bridge.',
  'Areios Pagos',
  'Areios Pagos',
  'the Hill of Ares, Mars’ Hill',
  'G697',
  'History',
  '{"Athens","Philosophy","Paul"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f118',
  'history',
  'The Appian Way',
  'Acts 28:15-16',
  'The brothers and sisters there had heard we were coming, and they traveled as far as the Forum of Appius.',
  'The "Via Appia" was Rome’s oldest and most important strategic road, connecting the city to the southeast. It was famously lined with the tombs of noble families and, later, the sites of Christian catacombs.',
  'Paul traveled this road as a prisoner on his way to his trial in Rome. Believers from Rome walked miles out to meet him at the "Three Taverns," an act of incredible honor that Paul said greatly "encouraged" him.',
  'hodos',
  'hodos',
  'road, path, highway',
  'G3598',
  'History',
  '{"Rome","Roads","Paul"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f119',
  'history',
  'The Herodion Fortress',
  'Matthew 2:1-3',
  'After Jesus was born in Bethlehem... Magi from the east came.',
  'The Herodion was a massive "palace-fortress" built by Herod the Great on a man-made hill. It was visible from Bethlehem. Herod could literally look out from his palace and see the town where the Magi said a new King was born.',
  'The Herodion was Herod’s ultimate statement of power and paranoia. Its presence looming over Bethlehem explains why the city was so ''disturbed'' when a rival ''King of the Jews'' was proclaimed in its shadow.',
  'hērōdēs',
  'hērōdēs',
  'hero-like, Herod',
  'G2264',
  'History',
  '{"Herod","Fortress","Bethlehem"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  'f120',
  'history',
  'The Siege of Masada',
  'Matthew 24:1-2',
  'I tell you the truth, not one stone here will be left on another; every one will be thrown down.',
  'Masada was a mountaintop fortress where Jewish rebels made their last stand against the Roman Tenth Legion in 73 AD. The Roman siege ramp is still visible today, marking the final tragic end of the first Jewish-Roman war.',
  'The fall of Masada followed the destruction of the Temple in 70 AD. It was the physical end of the Jewish nation in the land for nearly 1,900 years, fulfilling the "abomination of desolation" warnings Jesus gave His disciples.',
  'erēmōsis',
  'erēmōsis',
  'desolation, destruction, making waste',
  'G2050',
  'History',
  '{"Masada","Rome","Judgment"}',
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;

-- 3. Seed Scriptures (24 items)
INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's1',
  'John 3:16',
  'John',
  3,
  '16',
  'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
  'New Testament',
  'Gospel',
  '{"Love","Salvation","Eternal Life"}',
  'The foundational verse of Christianity declaring God''s love for humanity.',
  'Nicodemus, a Pharisee, came to Jesus by night. In this conversation, Jesus uses the analogy of Moses lifting up the serpent in the wilderness, contextualizing the Son of Man''s destiny within Israel''s redemptive history.',
  'The Greek word ''monogenes'' (one and only) refers to a unique, specially beloved status, similar to Isaac being Abraham''s ''only'' son. It emphasizes the unmatched worth of the sacrifice provided by God.',
  'agapao',
  'agapaō',
  'to love, to prize, to value highly',
  'G25',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's2',
  'Jeremiah 29:11',
  'Jeremiah',
  29,
  '11',
  'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.',
  'Old Testament',
  'Prophecy',
  '{"Hope","Future","Plans"}',
  'God''s promise of a hopeful future to the exiles in Babylon.',
  'This letter was sent to the exiles in Babylon who were discouraged by a 70-year captivity. God was directing them to settle in, build houses, and pray for the peace of the city while they waited for His timing.',
  'The word ''prosper'' here is ''shalom'', which means holistic peace, completeness, and wholeness - not just financial wealth. It was a communal promise to a nation in crisis.',
  'shalom',
  'shalom',
  'peace, completeness, soundness, welfare',
  'H7965',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's3',
  'Psalm 23:1-3',
  'Psalms',
  23,
  '1-3',
  'The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
  'Old Testament',
  'Wisdom',
  '{"Shepherd","Rest","Provision"}',
  'David''s beloved psalm of God as the perfect shepherd.',
  'David, once a shepherd himself, uses the intimate language of his former trade to describe his relationship with God. In the Judean wilderness, finding green pastures and quiet waters was a life-saving necessity.',
  'A shepherd in the ancient Near East was responsible for every detail of the sheep''s life. ''Quiet waters'' were essential because sheep are generally afraid of moving water and will not drink from it if it is rushing.',
  'ra-ah',
  'ra''ah',
  'to shepherd, to feed, to guide',
  'H7462',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's4',
  'Romans 8:28',
  'Romans',
  8,
  '28',
  'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  'New Testament',
  'Epistle',
  '{"Purpose","Good","Providence"}',
  'Paul''s declaration that God orchestrates all circumstances for the believer''s good.',
  'Paul wrote to a church in Rome facing increasing pressure and eventual persecution. This verse served as a theological anchor that current suffering was not meaningless.',
  'The Greek concept of ''purpose'' (prothesis) was used in architectural or legal settings to describe a pre-determined plan or setting forth of a goal. God is shown as the ultimate architect of history.',
  'synergei',
  'synergei',
  'to work together, to cooperate, to help',
  'G4903',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's5',
  'Philippians 4:13',
  'Philippians',
  4,
  '13',
  'I can do all this through him who gives me strength.',
  'New Testament',
  'Epistle',
  '{"Strength","Contentment","Christ"}',
  'Paul''s declaration of contentment through Christ''s enabling strength.',
  'Paul was writing from a Roman prison when he penned these words. He wasn''t talking about athletic feats but about the ability to be content in both abundance and extreme poverty.',
  'Roman prisoners relied entirely on friends for food and basic needs. Paul acknowledges Christ as his ultimate source of sustenance and internal fortitude when external help was scarce.',
  'endynamounti',
  'endynamounti',
  'to empower, to enable, to give strength',
  'G1743',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's6',
  'Genesis 1:1',
  'Genesis',
  1,
  '1',
  'In the beginning God created the heavens and the earth.',
  'Old Testament',
  'Law',
  '{"Creation","Beginning","God"}',
  'The foundational declaration of God''s creative authority.',
  'Written to Israelites emerging from 400 years of Egyptian polytheism, this verse was a polemic against the pagan creation myths that involved wars between gods.',
  'The Hebrew word for God here is ''Elohim'', a plural of majesty that highlights His infinite power and complexity, standing in contrast to the singular, limited local deities of the surrounding nations.',
  'bara',
  'bara',
  'to create out of nothing, to shape, to fashion',
  'H125',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's7',
  'Isaiah 40:31',
  'Isaiah',
  40,
  '31',
  'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary.',
  'Old Testament',
  'Prophecy',
  '{"Strength","Hope","Renewal"}',
  'Isaiah''s promise of supernatural strength to those who wait on God.',
  'This prophecy was given to a people whose home had been devastated and who felt God had forgotten them. It emphasizes the infinite energy of the Creator contrasted with human frailty.',
  'The eagle was a symbol of rejuvenation in ancient lore. The ''renewal'' of the eagle''s strength was thought to happen periodically, making it a powerful image of God''s repetitive grace.',
  'qavah',
  'qavah',
  'to wait, to expect, to hope eagerly',
  'H6960',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's8',
  'Matthew 5:3-10',
  'Matthew',
  5,
  '3-10',
  'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted...',
  'New Testament',
  'Gospel',
  '{"Beatitudes","Blessing","Kingdom"}',
  'The opening of the Sermon on the Mount, defining the values of God''s kingdom.',
  'The Beatitudes (from ''beati'', meaning blessed) were a series of ''kingdom proclamations.'' In a world ruled by Roman power and Pharisaic legalism, these statements completely inverted the social and spiritual pyramid.',
  'The term ''poor in spirit'' (ptōchos) refers to a beggar who has absolutely nothing and is totally dependent on others. Jesus wasn''t just talking about humility, but a recognized bankruptcy before God as the only gateway to His kingdom.',
  'makarios',
  'makarios',
  'blessed, fortunate, happy, well-off',
  'G3107',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's9',
  'Matthew 28:19-20',
  'Matthew',
  28,
  '19-20',
  'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit...',
  'New Testament',
  'Gospel',
  '{"Commission","Disciples","Mission"}',
  'Jesus'' final command to His disciples before His ascension.',
  'This command was given on a mountain in Galilee. Mountains were traditionally places of divine revelation. The ''Great Commission'' shifted the focus of God''s people from a single nation (Israel) to every ''ethne'' (people group) on earth.',
  'The word ''disciples'' refers to a ''mathetes''—a learner who follows a teacher so closely that they become like them. In the ancient world, disciples didn''t just study books; they imitated the life and character of their rabbi.',
  'matheteuo',
  'mathēteuō',
  'to make a disciple, to teach, to instruct',
  'G3100',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's10',
  'Exodus 20:1-3',
  'Exodus',
  20,
  '1-3',
  'And God spoke all these words: ''I am the LORD your God... You shall have no other gods before me.''',
  'Old Testament',
  'Law',
  '{"Commands","Covenant","Law"}',
  'The introduction to the Ten Commandments at Mount Sinai.',
  'The Ten Commandments (the Decalogue) were given at Sinai as the foundational constitution of the newly formed nation of Israel. They followed the structure of an ancient Near Eastern ''suzerainty treaty'' between a king and his subjects.',
  'Placing ''no other gods before me'' was a direct challenge to the Egyptian gods the Israelites had known for 400 years. It established monotheism not just as a belief, but as a legal requirement for the community''s survival.',
  'elohim',
  '’ĕlōhīm',
  'God, gods, judge, supreme being',
  'H430',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's11',
  'Galatians 5:22-23',
  'Galatians',
  5,
  '22-23',
  'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
  'New Testament',
  'Epistle',
  '{"Holy Spirit","Fruit","Character"}',
  'The characteristic qualities produced by the Holy Spirit in a believer''s life.',
  'Paul was writing to churches in Galatia that were struggling with legalism—trying to produce righteousness by following the Law. Paul argues that true character is an internal, organic ''fruit'' of God''s Spirit, not a manufactured work.',
  'The list is singular: ''the fruit'' (karpos). In Greek, this implies that these nine qualities are a unified package. You don''t get ''joy'' without ''love'' or ''gentleness'' without ''self-control''; they grow together as a single harvest.',
  'karpos',
  'karpos',
  'fruit, result, produce, outcome',
  'G2590',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's12',
  'Ephesians 6:10-11',
  'Ephesians',
  6,
  '10-11',
  'Finally, be strong in the Lord and in his mighty power. Put on the full armor of God, so that you can take your stand...',
  'New Testament',
  'Epistle',
  '{"Armor","Strength","Warfare"}',
  'Paul''s call to spiritual alertness using the analogy of a Roman soldier''s armor.',
  'Paul wrote this while under house arrest in Rome, literally seeing Roman legionaries every day. The ''full armor'' (panoplia) meant a soldier was equipped for both defensive and offensive front-line combat.',
  'To ''take your stand'' (stēnai) was a military term for holding a position in a phalanx. If one soldier broke, the entire formation failed. Spiritual armor was designed for the individual to protect the collective community.',
  'panoplia',
  'panoplia',
  'full armor, complete suit of armor',
  'G3833',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's13',
  'Psalm 46:1',
  'Psalms',
  46,
  '1',
  'God is our refuge and strength, an ever-present help in trouble.',
  'Old Testament',
  'Wisdom',
  '{"Refuge","Strength","Protection"}',
  'A song of confidence in God amidst national and natural disasters.',
  'Many believe this Psalm was written after the miraculous defeat of Sennacherib''s army outside the gates of Jerusalem. It celebrates the city''s survival as a direct result of God''s ''dwelling'' in her midst.',
  'A ''refuge'' (machaseh) was a fortified shelter or a cave in the rocks where one could flee from a pursuing enemy. It wasn''t just a metaphor but a life-saving reality for anyone living in the volatile Judean hills.',
  'machaseh',
  'maḥăseh',
  'refuge, shelter, hope, trust',
  'H4268',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's14',
  'Isaiah 9:6',
  'Isaiah',
  9,
  '6',
  'For to us a child is born, to us a son is given... and he will be called Wonderful Counselor, Mighty God...',
  'Old Testament',
  'Prophecy',
  '{"Jesus","Prophecy","Christmas"}',
  'The prophetic declaration of the birth of the Messiah.',
  'This prophecy was given during a time of Assyrian invasion. ''Galilee of the Gentiles'' was the first to fall to the enemy. Isaiah promises that the land which first saw the darkness would be the first to see the ''Great Light.''',
  'The four titles given—Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace—were ''throne names.'' In the ancient Near East, kings were given a series of honorific titles during their coronation to describe their character.',
  'sar-shalom',
  'sar-šālōm',
  'Prince of Peace',
  'H8269 + H7965',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's15',
  'Revelation 21:4',
  'Revelation',
  21,
  '4',
  'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain...',
  'New Testament',
  'Apocalyptic',
  '{"Heaven","Hope","New Earth"}',
  'The promise of God''s ultimate restoration and the removal of suffering.',
  'John was writing from exile on Patmos, a rocky prison island. His vision of a place with ''no more sea'' (v. 1) symbolized the end of separation, and the ''wiping of tears'' signaled the final end of Roman persecution.',
  'In ancient culture, tears were often collected in small bottles (lachrymatories) as a memorial of grief. God wiping away the tears signifies the total deletion of the cause of the sorrow—not just comfort, but a reset of history.',
  'exaleipho',
  'exaleiphō',
  'to wipe away, blot out, erase, cancel',
  'G1813',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's16',
  'John 14:6',
  'John',
  14,
  '6',
  'Jesus answered, ''I am the way and the truth and the life. No one comes to the Father except through me.''',
  'New Testament',
  'Gospel',
  '{"Jesus","Way","Authority"}',
  'Jesus'' declaration of His unique role as the mediator between God and humanity.',
  'This was spoken on the night of the Last Supper, as the disciples were confused and fearful about Jesus'' departure. Thomas had just asked, ''How can we know the way?''',
  'The ''Way'' (hodos) became the first name for the Christian movement (Acts 9:2). It implies a literal path or a journey. Jesus was claiming to be the actual terrain one must walk on to reach the destination of God.',
  'hodos',
  'hodos',
  'way, road, path, journey, conduct',
  'G3598',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's17',
  '2 Timothy 1:7',
  '2 Timothy',
  1,
  '7',
  'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
  'New Testament',
  'Epistle',
  '{"Holy Spirit","Fear","Power"}',
  'Paul''s encouragement to Timothy to overcome fear in ministry.',
  'Paul was in a dungeon in Rome awaiting execution. Timothy was a young leader facing intense opposition in Ephesus. Paul reminds him that fear is not a byproduct of God''s Spirit, but a distortion to be resisted.',
  'The word for ''self-discipline'' (sōphronismos) refers to a ''sound mind'' or ''sober-mindedness.'' In a crisis, the Spirit provides the mental clarity needed to act correctly rather than reacting in panic.',
  'dynamis',
  'dynamis',
  'power, might, strength, ability',
  'G1411',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's18',
  'Hebrews 11:1',
  'Hebrews',
  11,
  '1',
  'Now faith is confidence in what we hope for and assurance about what we do not see.',
  'New Testament',
  'Epistle',
  '{"Faith","Hope","Assurance"}',
  'The definitive biblical description of the nature of faith.',
  'Written to Jewish Christians who were tempted to drift back to old rituals to avoid persecution. This chapter (the ''Hall of Faith'') argues that every great ancestor lived by a future-oriented trust in God''s word.',
  'The word ''assurance'' (hypostasis) also refers to a ''title deed'' or a ''legal document.'' Faith is the spiritual title deed that proves we already own the things God has promised, even before we see them.',
  'hypostasis',
  'hypostasis',
  'substance, confidence, assurance, essence',
  'G5287',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's19',
  'James 1:5',
  'James',
  1,
  '5',
  'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault...',
  'New Testament',
  'Epistle',
  '{"Wisdom","Prayer","Guidance"}',
  'A practical promise for anyone seeking divine direction in trials.',
  'James was written by the brother of Jesus to ''the twelve tribes scattered among the nations.'' His audience was enduring trials and poverty, and they needed ''wisdom from above'' to navigate these pressures.',
  'In Jewish ''Wisdom Literature,'' wisdom (sophia) is not just knowledge, but the practical skill of living well in a broken world. God''s ''generosity'' here is ''haplōs''—meaning singly, directly, and without a hidden agenda.',
  'sophia',
  'sophia',
  'wisdom, insight, skill, intelligence',
  'G4678',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's20',
  '1 Corinthians 13:4-8',
  '1 Corinthians',
  13,
  '4-8',
  'Love is patient, love is kind. It does not envy, it does not boast... Love never fails.',
  'New Testament',
  'Epistle',
  '{"Love","Agape","Character"}',
  'The ''Hymn of Love'' defining the supreme Christian virtue.',
  'The church in Corinth was brilliant but chaotic—fighting over spiritual gifts and social status. Paul wrote this chapter to show that even the most impressive supernatural gifts are worthless without ''Agape.''',
  'The Greek language has multiple words for love. ''Agape'' refers specifically to a love of the will—a committed, sacrificial choice to seek the highest good of another, regardless of their response.',
  'agape',
  'agapē',
  'love, benevolence, good will, affection',
  'G26',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's21',
  'Deuteronomy 31:6',
  'Deuteronomy',
  31,
  '6',
  'Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you...',
  'Old Testament',
  'Law',
  '{"Courage","Presence","Strength"}',
  'Moses'' final encouragement to the nation of Israel before they entered the Promised Land.',
  'Moses was 120 years old and about to die. He was handing over leadership to Joshua. The ''them'' refers to the powerful Canaanite nations that lived in the land Israel was about to reclaim.',
  'The word ''courageous'' (amats) also means to ''secure'' or ''harden.'' It’s the image of a soldier girding his waist and preparing his mind for a struggle by relying on a power outside himself.',
  'amats',
  '’āmaṣ',
  'to be strong, alert, courageous, brave',
  'H553',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's22',
  'Joshua 1:9',
  'Joshua',
  1,
  '9',
  'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged...',
  'Old Testament',
  'History',
  '{"Courage","Command","Presence"}',
  'God''s direct commission to Joshua as the new leader of Israel.',
  'This was spoken after the death of Moses. Joshua was literally standing on the border of the Jordan River, facing an impossible task. God reminds him that his authority is ''commanded'' and his courage is based on God''s ''being'' with him.',
  'To ''not be discouraged'' (chatath) also means to ''not be shattered'' or ''not be terrified.'' God was promising Joshua that no matter how intense the pressure, his inner strength would remain intact because of the Divine Presence.',
  'chatath',
  'ḥātath',
  'to be shattered, dismayed, broken, afraid',
  'H2865',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's23',
  'Proverbs 3:5-6',
  'Proverbs',
  3,
  '5-6',
  'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him...',
  'Old Testament',
  'Wisdom',
  '{"Trust","Guidance","Wisdom"}',
  'The quintessential biblical formula for divine guidance.',
  'Solomon wrote these proverbs as a guide for his sons and the future leaders of Israel. It emphasizes that human logic ''understanding'', while useful, is incomplete without ''trust'' in the Creator''s broader perspective.',
  'To ''lean'' (sha-an) was the phrase used for a king leaning on the arm of his most trusted general or advisor. Proverb tells us to never use our own limited logic as our primary support.',
  'batach',
  'bāṭaḥ',
  'to trust, be confident, be secure, rely',
  'H982',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  's24',
  'Matthew 6:9-13',
  'Matthew',
  6,
  '9-13',
  'Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven...',
  'New Testament',
  'Gospel',
  '{"Prayer","Father","Kingdom"}',
  'The Lord''s Prayer—Jesus'' model for how His disciples should communicate with God.',
  'Jesus gave this prayer in the Sermon on the Mount as a contrast to the ''vain repetitions'' of the pagans. It was intended not as a magical chant, but as a summary of the priorities of a kingdom citizen.',
  'Addressing God as ''Father'' (Abba) was a radical intimacy. While Jews respected God''s name (YHWH), Jesus invited His followers into a family relationship, starting with hallowing (treating as holy) that sacred name.',
  'hagiazō',
  'hagiazō',
  'to hallow, sanctify, treat as holy, set apart',
  'G37',
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;

-- 4. Seed Word of the Day
INSERT INTO public.word_of_the_day (
  id, date, verse, reference, original_intent, theological_truth, modern_walk, prayer_focus, memory_verse
)
VALUES (
  'wotd1',
  CURRENT_DATE,
  'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.',
  'Jeremiah 29:11',
  'This promise was given to Jewish exiles in Babylon who faced a 70-year captivity. They wanted quick rescue; God offered long-term flourishing. It was not an immediate prosperity gospel but a call to settle in, build lives, and wait for God''s timing. The prosperity mentioned is ''shalom'' - comprehensive well-being, not just financial success.',
  'God''s sovereignty extends even over exile and suffering. His plans are not derailed by tragedy or injustice. This verse teaches that God''s timeline differs from ours, and His definition of ''good'' encompasses spiritual formation, not just comfort. He is the God who redeems even captivity.',
  'When life feels like exile - when circumstances are not what you planned - God''s plans are still at work. Do not mistake slowness for abandonment. Bloom where you are planted. Invest in the present season while trusting the Author of your future. Shalom is available right now in your relationship with Him.',
  'Heavenly Father, help me trust Your plans when I cannot see the path ahead. Teach me to rest in Your sovereignty and to embrace the season I am in. Give me eyes to see Your hand at work even in waiting. Let Your shalom guard my heart today.',
  'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11'
)
ON CONFLICT (id) DO UPDATE SET
  verse = EXCLUDED.verse,
  reference = EXCLUDED.reference,
  original_intent = EXCLUDED.original_intent,
  theological_truth = EXCLUDED.theological_truth,
  modern_walk = EXCLUDED.modern_walk,
  prayer_focus = EXCLUDED.prayer_focus,
  memory_verse = EXCLUDED.memory_verse;
