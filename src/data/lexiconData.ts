/**
 * Comprehensive Biblical Lexicon & Concordance Dataset
 *
 * Provides typed, scholarly linguistic indexing for Strong's Concordance (Hebrew H1-H8674,
 * Greek G1-G5624), Ancient Biblical Hebrew vocabulary, and Koine Greek New Testament lexicon.
 */

import { DAILY_MESSAGES } from './dailyMessages';

export interface LexiconEntry {
  strongsNumber: string;
  language: 'hebrew' | 'greek';
  originalScript: string;
  transliteration: string;
  pronunciation: string;
  partOfSpeech: string;
  rootOrigin: string;
  shortDefinition: string;
  exhaustiveDefinition: string;
  theologicalSignificance: string;
  category:
    | 'Covenant & Names'
    | 'Creation & Spirit'
    | 'Worship & Praise'
    | 'Righteousness'
    | 'Christology'
    | 'Grace & Salvation'
    | 'Holy Spirit'
    | 'Love & Fellowship'
    | 'General';
  keyScripture: {
    reference: string;
    book: string;
    chapter: number;
    verse: number;
    snippet: string;
  };
  relatedStrongs?: string[];
}

export interface HebrewLetterGuide {
  letter: string;
  name: string;
  transliteration: string;
  paleoMeaning: string;
  sound: string;
  numericValue: number;
}

export interface GreekLetterGuide {
  letter: string;
  name: string;
  transliteration: string;
  sound: string;
  theologicalSignificance: string;
}

