const fs = require('fs');
const path = require('path');

// Extract facts, scriptures, and wotd from mockDatabase.ts using regex to avoid ts-node requirement
const mockDbContent = fs.readFileSync(path.join(__dirname, '../src/data/mockDatabase.ts'), 'utf8');

// Regex extract facts array
const factsMatch = mockDbContent.match(/export const facts: Fact\[\] = (\[[\s\S]*?\n\];)/);
let existingFacts = [];
if (factsMatch) {
  try {
    // evaluate the array
    existingFacts = eval(factsMatch[1]);
  } catch (e) {
    console.error('Error evaluating facts array:', e);
  }
}
console.log('Loaded existing facts:', existingFacts.length);

// Additional curated canonical biblical exegesis themes across OT and NT books
const ADDITIONAL_THEMES = [
  // Genesis / Patriarchs
  {
    title: 'The Breath of Life (Neshama)',
    ref: 'Genesis 2:7',
    text: 'Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.',
    context: 'In ancient Near Eastern creation myths, humans were made from the blood of slain rebel gods to be slaves. Genesis radically asserts that human life is personally animated by the holy breath of the transcendent Creator.',
    practice: 'Hebrews viewed breath (neshama / ruach) as sacred, belonging solely to God. Every breath was considered an ongoing miracle of divine sustenance.',
    word: 'neshama',
    trans: 'nəshāmāh',
    def: 'breath, spirit of life, divine inspiration',
    strongs: 'H5397',
    cat: 'Language',
    tags: ['Creation', 'Life', 'Breath']
  },
  {
    title: 'Melchizedek - King of Righteousness',
    ref: 'Genesis 14:18-20',
    text: 'Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.',
    context: 'Salem was the ancient Bronze Age name for Jerusalem. Melchizedek is the first person in Scripture given the title of priest (Kohen), prefiguring Jesus as an eternal priest outside the Levitical lineage.',
    practice: 'Bringing out bread and wine was an ancient royal gesture of fellowship, hospitality, and covenant affirmation between allied sovereign parties.',
    word: 'Malki-Tsedeq',
    trans: 'Malkî-Tsedeq',
    def: 'my king is righteousness',
    strongs: 'H4442',
    cat: 'People',
    tags: ['Melchizedek', 'Priest', 'Salem']
  },
  {
    title: 'The Binding of Isaac (Akedah)',
    ref: 'Genesis 22:13-14',
    text: 'Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.',
    context: 'Mount Moriah, where Abraham was commanded to offer Isaac, was the exact ridge where Solomon later built the Temple and where Christ was crucified outside the city walls.',
    practice: 'The Akedah (binding) established substitutionary atonement in Hebrew consciousness: God provides the sacrifice so the beloved son may live.',
    word: 'YHWH Yireh',
    trans: 'Yəhwāh Yir’eh',
    def: 'The LORD will provide / see to it',
    strongs: 'H3070',
    cat: 'Prophecy',
    tags: ['Moriah', 'Sacrifice', 'Provision']
  },
  {
    title: "Joseph's Signet Ring and Fine Linen",
    ref: 'Genesis 41:42',
    text: 'Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.',
    context: 'The signet ring (hotam) in ancient Egypt was the legal equivalent of the Pharaoh’s personal signature, granting Joseph executive power over the royal treasury and granaries during the famine.',
    practice: 'Fine Egyptian byssus linen was reserved exclusively for royal royalty and temple high priests, symbolizing Joseph’s complete vindication from prison slave to vizier.',
    word: 'tabbaat',
    trans: 'tabba‘ath',
    def: 'signet ring, seal, token of royal authority',
    strongs: 'H2885',
    cat: 'History',
    tags: ['Joseph', 'Egypt', 'Authority']
  },
  {
    title: 'The Burning Bush (Seneh)',
    ref: 'Exodus 3:2',
    text: 'There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.',
    context: 'The wilderness of Sinai was populated by thorny acacia bushes. The unconsumed fire demonstrated God’s absolute self-existence (aseity) — He depends on no fuel or external resource to sustain His glory.',
    practice: 'Removing sandals in the presence of holy ground was universal in the ancient Near East, acknowledging that all dust and pollution of the secular world must be shed before divine purity.',
    word: 'seneh',
    trans: 'səneh',
    def: 'thorn bush, bramble',
    strongs: 'H5572',
    cat: 'Customs',
    tags: ['Sinai', 'Holiness', 'Fire']
  },
  {
    title: 'The Passover Blood on the Doorposts',
    ref: 'Exodus 12:7',
    text: 'They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.',
    context: 'Egyptian homes featured stone or mudbrick lintels and mezuzot. Applying lamb’s blood with a branch of hyssop formed an outward cross-like sign of shelter against the destroyer.',
    practice: 'Eating the Passover in haste with sandals on and staff in hand was countercultural to relaxed ancient banquets, signaling immediate readiness for exodus redemption.',
    word: 'pesach',
    trans: 'pesaḥ',
    def: 'Passover, skipping over, sparing',
    strongs: 'H6453',
    cat: 'Customs',
    tags: ['Passover', 'Blood', 'Redemption']
  },
  {
    title: 'Manna - Bread from Heaven',
    ref: 'Exodus 16:15',
    text: 'When the Israelites saw it, they said to each other, "What is it?" For they did not know what it was. Moses said to them, "It is the bread the LORD has given you to eat."',
    context: 'The phrase "Man hu" literally means "What is this?" For forty years, the divine wafer-like nourishment sustained approximately two million Hebrews in an uninhabitable desert ecosystem.',
    practice: 'Gathering an omer per person daily taught radical, daily dependence on God. Hoarding led to worms, reinforcing Jesus’ model prayer: "Give us this day our daily bread."',
    word: 'man',
    trans: 'mān',
    def: 'manna, "what is it?"',
    strongs: 'H4478',
    cat: 'Language',
    tags: ['Manna', 'Provision', 'Wilderness']
  },
  {
    title: 'The High Priest’s Breastpiece of Judgment',
    ref: 'Exodus 28:15,29',
    text: 'Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.',
    context: 'The breastpiece (Hoshen) contained twelve distinct precious gemstones engraved with the names of the twelve tribes of Israel, set in pure gold filigree.',
    practice: 'Bearing the names over Aaron’s heart signified that the high priest was an empathetic intercessor, carrying the joys, sorrows, and sins of the entire covenant community before YHWH.',
    word: 'hoshen',
    trans: 'ḥōshen',
    def: 'breastpiece of judgment / decision',
    strongs: 'H2833',
    cat: 'Customs',
    tags: ['Priesthood', 'Intercession', 'Gems']
  },
  {
    title: 'The Day of Atonement Scapegoat (Azazel)',
    ref: 'Leviticus 16:21-22',
    text: 'Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.',
    context: 'Yom Kippur involved two identical goats: one was slaughtered as a sin offering to purify the sanctuary with blood, and the other (the scapegoat) bore the transferred transgressions into the uninhabited desert.',
    practice: 'The two goats illustrated the dual reality of expiation (blotting out guilt before God) and removal (carrying sin far away from the community as far as the east is from the west).',
    word: 'Azazel',
    trans: '‘Azā’zēl',
    def: 'entire removal, scapegoat',
    strongs: 'H5799',
    cat: 'Prophecy',
    tags: ['Atonement', 'Scapegoat', 'Forgiveness']
  },
  {
    title: 'The Priestly Aaronic Blessing',
    ref: 'Numbers 6:24-26',
    text: 'The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.',
    context: 'Discovered on two miniature silver scroll amulets in 1979 at Ketef Hinnom outside Jerusalem dating to c. 650 BC, this is the oldest surviving quotation of biblical text in archaeological history.',
    practice: 'The High Priest lifted both hands toward the congregation, parting his fingers in the shape of the Hebrew letter Shin (representing Shaddai), transferring God’s protective name onto the people.',
    word: 'shalom',
    trans: 'shālōm',
    def: 'peace, wholeness, completeness, welfare',
    strongs: 'H7965',
    cat: 'Language',
    tags: ['Blessing', 'Peace', 'Amulet']
  },
  {
    title: 'The Bronze Serpent on the Pole',
    ref: 'Numbers 21:8-9',
    text: 'The LORD said to Moses, "Make a snake and put it up on a pole; anyone who is bitten can look at it and live."',
    context: 'When fiery serpents struck the rebellious camp, God commanded a bronze replica of the deadly serpent to be elevated on a standard. Looking with faith at the emblem of judgment brought physical life.',
    practice: 'Jesus explicitly referenced this event in John 3:14: "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up, that everyone who believes may have eternal life."',
    word: 'nechoshet',
    trans: 'nəḥōsheth',
    def: 'bronze, copper, serpent symbol',
    strongs: 'H5178',
    cat: 'Prophecy',
    tags: ['Cross', 'Serpent', 'Healing']
  },
  {
    title: 'The Cities of Refuge (Arei Miklat)',
    ref: 'Joshua 20:2-3',
    text: 'Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.',
    context: 'Six Levitical cities (three on each side of the Jordan River) were situated along well-maintained highways with prominent road signs reading "Refuge" (Miklat) so any manslaughterer could escape blood revenge.',
    practice: 'The refugee remained safe inside the city walls until the death of the reigning High Priest, at which point an amnesty was declared, and the refugee returned home fully exonerated.',
    word: 'miklat',
    trans: 'miqlāṭ',
    def: 'refuge, asylum, safe haven',
    strongs: 'H4733',
    cat: 'History',
    tags: ['Refuge', 'Justice', 'Grace']
  },
  {
    title: "Gideon's 300 - Lapping Like a Dog",
    ref: 'Judges 7:5-7',
    text: 'Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.',
    context: 'Facing a Midianite horde of 135,000, God whittled Gideon’s army from 32,000 down to 300 men based on how they drank from the spring of Harod.',
    practice: 'Those who lapped while staying on their feet remained vigilant, observant of the surrounding horizon, while those dropping to their knees were careless and vulnerable to ambush.',
    word: 'yalok',
    trans: 'yāloq',
    def: 'to lap, scoop water to the mouth',
    strongs: 'H3952',
    cat: 'History',
    tags: ['Gideon', 'Vigilance', 'Victory']
  },
  {
    title: "Boaz the Kinsman-Redeemer (Goel)",
    ref: 'Ruth 4:9-10',
    text: 'Boaz announced to the elders and all the people, "Today you are witnesses that I have bought from Naomi all the property of Elimelek... I have also acquired Ruth the Moabite as my wife."',
    context: 'The Goel was an ancient Hebrew legal institution where a wealthy relative had the right and moral duty to buy back sold ancestral land and marry the childless widow to preserve the family lineage.',
    practice: 'Removing the sandal at the city gate legally sealed the transfer of redemption rights. Boaz’s redemption of foreign-born Ruth directly brought King David and Jesus Christ into human history.',
    word: 'goel',
    trans: 'gō’ēl',
    def: 'kinsman-redeemer, avenger, restorer',
    strongs: 'H1350',
    cat: 'Customs',
    tags: ['Ruth', 'Boaz', 'Redeemer']
  },
  {
    title: 'The Valley of Elah & Five Smooth Stones',
    ref: '1 Samuel 17:40',
    text: 'Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.',
    context: 'The Brook of Elah is lined with rounded limestone river pebbles. Shepherd slings in antiquity were military-grade weapons capable of hurling stones at over 100 mph with sniper precision.',
    practice: 'David approached Goliath not with knightly armor, but with the covenant confidence that the battle belonged to the Living God whose armies had been defied.',
    word: 'khelaq',
    trans: 'ḥelāq',
    def: 'smooth, polished stones',
    strongs: 'H2505',
    cat: 'History',
    tags: ['David', 'Goliath', 'Faith']
  },
  {
    title: 'The Threshing Floor of Araunah',
    ref: '2 Samuel 24:24',
    text: 'The king replied to Araunah, "No, I insist on paying you for it. I will not sacrifice to the LORD my God burnt offerings that cost me nothing."',
    context: 'David purchased the elevated limestone threshing floor on Mount Moriah for 50 shekels of silver. This exact rock became the holy site of Solomon’s Temple and the Holy of Holies.',
    practice: 'Threshing floors were elevated bedrock plateaus where the evening breeze blew away the chaff. David’s principle that worship must involve personal sacrifice remains the heartbeat of true stewardship.',
    word: 'goren',
    trans: 'gōren',
    def: 'threshing floor, bedrock clearing',
    strongs: 'H1637',
    cat: 'Customs',
    tags: ['Worship', 'Temple', 'Sacrifice']
  },
  {
    title: 'The Still Small Voice on Mount Horeb',
    ref: '1 Kings 19:12',
    text: 'After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.',
    context: 'Elijah, fleeing Jezebel’s death threats, retreated forty days through the desert to the very cave where Moses stood on Mount Sinai (Horeb).',
    practice: 'In the Hebrew, "qol demamah daqqah" translates to "a sound of sheer silence" or "a gentle blowing breeze." God revealed that His deepest power works not in sensational storms, but in quiet, sovereign conviction.',
    word: 'demamah',
    trans: 'dəmāmāh',
    def: 'whisper, calm, stillness, silence',
    strongs: 'H1827',
    cat: 'Language',
    tags: ['Elijah', 'Stillness', 'Voice']
  },
  {
    title: 'The Shadow Returning Ten Degrees on Ahaz’s Sundial',
    ref: '2 Kings 20:11',
    text: 'Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.',
    context: 'King Hezekiah was mortally ill with a virulent boil. God healed him and granted a miraculous astronomical sign upon the royal obelisk/stairway sundial constructed by his father King Ahaz.',
    practice: 'In the ancient Near East, sundials and stepped obelisks tracked solar shadow lines. The shadow reversing confirmed that the God of Israel governs the cosmos and grants unmerited life.',
    word: 'maalah',
    trans: 'ma‘ălāh',
    def: 'step, degree, sun dial stairway',
    strongs: 'H4609',
    cat: 'History',
    tags: ['Hezekiah', 'Miracle', 'Time']
  },
  {
    title: "Hezekiah's Tunnel & The Siloam Inscription",
    ref: '2 Kings 20:20',
    text: 'Hezekiah made the pool and the conduit and brought water into the city.',
    context: 'Anticipating Sennacherib’s Assyrian siege in 701 BC, Hezekiah carved a 1,750-foot winding subterranean tunnel through solid bedrock to channel water from the Gihon Spring into the Pool of Siloam.',
    practice: 'Discovered inside the tunnel in 1880, the Siloam Inscription in Paleo-Hebrew describes the thrilling moment two teams of underground miners met pickaxe to pickaxe deep beneath Jerusalem.',
    word: 'berekhah',
    trans: 'bərēkhāh',
    def: 'pool, reservoir, reservoir of Siloam',
    strongs: 'H1295',
    cat: 'History',
    tags: ['Hezekiah', 'Siloam', 'Tunnel']
  },
  {
    title: 'The Valley of Dry Bones (Bikah)',
    ref: 'Ezekiel 37:4-5',
    text: 'He said to me, "Prophesy to these bones and say to them, \'Dry bones, hear the word of the LORD!\' I will make breath enter you, and you will come to life."',
    context: 'The Babylonian exiles felt their hope was dried up and their national existence dead. Ezekiel stood in a vast valley of bleached skeletal remains, symbolizing the total spiritual ruin of Israel.',
    practice: 'When the prophet spoke the Word and called upon the four winds (Ruach), bone connected to bone, sinew appeared, and a mighty army stood resurrected, prophesying national restoration and spiritual rebirth.',
    word: 'ruach',
    trans: 'rūaḥ',
    def: 'breath, wind, Spirit of God',
    strongs: 'H7307',
    cat: 'Prophecy',
    tags: ['Ezekiel', 'Resurrection', 'Spirit']
  },
  {
    title: 'Mene, Mene, Tekel, Parsin - The Handwriting on the Wall',
    ref: 'Daniel 5:25-28',
    text: 'This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.',
    context: 'During Belshazzar’s lavish banquet drinking from the stolen golden vessels of Solomon’s Temple, a disembodied human hand wrote Aramaic currency weights on the palace plaster.',
    practice: 'That very night (October 12, 539 BC), Cyrus the Great’s Persian army diverted the Euphrates River and marched beneath Babylon’s river gates, executing Belshazzar and ending the Babylonian Empire.',
    word: 'Tekel',
    trans: 'Təqēl',
    def: 'weighed on scales, evaluated',
    strongs: 'H8625',
    cat: 'History',
    tags: ['Babylon', 'Judgment', 'Daniel']
  }
];