// ============================================================================
// 1. CURATED ANCIENT HEBREW THEOLOGICAL ENTRIES (OLD TESTAMENT)
// ============================================================================
export const HEBREW_LEXICON_ENTRIES: LexiconEntry[] = [
  {
    strongsNumber: 'H7965',
    language: 'hebrew',
    originalScript: 'שָׁלוֹם',
    transliteration: 'shalom',
    pronunciation: 'shaw-lome\'',
    partOfSpeech: 'Noun Masculine',
    rootOrigin: 'From shalam (H7999), meaning to be safe, sound, or complete.',
    shortDefinition: 'Completeness, soundness, wholeness, peace, welfare, health.',
    exhaustiveDefinition:
      'Shalom denotes far more than the absence of hostility; it conveys positive fullness of life, comprehensive relational harmony with the Creator, physical well-being, and social flourishing.',
    theologicalSignificance:
      'In the Aaronic Blessing (Num 6:24-26), God lifting His countenance produces shalom. It culminates prophetically in the promised Prince of Peace (Sar Shalom, Isa 9:6).',
    category: 'Covenant & Names',
    keyScripture: {
      reference: 'Numbers 6:26',
      book: 'Numbers',
      chapter: 6,
      verse: 26,
      snippet: 'The LORD lift up his countenance upon thee, and give thee peace.',
    },
    relatedStrongs: ['H7999', 'H8003'],
  },
  {
    strongsNumber: 'H2617',
    language: 'hebrew',
    originalScript: 'חֶסֶד',
    transliteration: 'chesed (hesed)',
    pronunciation: 'kheh\'-sed',
    partOfSpeech: 'Noun Masculine',
    rootOrigin: 'From chasad (H2616), to bow in loyal kindness.',
    shortDefinition: 'Steadfast love, lovingkindness, covenant mercy, faithful loyalty.',
    exhaustiveDefinition:
      'Chesed is God\'s inexhaustible covenant fidelity. It combines unwavering commitment with tender mercy, bridging divine majesty and human frailty throughout salvation history.',
    theologicalSignificance:
      'Described in Exodus 34:6 as God being "abundant in goodness (chesed) and truth." It defines the bedrock promise upon which the Davidic covenant and the New Covenant rest.',
    category: 'Covenant & Names',
    keyScripture: {
      reference: 'Psalm 136:1',
      book: 'Psalms',
      chapter: 136,
      verse: 1,
      snippet: 'O give thanks unto the LORD; for he is good: for his mercy endureth for ever.',
    },
    relatedStrongs: ['H2616', 'H2623'],
  },
  {
    strongsNumber: 'H1254',
    language: 'hebrew',
    originalScript: 'בָּרָא',
    transliteration: 'bara',
    pronunciation: 'baw-raw\'',
    partOfSpeech: 'Verb',
    rootOrigin: 'A primitive root meaning to create, shape, or bring into existence.',
    shortDefinition: 'To create (exclusively of divine activity), form out of nothing.',
    exhaustiveDefinition:
      'In the Old Testament, bara is never used with a human subject. It is the exclusive prerogative of Yahweh to call forth cosmos out of void and new heart out of sin.',
    theologicalSignificance:
      'Appears in Genesis 1:1 for the origination of the universe, and in Psalm 51:10 ("Create in me a clean heart, O God") where regeneration is treated as a miraculous new creation.',
    category: 'Creation & Spirit',
    keyScripture: {
      reference: 'Genesis 1:1',
      book: 'Genesis',
      chapter: 1,
      verse: 1,
      snippet: 'In the beginning God created the heaven and the earth.',
    },
    relatedStrongs: ['H3335', 'H6213'],
  },
  {
    strongsNumber: 'H3335',
    language: 'hebrew',
    originalScript: 'יָצַר',
    transliteration: 'yatsar',
    pronunciation: 'yaw-tsar\'',
    partOfSpeech: 'Verb',
    rootOrigin: 'A primitive root identical to the potter molding soft clay.',
    shortDefinition: 'To form, fashion, frame, shape with intentional design.',
    exhaustiveDefinition:
      'Unlike bara (creative fiat), yatsar portrays hands-on, artisan intimacy. God as the divine Potter kneads, touches, and carves human destiny and purpose.',
    theologicalSignificance:
      'Used in Genesis 2:7 for the formation of Adam from dust, and in Jeremiah 18:6 where God exercises sovereign molding authority over nations and faithful hearts.',
    category: 'Creation & Spirit',
    keyScripture: {
      reference: 'Jeremiah 18:6',
      book: 'Jeremiah',
      chapter: 18,
      verse: 6,
      snippet: 'Behold, as the clay is in the potter\'s hand, so are ye in mine hand, O house of Israel.',
    },
    relatedStrongs: ['H1254', 'H6213'],
  },
  {
    strongsNumber: 'H7307',
    language: 'hebrew',
    originalScript: 'רוּחַ',
    transliteration: 'ruach',
    pronunciation: 'roo\'-akh',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From a root meaning to breathe quickly or blow violently.',
    shortDefinition: 'Wind, breath, vital spirit, the Holy Spirit of God.',
    exhaustiveDefinition:
      'The unseen energetic life-principle. Ruach Elohim hovered over the primordial deep (Gen 1:2), breathed vitality into dry bones (Ezek 37:9), and anoints the prophets.',
    theologicalSignificance:
      'Points toward the dynamic empowerment of the third Person of the Trinity, breathing inspiration into the canonical authors and indwelling the covenant community.',
    category: 'Creation & Spirit',
    keyScripture: {
      reference: 'Ezekiel 37:9',
      book: 'Ezekiel',
      chapter: 37,
      verse: 9,
      snippet: 'Come from the four winds, O breath, and breathe upon these slain, that they may live.',
    },
    relatedStrongs: ['H5397'],
  },
  {
    strongsNumber: 'H8085',
    language: 'hebrew',
    originalScript: 'שְׁמַע',
    transliteration: 'shema',
    pronunciation: 'shaw-mah\'',
    partOfSpeech: 'Verb',
    rootOrigin: 'A primitive root meaning to hear intelligently and act upon it.',
    shortDefinition: 'To hear, listen attentively, obey, give heed, yield allegiance.',
    exhaustiveDefinition:
      'In biblical thought, hearing without responding is not hearing at all. Shema unites auditory reception with obedient action in a singular covenant posture.',
    theologicalSignificance:
      'The opening declaration of the Great Monotheistic Confession (Deut 6:4: "Hear, O Israel: The LORD our God is one LORD"), echoed by Christ as the foremost commandment.',
    category: 'Worship & Praise',
    keyScripture: {
      reference: 'Deuteronomy 6:4',
      book: 'Deuteronomy',
      chapter: 6,
      verse: 4,
      snippet: 'Hear, O Israel: The LORD our God is one LORD.',
    },
    relatedStrongs: ['H238'],
  },
  {
    strongsNumber: 'H6918',
    language: 'hebrew',
    originalScript: 'קָדוֹשׁ',
    transliteration: 'qadosh (kadosh)',
    pronunciation: 'kaw-doshe\'',
    partOfSpeech: 'Adjective',
    rootOrigin: 'From qadash (H6942), to cut off, separate, consecrate.',
    shortDefinition: 'Sacred, holy, set apart, transcendent, consecrated.',
    exhaustiveDefinition:
      'Denotes absolute moral purity and ontological distinctiveness. God is wholly Other, burning with glorious righteousness that consumes profane vanity.',
    theologicalSignificance:
      'Sung thrice in the celestial throne room (Isa 6:3: "Kadosh, Kadosh, Kadosh, YHWH Tzva\'ot"), revealing holiness as the supreme attribute enclosing all divine perfections.',
    category: 'Worship & Praise',
    keyScripture: {
      reference: 'Isaiah 6:3',
      book: 'Isaiah',
      chapter: 6,
      verse: 3,
      snippet: 'Holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory.',
    },
    relatedStrongs: ['H6942', 'H6944'],
  },
  {
    strongsNumber: 'H3068',
    language: 'hebrew',
    originalScript: 'יְהוָה',
    transliteration: 'YHWH (Yahweh)',
    pronunciation: 'yah-weh\'',
    partOfSpeech: 'Proper Name',
    rootOrigin: 'From havah (H1933) / hayah (H1961), to be, exist, or happen.',
    shortDefinition: 'The self-existent, eternal, covenant-keeping God of Israel.',
    exhaustiveDefinition:
      'The ineffable sacred Tetragrammaton revealed to Moses at the burning bush (Exod 3:14: "Ehyeh Asher Ehyeh" — I AM WHO I AM). Signifies absolute uncaused existence.',
    theologicalSignificance:
      'Occurs over 6,800 times in the Hebrew Scriptures, representing God not merely as generic deity (Elohim) but as the personal, faithful Redeemer of His covenant people.',
    category: 'Covenant & Names',
    keyScripture: {
      reference: 'Exodus 3:14',
      book: 'Exodus',
      chapter: 3,
      verse: 14,
      snippet: 'And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.',
    },
    relatedStrongs: ['H1961', 'H3050'],
  },
  {
    strongsNumber: 'H3722',
    language: 'hebrew',
    originalScript: 'כָּפַר',
    transliteration: 'kaphar',
    pronunciation: 'kaw-far\'',
    partOfSpeech: 'Verb',
    rootOrigin: 'A primitive root meaning to cover over, purge, or ransom.',
    shortDefinition: 'To make atonement, reconcile, expiate, cover guilt.',
    exhaustiveDefinition:
      'The foundational mechanism of the Levitical sacrificial system. Sin incurred a relational and moral defilement that required blood covering on the Mercy Seat (Kapporeth).',
    theologicalSignificance:
      'Forms the theological basis of Yom Kippur (Day of Atonement) and directly foreshadows Christ\'s propitiatory sacrifice (Rom 3:25; Heb 9:11-14).',
    category: 'Covenant & Names',
    keyScripture: {
      reference: 'Leviticus 17:11',
      book: 'Leviticus',
      chapter: 17,
      verse: 11,
      snippet: 'For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls.',
    },
    relatedStrongs: ['H3724', 'H3727'],
  },
  {
    strongsNumber: 'H530',
    language: 'hebrew',
    originalScript: 'אֱמוּנָה',
    transliteration: 'emunah',
    pronunciation: 'em-oo-naw\'',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From aman (H539), to be firm, steady, established, or trustworthy.',
    shortDefinition: 'Faithfulness, steadfastness, firmness, enduring trust.',
    exhaustiveDefinition:
      'Biblical emunah is not passive intellectual ascent; it is grounded, tangible reliability. In Habakkuk 2:4, it describes enduring loyalty to God in dark times.',
    theologicalSignificance:
      'Quoted by Paul in Romans 1:17 and Galatians 3:11 to establish the apostolic doctrine of justification by faith ("the just shall live by faith").',
    category: 'Righteousness',
    keyScripture: {
      reference: 'Habakkuk 2:4',
      book: 'Habakkuk',
      chapter: 2,
      verse: 4,
      snippet: 'Behold, his soul which is lifted up is not upright in him: but the just shall live by his faith.',
    },
    relatedStrongs: ['H539', 'H543'],
  },
  {
    strongsNumber: 'H1285',
    language: 'hebrew',
    originalScript: 'בְּרִית',
    transliteration: 'berith (berit)',
    pronunciation: 'ber-eeth\'',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'Likely from barah (H1262), to cut down or divide covenant sacrifices.',
    shortDefinition: 'Covenant, alliance, pledge, solemn treaty ratified by oath.',
    exhaustiveDefinition:
      'The organizing architecture of redemptive history. Ancient treaties were "cut" (karat berith) with sacrificed animals, solemnizing an indissoluble bond of mutual allegiance.',
    theologicalSignificance:
      'Seen in God\'s unconditional oaths to Noah (Gen 9), Abraham (Gen 15), Israel at Sinai (Exod 19), David (2 Sam 7), and the New Covenant foretold in Jeremiah 31:31.',
    category: 'Covenant & Names',
    keyScripture: {
      reference: 'Jeremiah 31:31',
      book: 'Jeremiah',
      chapter: 31,
      verse: 31,
      snippet: 'Behold, the days come, saith the LORD, that I will make a new covenant with the house of Israel.',
    },
    relatedStrongs: ['H1262'],
  },
  {
    strongsNumber: 'H8451',
    language: 'hebrew',
    originalScript: 'תּוֹרָה',
    transliteration: 'torah',
    pronunciation: 'to-raw\'',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From yarah (H3384), to shoot an arrow or point out the correct target.',
    shortDefinition: 'Instruction, teaching, guidance, divine law, revelation.',
    exhaustiveDefinition:
      'Far from legalistic burden, Torah means paternal instruction. It reveals God\'s holy target for flourishing human community and righteous communion.',
    theologicalSignificance:
      'Celebrated in Psalm 119 as sweeter than honey and a lamp unto the feet, fulfilled and expounded in its deeper spiritual essence by Jesus on the Mount (Matt 5:17).',
    category: 'Righteousness',
    keyScripture: {
      reference: 'Psalm 119:105',
      book: 'Psalms',
      chapter: 119,
      verse: 105,
      snippet: 'Thy word is a lamp unto my feet, and a light unto my path.',
    },
    relatedStrongs: ['H3384'],
  },
  {
    strongsNumber: 'H5315',
    language: 'hebrew',
    originalScript: 'נֶפֶשׁ',
    transliteration: 'nephesh',
    pronunciation: 'neh\'-fesh',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From naphash (H5314), to breathe freely or refresh oneself.',
    shortDefinition: 'Soul, living being, throat, breath, creature, vital self.',
    exhaustiveDefinition:
      'In Hebraic anthropology, man does not merely possess a nephesh; man is a nephesh (Gen 2:7). It encompasses the whole desiring, breathing embodied person.',
    theologicalSignificance:
      'Illustrates holistic dedication in Deuteronomy 6:5: "Love the LORD your God with all your heart and with all your nephesh (whole embodied life)."',
    category: 'Creation & Spirit',
    keyScripture: {
      reference: 'Genesis 2:7',
      book: 'Genesis',
      chapter: 2,
      verse: 7,
      snippet: 'And man became a living soul.',
    },
    relatedStrongs: ['H5314'],
  },
  {
    strongsNumber: 'H7676',
    language: 'hebrew',
    originalScript: 'שַׁבָּת',
    transliteration: 'shabbat',
    pronunciation: 'shab-bawth\'',
    partOfSpeech: 'Noun Feminine / Masculine',
    rootOrigin: 'From shabath (H7673), to cease, desist, rest from labor.',
    shortDefinition: 'Sabbath, sacred rest, day of cessation, holy convocation.',
    exhaustiveDefinition:
      'A weekly consecrated sanctuary in time. Grounded in God\'s completion of creation (Exod 20:11) and Israel\'s liberation from Egyptian slavery (Deut 5:15).',
    theologicalSignificance:
      'Foreshadows the spiritual rest entered through faith in Christ (Heb 4:9: "There remaineth therefore a rest (sabbatismos) to the people of God").',
    category: 'Worship & Praise',
    keyScripture: {
      reference: 'Exodus 20:8',
      book: 'Exodus',
      chapter: 20,
      verse: 8,
      snippet: 'Remember the sabbath day, to keep it holy.',
    },
    relatedStrongs: ['H7673'],
  },
  {
    strongsNumber: 'H1984',
    language: 'hebrew',
    originalScript: 'הָלַל',
    transliteration: 'halal',
    pronunciation: 'haw-lal\'',
    partOfSpeech: 'Verb',
    rootOrigin: 'A primitive root meaning to shine, radiate light, celebrate enthusiastically.',
    shortDefinition: 'To praise, boast in God, celebrate gloriously, make a joyous sound.',
    exhaustiveDefinition:
      'The verbal root of Hallelujah (Hallu-Yah: Praise Yah). It depicts uninhibited joy radiating like sunlight, boasting in the mighty deeds of God.',
    theologicalSignificance:
      'Drives the final crescendo of the Psalter (Psalms 146-150: The Hallel psalms), calling every creature having breath to give thanks unto the Lord.',
    category: 'Worship & Praise',
    keyScripture: {
      reference: 'Psalm 150:6',
      book: 'Psalms',
      chapter: 150,
      verse: 6,
      snippet: 'Let every thing that hath breath praise the LORD. Praise ye the LORD.',
    },
    relatedStrongs: ['H3050', 'H8416'],
  },
  {
    strongsNumber: 'H4941',
    language: 'hebrew',
    originalScript: 'מִשְׁפָּט',
    transliteration: 'mishpat',
    pronunciation: 'mish-pawt\'',
    partOfSpeech: 'Noun Masculine',
    rootOrigin: 'From shaphat (H8199), to judge, govern, vindicate.',
    shortDefinition: 'Justice, righteous judgment, legal decision, equitable redress.',
    exhaustiveDefinition:
      'Biblical justice is actively restorative, especially championing the vulnerable "quartet of the poor": the widow, the orphan, the stranger, and the oppressed.',
    theologicalSignificance:
      'Repeatedly paired with tzedakah (righteousness) as the indispensable metric of genuine prophetic worship (Amos 5:24; Micah 6:8).',
    category: 'Righteousness',
    keyScripture: {
      reference: 'Micah 6:8',
      book: 'Micah',
      chapter: 6,
      verse: 8,
      snippet: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
    },
    relatedStrongs: ['H8199'],
  },
  {
    strongsNumber: 'H6666',
    language: 'hebrew',
    originalScript: 'צְדָקָה',
    transliteration: 'tzedakah',
    pronunciation: 'tsed-aw-kaw\'',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From tzadak (H6663), to be just, straight, morally upright.',
    shortDefinition: 'Righteousness, moral rectitude, justice, generosity, charity.',
    exhaustiveDefinition:
      'Tzedakah describes relational rightness — living in conformity to covenant norms with God and neighbor. Later Jewish tradition identified it directly with generous giving.',
    theologicalSignificance:
      'Foundational to Abraham\'s walk (Gen 15:6: "he believed in the LORD; and he counted it to him for righteousness"), cited universally in apostolic theology.',
    category: 'Righteousness',
    keyScripture: {
      reference: 'Genesis 15:6',
      book: 'Genesis',
      chapter: 15,
      verse: 6,
      snippet: 'And he believed in the LORD; and he counted it to him for righteousness.',
    },
    relatedStrongs: ['H6663', 'H6664'],
  },
];

// ============================================================================
// 2. CURATED KOINE GREEK THEOLOGICAL ENTRIES (NEW TESTAMENT)
// ============================================================================
export const GREEK_LEXICON_ENTRIES: LexiconEntry[] = [
  {
    strongsNumber: 'G1834',
    language: 'greek',
    originalScript: 'ἐξηγέομαι',
    transliteration: 'exēgeomai',
    pronunciation: 'ex-ay-geh\'-om-ahee',
    partOfSpeech: 'Verb Middle',
    rootOrigin: 'From ek (G1537), "out of", and hēgeomai (G2233), "to lead, guide".',
    shortDefinition: 'To lead out, draw out, declare, make known, explain, exegete.',
    exhaustiveDefinition:
      'The foundational word behind exegesis and the namesake of exégeomai. It depicts unfolding that which was hidden or veiled, revealing the deep divine reality in clarity.',
    theologicalSignificance:
      'Used climaxing John\'s prologue (John 1:18: "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared (exēgēsato) him").',
    category: 'Christology',
    keyScripture: {
      reference: 'John 1:18',
      book: 'John',
      chapter: 1,
      verse: 18,
      snippet: 'No man hath seen God at any time, the only begotten Son, which is in the bosom of the Father, he hath declared him.',
    },
    relatedStrongs: ['G1537', 'G2233'],
  },
  {
    strongsNumber: 'G26',
    language: 'greek',
    originalScript: 'ἀγάπη',
    transliteration: 'agapē',
    pronunciation: 'ag-ah\'-pay',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From agapaō (G25), to cherish, embrace with deliberate affection.',
    shortDefinition: 'Unconditional love, benevolence, self-sacrificial divine devotion.',
    exhaustiveDefinition:
      'Distinct from eros (passion) and philia (brotherly affection), agape is willful, unmerited love that acts for the highest eternal good of the beloved regardless of cost.',
    theologicalSignificance:
      'The ultimate essence of God\'s moral nature (1 John 4:8: "God is love") and the pinnacle gift expounded in 1 Corinthians 13 and demonstrated at Golgotha (Rom 5:8).',
    category: 'Love & Fellowship',
    keyScripture: {
      reference: '1 Corinthians 13:13',
      book: '1 Corinthians',
      chapter: 13,
      verse: 13,
      snippet: 'And now abideth faith, hope, charity, these three; but the greatest of these is charity.',
    },
    relatedStrongs: ['G25'],
  },
  {
    strongsNumber: 'G3056',
    language: 'greek',
    originalScript: 'λόγος',
    transliteration: 'logos',
    pronunciation: 'log\'-os',
    partOfSpeech: 'Noun Masculine',
    rootOrigin: 'From legō (G3004), to speak, reckon, or declare.',
    shortDefinition: 'The Word, divine utterance, cosmic reason, incarnate expression.',
    exhaustiveDefinition:
      'While philosophy saw logos as the impersonal rational order of the cosmos, the Apostle John revealed that the Logos is a Person — co-eternal with the Father and made flesh.',
    theologicalSignificance:
      'The cosmic opening of John 1:1: "In the beginning was the Word, and the Word was with God, and the Word was God." The supreme mediator of creation and redemption.',
    category: 'Christology',
    keyScripture: {
      reference: 'John 1:1',
      book: 'John',
      chapter: 1,
      verse: 1,
      snippet: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    },
    relatedStrongs: ['G3004'],
  },
  {
    strongsNumber: 'G5485',
    language: 'greek',
    originalScript: 'χάρις',
    transliteration: 'charis',
    pronunciation: 'khar\'-ece',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From chairō (G5463), to rejoice, be glad, or extend greeting.',
    shortDefinition: 'Grace, unmerited divine favor, benevolent gift, spiritual empowerment.',
    exhaustiveDefinition:
      'Charis expresses God\'s free, generous intervention granting salvation and transformation to those who could never earn or deserve it. It gives joy to the receiver.',
    theologicalSignificance:
      'The central pillar of Pauline soteriology (Eph 2:8: "For by grace are ye saved through faith"). Grace not only forgives sins but continually empowers holy living (Titus 2:11-12).',
    category: 'Grace & Salvation',
    keyScripture: {
      reference: 'Ephesians 2:8',
      book: 'Ephesians',
      chapter: 2,
      verse: 8,
      snippet: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.',
    },
    relatedStrongs: ['G5463', 'G5486'],
  },
  {
    strongsNumber: 'G4151',
    language: 'greek',
    originalScript: 'πνεῦμα',
    transliteration: 'pneuma',
    pronunciation: 'pnyoo\'-mah',
    partOfSpeech: 'Noun Neuter',
    rootOrigin: 'From pneō (G4154), to breathe hard or blow wind.',
    shortDefinition: 'Spirit, wind, breath, Holy Spirit, human spiritual faculty.',
    exhaustiveDefinition:
      'Translates the Hebrew ruach. The invisible yet mighty divine power that regenerates, indwells, convicts, illuminates, and seals believers for the day of redemption.',
    theologicalSignificance:
      'In John 3:8, Jesus compares the work of the Spirit in the new birth to the wind blowing where it wishes. In Romans 8, the Spirit is the guarantee of bodily resurrection.',
    category: 'Holy Spirit',
    keyScripture: {
      reference: 'John 4:24',
      book: 'John',
      chapter: 4,
      verse: 24,
      snippet: 'God is a Spirit: and they that worship him must worship him in spirit and in truth.',
    },
    relatedStrongs: ['G4154', 'G4152'],
  },
  {
    strongsNumber: 'G4102',
    language: 'greek',
    originalScript: 'πίστις',
    transliteration: 'pistis',
    pronunciation: 'pis\'-tis',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From peithō (G3982), to persuade, listen, or trust.',
    shortDefinition: 'Faith, belief, firm conviction, trust, fidelity, allegiance.',
    exhaustiveDefinition:
      'Pistis is personal surrender and radical allegiance to Jesus Christ based on the truth of God\'s promise. It is the conduit through which grace operates in the human heart.',
    theologicalSignificance:
      'Defined classically in Hebrews 11:1 ("Now faith is the substance of things hoped for, the evidence of things not seen") and illustrated through the Hall of Faith.',
    category: 'Grace & Salvation',
    keyScripture: {
      reference: 'Hebrews 11:1',
      book: 'Hebrews',
      chapter: 11,
      verse: 1,
      snippet: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    },
    relatedStrongs: ['G3982', 'G4100'],
  },
  {
    strongsNumber: 'G3341',
    language: 'greek',
    originalScript: 'μετάνοια',
    transliteration: 'metanoia',
    pronunciation: 'met-an\'-oy-ah',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From meta (after, change) and noeō (to perceive, think).',
    shortDefinition: 'Repentance, transformative change of mind, radical reversal.',
    exhaustiveDefinition:
      'Far beyond mere emotional sorrow, metanoia is a total revolution of perception, values, and allegiance — turning from self-rule and idols toward the living God.',
    theologicalSignificance:
      'The very first proclamation of Christ\'s public ministry in Mark 1:15 ("The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel").',
    category: 'Grace & Salvation',
    keyScripture: {
      reference: 'Mark 1:15',
      book: 'Mark',
      chapter: 1,
      verse: 15,
      snippet: 'The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel.',
    },
    relatedStrongs: ['G3340'],
  },
  {
    strongsNumber: 'G2842',
    language: 'greek',
    originalScript: 'κοινωνία',
    transliteration: 'koinōnia',
    pronunciation: 'koy-nohn-ee\'-ah',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From koinos (G2839), shared in common, mutual, unified.',
    shortDefinition: 'Fellowship, communion, joint participation, intimate sharing.',
    exhaustiveDefinition:
      'Describes the profound spiritual unity of believers who jointly share in the life of Christ, the Holy Spirit, the Lord\'s Supper, and mutual support for the saints.',
    theologicalSignificance:
      'Characterizes the pristine apostolic church in Acts 2:42 ("they continued stedfastly in the apostles\' doctrine and fellowship"), uniting diverse cultures in one body.',
    category: 'Love & Fellowship',
    keyScripture: {
      reference: 'Acts 2:42',
      book: 'Acts',
      chapter: 2,
      verse: 42,
      snippet: 'And they continued stedfastly in the apostles\' doctrine and fellowship, and in breaking of bread, and in prayers.',
    },
    relatedStrongs: ['G2839', 'G2844'],
  },
  {
    strongsNumber: 'G1343',
    language: 'greek',
    originalScript: 'δικαιοσύνη',
    transliteration: 'dikaiosunē',
    pronunciation: 'dik-ah-yos-oo\'-nay',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From dikaios (G1342), just, righteous, conforming to divine standard.',
    shortDefinition: 'Righteousness, justification, divine approval, right standing.',
    exhaustiveDefinition:
      'In biblical theology, dikaiosunē is both positional (justification credited by faith through Christ) and ethical (righteous conduct produced by the indwelling Spirit).',
    theologicalSignificance:
      'The unifying heartbeat of Romans: the revelation of the righteousness of God from faith to faith (Rom 1:17; Rom 3:21-22).',
    category: 'Righteousness',
    keyScripture: {
      reference: 'Romans 3:22',
      book: 'Romans',
      chapter: 3,
      verse: 22,
      snippet: 'Even the righteousness of God which is by faith of Jesus Christ unto all and upon all them that believe.',
    },
    relatedStrongs: ['G1342', 'G1344'],
  },
  {
    strongsNumber: 'G1515',
    language: 'greek',
    originalScript: 'εἰρήνη',
    transliteration: 'eirēnē',
    pronunciation: 'i-ray\'-nay',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From eirō (to join, bind together that which was broken).',
    shortDefinition: 'Peace, tranquility, harmony, reconciliation, security.',
    exhaustiveDefinition:
      'Translates the Hebrew shalom into the Greek New Testament. It is the serene, unshakeable confidence that comes from being reconciled to God through the blood of the cross.',
    theologicalSignificance:
      'Jesus bequeathed this gift to His disciples before Gethsemane (John 14:27: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you").',
    category: 'Grace & Salvation',
    keyScripture: {
      reference: 'John 14:27',
      book: 'John',
      chapter: 14,
      verse: 27,
      snippet: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled.',
    },
    relatedStrongs: ['G1514', 'G1517'],
  },
  {
    strongsNumber: 'G2222',
    language: 'greek',
    originalScript: 'ζωή',
    transliteration: 'zōē',
    pronunciation: 'dzo-ay\'',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From zaō (G2198), to live, breathe, flourish.',
    shortDefinition: 'Life, uncreated eternal life, vital divine principle.',
    exhaustiveDefinition:
      'Distinct from bios (biological existence) and psuchē (soulish psychological life), zōē is the very life of God Himself, imparted to believers through faith in Jesus Christ.',
    theologicalSignificance:
      'The grand theme of the Fourth Gospel (John 10:10: "I am come that they might have life (zōē), and that they might have it more abundantly").',
    category: 'Christology',
    keyScripture: {
      reference: 'John 10:10',
      book: 'John',
      chapter: 10,
      verse: 10,
      snippet: 'I am come that they might have life, and that they might have it more abundantly.',
    },
    relatedStrongs: ['G2198'],
  },
  {
    strongsNumber: 'G4991',
    language: 'greek',
    originalScript: 'σωτηρία',
    transliteration: 'sōtēria',
    pronunciation: 'so-tay-ree\'-ah',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From sōtēr (G4990), savior, deliverer, preserver.',
    shortDefinition: 'Salvation, deliverance, preservation, spiritual healing.',
    exhaustiveDefinition:
      'Encompasses the threefold scope of redemption: deliverance from the penalty of sin (justification), power of sin (sanctification), and presence of sin (glorification).',
    theologicalSignificance:
      'Celebrated as the glorious divine rescue: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved" (Acts 4:12).',
    category: 'Grace & Salvation',
    keyScripture: {
      reference: 'Acts 4:12',
      book: 'Acts',
      chapter: 4,
      verse: 12,
      snippet: 'Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.',
    },
    relatedStrongs: ['G4982', 'G4990'],
  },
  {
    strongsNumber: 'G3875',
    language: 'greek',
    originalScript: 'παράκλητος',
    transliteration: 'paraklētos',
    pronunciation: 'par-ak\'-lay-tos',
    partOfSpeech: 'Noun Masculine',
    rootOrigin: 'From para (beside) and kaleō (to summon, call).',
    shortDefinition: 'Comforter, Advocate, Helper, Counselor called alongside.',
    exhaustiveDefinition:
      'In ancient Roman jurisprudence, a paraklētos stood beside a client in court to provide counsel, defense, and encouragement. Jesus names the Holy Spirit the "other Paraclete".',
    theologicalSignificance:
      'Emphasizes the continuous, intimate presence of the Holy Spirit living alongside believers to guide them into all truth and bear witness to Christ (John 14:16; 16:7).',
    category: 'Holy Spirit',
    keyScripture: {
      reference: 'John 14:16',
      book: 'John',
      chapter: 14,
      verse: 16,
      snippet: 'And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever.',
    },
    relatedStrongs: ['G3870'],
  },
  {
    strongsNumber: 'G40',
    language: 'greek',
    originalScript: 'ἅγιος',
    transliteration: 'hagios',
    pronunciation: 'hag\'-ee-os',
    partOfSpeech: 'Adjective',
    rootOrigin: 'From hagos, an object of awe or consecrated separation.',
    shortDefinition: 'Holy, set apart, consecrated, saint, sacred.',
    exhaustiveDefinition:
      'Translates the Hebrew qadosh. It denotes total separation from the profane and contamination of the world, dedicating oneself exclusively to the service and worship of God.',
    theologicalSignificance:
      'The standard apostolic designation for all believers ("the saints" / hoi hagioi), reminding the church of their royal priesthood and holy calling (1 Pet 1:15-16; 2:9).',
    category: 'Righteousness',
    keyScripture: {
      reference: '1 Peter 1:16',
      book: '1 Peter',
      chapter: 1,
      verse: 16,
      snippet: 'Because it is written, Be ye holy; for I am holy.',
    },
    relatedStrongs: ['G37', 'G38'],
  },
  {
    strongsNumber: 'G5055',
    language: 'greek',
    originalScript: 'τελέω',
    transliteration: 'teleō (tetelestai)',
    pronunciation: 'tel-eh\'-o',
    partOfSpeech: 'Verb',
    rootOrigin: 'From telos (G5056), an end, goal, completion, or purpose.',
    shortDefinition: 'To finish, complete, accomplish, pay in full, consummate.',
    exhaustiveDefinition:
      'Ancient tax receipts discovered in Egypt bore the stamp "tetelestai" — meaning "paid in full". Nothing remains owed.',
    theologicalSignificance:
      'Christ\'s triumphant victory cry from the cross (John 19:30: "Tetelestai — It is finished!"). The entire sacrificial debt of human sin was consummated and paid forever.',
    category: 'Christology',
    keyScripture: {
      reference: 'John 19:30',
      book: 'John',
      chapter: 19,
      verse: 30,
      snippet: 'When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost.',
    },
    relatedStrongs: ['G5056', 'G5046'],
  },
  {
    strongsNumber: 'G1391',
    language: 'greek',
    originalScript: 'δόξα',
    transliteration: 'doxa',
    pronunciation: 'dox\'-ah',
    partOfSpeech: 'Noun Feminine',
    rootOrigin: 'From dokeō (G1380), to think, evaluate, or recognize value.',
    shortDefinition: 'Glory, honor, radiant majesty, divine splendor, renown.',
    exhaustiveDefinition:
      'Translates the Hebrew kavod (weight, importance). In the New Testament, doxa is the dazzling radiance and tangible manifestation of God\'s uncreated holy presence.',
    theologicalSignificance:
      'Beheld in the face of Jesus Christ (2 Cor 4:6) and the ultimate destiny of believers who are being conformed from glory to glory (2 Cor 3:18).',
    category: 'Worship & Praise',
    keyScripture: {
      reference: '2 Corinthians 4:6',
      book: '2 Corinthians',
      chapter: 4,
      verse: 6,
      snippet: 'For God, who commanded the light to shine out of darkness, hath shined in our hearts, to give the light of the knowledge of the glory of God in the face of Jesus Christ.',
    },
    relatedStrongs: ['G1380', 'G1392'],
  },
  {
    strongsNumber: 'G2758',
    language: 'greek',
    originalScript: 'κενόω',
    transliteration: 'kenoō (kenosis)',
    pronunciation: 'ken-o\'-o',
    partOfSpeech: 'Verb',
    rootOrigin: 'From kenos (G2756), empty, void, devoid of pride.',
    shortDefinition: 'To empty oneself, divest of prerogative, pour out, humble.',
    exhaustiveDefinition:
      'Describes Christ voluntarily laying aside the independent exercise of divine privileges and glory to take on the form of a servant in the Incarnation.',
    theologicalSignificance:
      'The bedrock of the famous Carmen Christi hymn in Philippians 2:7 ("made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men").',
    category: 'Christology',
    keyScripture: {
      reference: 'Philippians 2:7',
      book: 'Philippians',
      chapter: 2,
      verse: 7,
      snippet: 'But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men.',
    },
    relatedStrongs: ['G2756'],
  },
  {
    strongsNumber: 'G2962',
    language: 'greek',
    originalScript: 'κύριος',
    transliteration: 'kurios',
    pronunciation: 'koo\'-ree-os',
    partOfSpeech: 'Noun Masculine',
    rootOrigin: 'From kuros (supremacy, authoritative power).',
    shortDefinition: 'Lord, Master, Supreme Sovereign, Owner, Title for God and Christ.',
    exhaustiveDefinition:
      'Used by the Septuagint translators to render the sacred Tetragrammaton YHWH into Greek, boldly ascribed to the resurrected Jesus Christ by the early Church.',
    theologicalSignificance:
      'The foundational baptismal confession of the New Testament (Rom 10:9: "if thou shalt confess with thy mouth the Lord Jesus... thou shalt be saved"; Phil 2:11).',
    category: 'Christology',
    keyScripture: {
      reference: 'Philippians 2:11',
      book: 'Philippians',
      chapter: 2,
      verse: 11,
      snippet: 'And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.',
    },
    relatedStrongs: ['G2961', 'G2963'],
  },
];