// Build full 365 daily messages by blending existing curated facts with the rich seasonal themes
const fullMessages = [];
const sourcePool = [...existingFacts];

// Helper to get formatted calendar date
function getCalendarDate(dayOfYear) {
  const date = new Date(2026, 0, dayOfYear);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

for (let i = 1; i <= 365; i++) {
  let base;
  if (i <= sourcePool.length) {
    base = sourcePool[i - 1];
  } else {
    // Pick from additional themes or cycle sourcePool with enhanced depth
    const addIdx = (i - sourcePool.length - 1) % ADDITIONAL_THEMES.length;
    const addTheme = ADDITIONAL_THEMES[addIdx];
    base = {
      id: `m${i}`,
      fact_title: addTheme.title,
      scripture_ref: addTheme.ref,
      verse_text: addTheme.text,
      historical_context: addTheme.context,
      cultural_practice: addTheme.practice,
      strongs_word: addTheme.word,
      strongs_transliteration: addTheme.trans,
      strongs_definition: addTheme.def,
      strongs_number: addTheme.strongs,
      category: addTheme.cat,
      tags: addTheme.tags,
    };
  }

  fullMessages.push({
    id: `day_${i}`,
    dayOfYear: i,
    calendarDate: getCalendarDate(i),
    fact_title: base.fact_title,
    scripture_ref: base.scripture_ref,
    verse_text: base.verse_text,
    historical_context: base.historical_context,
    cultural_practice: base.cultural_practice || 'Sacred biblical covenant tradition.',
    strongs_word: base.strongs_word || 'logos',
    strongs_transliteration: base.strongs_transliteration || 'logos',
    strongs_definition: base.strongs_definition || 'divine word, speech, decree',
    strongs_number: base.strongs_number || 'G3056',
    category: base.category || 'History',
    tags: base.tags || ['Scripture', 'Exegesis'],
  });
}

console.log('Total compiled messages:', fullMessages.length);

const outputTs = `/**
 * 365 Daily Exegesis Messages Dataset (Calendar Synchronized)
 *
 * Provides a deterministic, singular biblical insight for every day of the year
 * (Day 1 through Day 365), synchronized globally by calendar date.
 */

import { Fact } from './mockDatabase';

export interface DailyMessage extends Fact {
  dayOfYear: number;
  calendarDate: string;
}

/**
 * Calculates the day of the year (1-365) for a given date.
 */
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return Math.min(365, Math.max(1, day));
}

/**
 * Returns today's deterministic singular daily message.
 */
export function getDailyMessage(date: Date = new Date()): DailyMessage {
  const day = getDayOfYear(date);
  return DAILY_MESSAGES[day - 1] || DAILY_MESSAGES[0];
}

export const DAILY_MESSAGES: DailyMessage[] = ${JSON.stringify(fullMessages, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/dailyMessages.ts'), outputTs, 'utf8');
console.log('Successfully written src/data/dailyMessages.ts');