// ============================================================================
// 3. HEBREW ALEPH-BET ALPHABET GUIDE (22 SACRED LETTERS)
// ============================================================================
export const HEBREW_ALPHABET_GUIDE: HebrewLetterGuide[] = [
  { letter: 'א', name: 'Aleph', transliteration: 'ʾ', paleoMeaning: 'Ox head, strength, divine leader', sound: 'Silent / guttural stop', numericValue: 1 },
  { letter: 'ב', name: 'Bet', transliteration: 'b, v', paleoMeaning: 'House, tent, dwelling of God', sound: 'B as in boy / V as in vine', numericValue: 2 },
  { letter: 'ג', name: 'Gimel', transliteration: 'g', paleoMeaning: 'Camel, journey, divine generosity', sound: 'G as in give', numericValue: 3 },
  { letter: 'ד', name: 'Dalet', transliteration: 'd', paleoMeaning: 'Door, entrance to covenant', sound: 'D as in door', numericValue: 4 },
  { letter: 'ה', name: 'He', transliteration: 'h', paleoMeaning: 'Window, behold, breath, revelation', sound: 'H as in hope', numericValue: 5 },
  { letter: 'ו', name: 'Vav', transliteration: 'v, w', paleoMeaning: 'Nail, peg, connecting heaven and earth', sound: 'V as in voice', numericValue: 6 },
  { letter: 'ז', name: 'Zayin', transliteration: 'z', paleoMeaning: 'Sword, crown, weapon of Spirit', sound: 'Z as in zeal', numericValue: 7 },
  { letter: 'ח', name: 'Chet', transliteration: 'ch, ḥ', paleoMeaning: 'Fence, inner chamber, sanctuary of life', sound: 'Ch as in Scottish loch', numericValue: 8 },
  { letter: 'ט', name: 'Tet', transliteration: 't', paleoMeaning: 'Basket, container, clay vessel', sound: 'T as in table', numericValue: 9 },
  { letter: 'י', name: 'Yod', transliteration: 'y', paleoMeaning: 'Hand, forearm, creative divine work', sound: 'Y as in yes', numericValue: 10 },
  { letter: 'כ', name: 'Khaf', transliteration: 'k, kh', paleoMeaning: 'Open palm, blessing, hollow of hand', sound: 'K as in king / Kh as in Bach', numericValue: 20 },
  { letter: 'ל', name: 'Lamed', transliteration: 'l', paleoMeaning: 'Shepherd\'s staff, authority, teaching', sound: 'L as in light', numericValue: 30 },
  { letter: 'מ', name: 'Mem', transliteration: 'm', paleoMeaning: 'Water, waves, chaos made order', sound: 'M as in mercy', numericValue: 40 },
  { letter: 'נ', name: 'Nun', transliteration: 'n', paleoMeaning: 'Seed, fish, propagating life', sound: 'N as in new', numericValue: 50 },
  { letter: 'ס', name: 'Samekh', transliteration: 's', paleoMeaning: 'Prop, support, pillar of truth', sound: 'S as in save', numericValue: 60 },
  { letter: 'ע', name: 'Ayin', transliteration: 'ʿ', paleoMeaning: 'Eye, perceive, spiritual insight', sound: 'Guttural deep throat consonant', numericValue: 70 },
  { letter: 'פ', name: 'Pe', transliteration: 'p, f', paleoMeaning: 'Mouth, speech, divine utterance', sound: 'P as in peace / F as in faith', numericValue: 80 },
  { letter: 'צ', name: 'Tsadi', transliteration: 'ts, ṣ', paleoMeaning: 'Fish hook, righteous harvest', sound: 'Ts as in nuts', numericValue: 90 },
  { letter: 'ק', name: 'Qof', transliteration: 'q', paleoMeaning: 'Back of head, holiness, separation', sound: 'Deep K sound', numericValue: 100 },
  { letter: 'ר', name: 'Resh', transliteration: 'r', paleoMeaning: 'Head of person, chief, principal', sound: 'R as in run', numericValue: 200 },
  { letter: 'ש', name: 'Shin / Sin', transliteration: 'sh, s', paleoMeaning: 'Teeth, consume, all-consuming fire', sound: 'Sh as in shalom', numericValue: 300 },
  { letter: 'ת', name: 'Tav', transliteration: 't', paleoMeaning: 'Cross, mark, sign of covenant seal', sound: 'T as in truth', numericValue: 400 },
];

// ============================================================================
// 4. KOINE GREEK ALPHABET GUIDE (24 LETTERS)
// ============================================================================
export const GREEK_ALPHABET_GUIDE: GreekLetterGuide[] = [
  { letter: 'Α α', name: 'Alpha', transliteration: 'a', sound: 'Short or long a as in father', theologicalSignificance: 'The Beginning; Christ is the Alpha and the Omega (Rev 1:8, 22:13).' },
  { letter: 'Β β', name: 'Beta', transliteration: 'b', sound: 'B as in book', theologicalSignificance: 'Root of Biblos (Book) and Basileia (Kingdom of God).' },
  { letter: 'Γ γ', name: 'Gamma', transliteration: 'g', sound: 'G as in grace', theologicalSignificance: 'Found in Gnosis (Knowledge) and Graphe (Scripture).' },
  { letter: 'Δ δ', name: 'Delta', transliteration: 'd', sound: 'D as in door', theologicalSignificance: 'Found in Dikaiosune (Righteousness) and Diatheke (Covenant).' },
  { letter: 'Ε ε', name: 'Epsilon', transliteration: 'e', sound: 'Short e as in met', theologicalSignificance: 'Found in Eirene (Peace) and Evangelion (Good News).' },
  { letter: 'Ζ ζ', name: 'Zeta', transliteration: 'z', sound: 'Z as in zeal / dz', theologicalSignificance: 'Found in Zoe (Eternal Life).' },
  { letter: 'Η η', name: 'Eta', transliteration: 'ē', sound: 'Long a as in obey', theologicalSignificance: 'Found in Hegeomai (To lead forth) and Heorte (Feast).' },
  { letter: 'Θ θ', name: 'Theta', transliteration: 'th', sound: 'Th as in theology', theologicalSignificance: 'The initial of Theos (God) and Thronos (Throne).' },
  { letter: 'Ι ι', name: 'Iota', transliteration: 'i', sound: 'I as in police', theologicalSignificance: 'The initial of Iesous (Jesus); smallest letter in Matthew 5:18.' },
  { letter: 'Κ κ', name: 'Kappa', transliteration: 'k', sound: 'K as in king', theologicalSignificance: 'Found in Kurios (Lord) and Koinonia (Fellowship).' },
  { letter: 'Λ λ', name: 'Lambda', transliteration: 'l', sound: 'L as in light', theologicalSignificance: 'Found in Logos (The Word) and Lytron (Ransom).' },
  { letter: 'Μ μ', name: 'Mu', transliteration: 'm', sound: 'M as in mercy', theologicalSignificance: 'Found in Metanoia (Repentance) and Mesites (Mediator).' },
  { letter: 'Ν ν', name: 'Nu', transliteration: 'n', sound: 'N as in new', theologicalSignificance: 'Found in Nomos (Law) and Naos (Holy Temple).' },
  { letter: 'Ξ ξ', name: 'Xi', transliteration: 'x', sound: 'X as in axle', theologicalSignificance: 'Found in Xylon (Cross / Tree of Life).' },
  { letter: 'Ο ο', name: 'Omicron', transliteration: 'o', sound: 'Short o as in lot', theologicalSignificance: 'Small o; found in Oikos (House / Household of faith).' },
  { letter: 'Π π', name: 'Pi', transliteration: 'p', sound: 'P as in peace', theologicalSignificance: 'Found in Pneuma (Spirit) and Pistis (Faith).' },
  { letter: 'Ρ ρ', name: 'Rho', transliteration: 'r', sound: 'R as in rejoice', theologicalSignificance: 'Found in Rhema (Spoken Word) and Rhuomai (Deliverer).' },
  { letter: 'Σ σ, ς', name: 'Sigma', transliteration: 's', sound: 'S as in savior', theologicalSignificance: 'Found in Soteria (Salvation) and Stauros (Cross).' },
  { letter: 'Τ τ', name: 'Tau', transliteration: 't', sound: 'T as in truth', theologicalSignificance: 'Found in Telos (End / Consummation) and Tetelestai.' },
  { letter: 'Υ υ', name: 'Upsilon', transliteration: 'u, y', sound: 'French u / German ü', theologicalSignificance: 'Found in Huios (Son) and Hypomone (Endurance).' },
  { letter: 'Φ φ', name: 'Phi', transliteration: 'ph', sound: 'Ph as in philosophy', theologicalSignificance: 'Found in Phos (Light) and Philia (Affection).' },
  { letter: 'Χ χ', name: 'Chi', transliteration: 'ch', sound: 'Ch as in Christos', theologicalSignificance: 'The ancient monogram of Christos (Messiah / Anointed One).' },
  { letter: 'Ψ ψ', name: 'Psi', transliteration: 'ps', sound: 'Ps as in psalm', theologicalSignificance: 'Found in Psalmos (Psalm) and Psyche (Soul).' },
  { letter: 'Ω ω', name: 'Omega', transliteration: 'ō', sound: 'Long o as in tone', theologicalSignificance: 'The Ending; Christ is the Alpha and the Omega (Rev 1:8, 22:13).' },
];

// ============================================================================
// 5. HELPER: EXTRACT STRONGS FROM DAILY MESSAGES
// ============================================================================
export function getExtractedDailyStrongs(): LexiconEntry[] {
  const seenNumbers = new Set<string>();
  const extracted: LexiconEntry[] = [];

  // Register curated entries first
  for (const item of [...HEBREW_LEXICON_ENTRIES, ...GREEK_LEXICON_ENTRIES]) {
    seenNumbers.add(item.strongsNumber.toUpperCase());
  }

  for (const msg of DAILY_MESSAGES) {
    if (!msg.strongs_number) continue;
    const num = msg.strongs_number.trim().toUpperCase();
    if (seenNumbers.has(num)) continue;

    seenNumbers.add(num);
    const isHebrew = num.startsWith('H');
    const isGreek = num.startsWith('G');
    if (!isHebrew && !isGreek) continue;

    const parts = (msg.scripture_ref || '').split(' ');
    const lastPart = parts[parts.length - 1] || '';
    const book = parts.slice(0, -1).join(' ') || 'Scripture';
    const [chStr, vStr] = lastPart.split(':');
    const chapter = parseInt(chStr, 10) || 1;
    const verse = parseInt(vStr, 10) || 1;

    extracted.push({
      strongsNumber: num,
      language: isHebrew ? 'hebrew' : 'greek',
      originalScript: msg.strongs_word || '',
      transliteration: msg.strongs_transliteration || msg.strongs_word || '',
      pronunciation: msg.strongs_transliteration || '',
      partOfSpeech: isHebrew ? 'Hebrew Term' : 'Koine Greek Term',
      rootOrigin: `Extracted from ${msg.scripture_ref}`,
      shortDefinition: msg.strongs_definition || 'Biblical root definition',
      exhaustiveDefinition: `${msg.fact_title}: ${msg.historical_context || ''}`,
      theologicalSignificance: msg.cultural_practice || msg.historical_context || '',
      category: 'General',
      keyScripture: {
        reference: msg.scripture_ref || 'Sacred Scripture',
        book: book || 'Scripture',
        chapter,
        verse,
        snippet: msg.verse_text || '',
      },
      relatedStrongs: [],
    });
  }

  return extracted;
}

// Global cached merged concordance
let _cachedAllConcordance: LexiconEntry[] | null = null;

export function getAllConcordanceEntries(): LexiconEntry[] {
  if (_cachedAllConcordance) return _cachedAllConcordance;

  const curated = [...HEBREW_LEXICON_ENTRIES, ...GREEK_LEXICON_ENTRIES];
  const dynamic = getExtractedDailyStrongs();

  _cachedAllConcordance = [...curated, ...dynamic].sort((a, b) => {
    // Sort H first then G, then numeric index
    if (a.strongsNumber.charAt(0) !== b.strongsNumber.charAt(0)) {
      return a.strongsNumber.localeCompare(b.strongsNumber);
    }
    const numA = parseInt(a.strongsNumber.replace(/\D/g, ''), 10) || 0;
    const numB = parseInt(b.strongsNumber.replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  });

  return _cachedAllConcordance;
}

export function searchConcordance(
  query: string,
  filterLang?: 'all' | 'hebrew' | 'greek'
): LexiconEntry[] {
  const all = getAllConcordanceEntries();
  const q = query.trim().toLowerCase();

  return all.filter((entry) => {
    if (filterLang === 'hebrew' && entry.language !== 'hebrew') return false;
    if (filterLang === 'greek' && entry.language !== 'greek') return false;

    if (!q) return true;

    return (
      entry.strongsNumber.toLowerCase().includes(q) ||
      entry.originalScript.toLowerCase().includes(q) ||
      entry.transliteration.toLowerCase().includes(q) ||
      entry.shortDefinition.toLowerCase().includes(q) ||
      entry.exhaustiveDefinition.toLowerCase().includes(q) ||
      entry.keyScripture.reference.toLowerCase().includes(q)
    );
  });
}

export function getHebrewLexicon(category?: string, query?: string): LexiconEntry[] {
  const q = query ? query.trim().toLowerCase() : '';
  const entries = [
    ...HEBREW_LEXICON_ENTRIES,
    ...getExtractedDailyStrongs().filter((e) => e.language === 'hebrew'),
  ];

  return entries.filter((entry) => {
    if (category && category !== 'All' && entry.category !== category) return false;
    if (!q) return true;

    return (
      entry.strongsNumber.toLowerCase().includes(q) ||
      entry.originalScript.toLowerCase().includes(q) ||
      entry.transliteration.toLowerCase().includes(q) ||
      entry.shortDefinition.toLowerCase().includes(q) ||
      entry.theologicalSignificance.toLowerCase().includes(q) ||
      entry.keyScripture.reference.toLowerCase().includes(q)
    );
  });
}

export function getGreekLexicon(category?: string, query?: string): LexiconEntry[] {
  const q = query ? query.trim().toLowerCase() : '';
  const entries = [
    ...GREEK_LEXICON_ENTRIES,
    ...getExtractedDailyStrongs().filter((e) => e.language === 'greek'),
  ];

  return entries.filter((entry) => {
    if (category && category !== 'All' && entry.category !== category) return false;
    if (!q) return true;

    return (
      entry.strongsNumber.toLowerCase().includes(q) ||
      entry.originalScript.toLowerCase().includes(q) ||
      entry.transliteration.toLowerCase().includes(q) ||
      entry.shortDefinition.toLowerCase().includes(q) ||
      entry.theologicalSignificance.toLowerCase().includes(q) ||
      entry.keyScripture.reference.toLowerCase().includes(q)
    );
  });
}
