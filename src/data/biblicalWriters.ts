/**
 * Biblical Writers & Authors History Dataset
 *
 * Comprehensive historical, biographical, and manuscript scholarship detailing
 * the sacred authors of the 66-book biblical canon.
 */

export interface BiblicalWriter {
  id: string;
  name: string;
  originalName: string;
  transliteration: string;
  era: string;
  role: string;
  testament: 'Old Testament' | 'New Testament';
  category: 'Torah & History' | 'Wisdom' | 'Major Prophets' | 'Minor Prophets' | 'Gospels' | 'Pauline Epistles' | 'General Epistles';
  booksWritten: string[];
  totalChapters: number;
  keyVerse: {
    reference: string;
    text: string;
  };
  biography: string;
  historicalSetting: string;
  theologicalThemes: string[];
  manuscriptEvidence: string;
  archaeologicalFinds: string;
}

export const BIBLICAL_WRITERS: BiblicalWriter[] = [
  // ── OLD TESTAMENT: TORAH & HISTORY ──────────────────────────────────────────
  {
    id: 'moses',
    name: 'Moses',
    originalName: 'מֹשֶׁה',
    transliteration: 'Mōsheh ("Drawn from the water")',
    era: 'c. 1526 – 1406 BC (Late Bronze Age)',
    role: 'Lawgiver, Deliverer, Prophet & Leader of Israel',
    testament: 'Old Testament',
    category: 'Torah & History',
    booksWritten: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Psalm 90'],
    totalChapters: 188,
    keyVerse: {
      reference: 'Deuteronomy 34:10',
      text: 'Since then, no prophet has risen in Israel like Moses, whom the LORD knew face to face.',
    },
    biography:
      'Born under Pharaoh’s decree of infant genocide in Egypt, Moses was hidden by his mother Jochebed in a papyrus basket along the Nile and rescued by Pharaoh’s daughter. Raised in the royal courts of the 18th Dynasty, he received world-class education in Egyptian administration, statecraft, and literature. After slaying an Egyptian taskmaster brutalizing a Hebrew slave, Moses fled to Midian, serving forty years as a humble shepherd until God spoke from the unburned bush at Mount Horeb. Armed with the divine name YHWH ("I AM WHO I AM"), Moses returned to confront Pharaoh with ten catastrophic plagues, led Israel through the parted Red Sea, received the Ten Commandments and the Sinaitic Covenant, and shepherded Israel through forty years of wilderness wandering.',
    historicalSetting:
      'The New Kingdom of Egypt, likely during the reigns of Thutmose III and Amenhotep II. Moses documented the patriarchal oral traditions and contemporary laws using early Proto-Sinaitic / Paleo-Hebrew alphabetic scripts.',
    theologicalThemes: [
      'The Sovereign Holiness of YHWH',
      'The Covenant Bond (Berith)',
      'Deliverance and Passover Redemption',
      'The Sacrificial System & Priesthood',
      'The Promise of the Coming Prophet (Deut 18:15)',
    ],
    manuscriptEvidence:
      'Over 220 fragments of the Torah exist among the Dead Sea Scrolls at Qumran (e.g. 4QExod, 1QpaleoLev), confirming consistent textual transmission across three millennia.',
    archaeologicalFinds:
      'Ketef Hinnom silver amulets (7th century BC) containing the Priestly Blessing of Numbers 6:24-26; Proto-Sinaitic inscriptions at Serabit el-Khadim.',
  },
  {
    id: 'joshua',
    name: 'Joshua',
    originalName: 'יְהוֹשֻׁעַ',
    transliteration: 'Yehōshúa ("YHWH is Salvation")',
    era: 'c. 1485 – 1375 BC (Conquest Period)',
    role: 'Commander-in-Chief, Successor of Moses & Judge',
    testament: 'Old Testament',
    category: 'Torah & History',
    booksWritten: ['Joshua'],
    totalChapters: 24,
    keyVerse: {
      reference: 'Joshua 24:15',
      text: 'As for me and my household, we will serve the LORD.',
    },
    biography:
      'Born a slave in Egypt from the tribe of Ephraim, Joshua distinguished himself as Moses’ personal aide, field general against Amalek at Rephidim, and one of only two faithful spies (with Caleb) who believed God could conquer Canaan. Commissioned by God after Moses’ death on Mount Nebo, Joshua led Israel across a miraculously dammed Jordan River, directed the conquest of Jericho and Ai, and supervised the allotment of the Promised Land among the twelve tribes.',
    historicalSetting:
      'The transition from Late Bronze Age to early Iron Age Canaan. City-states such as Hazor, Lachish, and Jericho operated under shifting Canaanite alliances.',
    theologicalThemes: [
      'The Faithfulness of God in Fulfilling Promises',
      'Holy War & Divine Sovereignty',
      'Covenant Renewal at Shechem',
      'Rest in the Land as a Foretaste of Salvation',
    ],
    manuscriptEvidence:
      'Fragments of Joshua found in Qumran Caves 4 (4QJosh-a, 4QJosh-b) show remarkable alignment with the Masoretic tradition and Septuagint variants.',
    archaeologicalFinds:
      'The Merneptah Stele (c. 1208 BC) recording Israel established in Canaan; destruction layers at Hazor stratum XIII.',
  },
  {
    id: 'samuel',
    name: 'Samuel',
    originalName: 'שְׁמוּאֵל',
    transliteration: 'Shemū’ēl ("Heard of God")',
    era: 'c. 1105 – 1015 BC (United Monarchy Dawn)',
    role: 'Last Judge of Israel, Prophet & Kingmaker',
    testament: 'Old Testament',
    category: 'Torah & History',
    booksWritten: ['1 Samuel (chs 1–24)', 'Judges (trad.)', 'Ruth (trad.)'],
    totalChapters: 35,
    keyVerse: {
      reference: '1 Samuel 15:22',
      text: 'To obey is better than sacrifice, and to heed is better than the fat of rams.',
    },
    biography:
      'Dedicated to God before birth by his barren mother Hannah at the Tabernacle in Shiloh, Samuel grew up under High Priest Eli. As a young boy, he received God’s direct voice of impending judgment on Eli’s corrupt lineage. Samuel led Israel through Philistine oppression, established schools of prophets, administered itinerant judicial circuits, and reluctantly anointed Israel’s first king (Saul) before discovering and anointing young David in Bethlehem.',
    historicalSetting:
      'Iron Age I Levant during the collapse of Philistine domination along the coastal plain. Shift from decentralized tribal confederacy to unified monarchy.',
    theologicalThemes: [
      'Obedience Surpassing Ritual Sacrifice',
      'The Perils of Demanding Earthly Monarchy',
      'The Anointing of the Lord’s Chosen (Messianic Type)',
      'God Looks at the Heart, Not Outward Appearance',
    ],
    manuscriptEvidence:
      'The Samuel scrolls from Qumran (4QSam-a, 4QSam-b, 4QSam-c) represent some of the best-preserved and earliest Iron Age Hebrew historical prose.',
    archaeologicalFinds:
      'The Tel Dan Inscription ("House of David" Stele, 9th century BC); excavations at ancient Shiloh showing destruction layers matching the Ark’s capture.',
  },

  // ── OLD TESTAMENT: WISDOM & ROYAL AUTHORS ──────────────────────────────────
  {
    id: 'david',
    name: 'David',
    originalName: 'דָּוִד',
    transliteration: 'Dāwīd ("Beloved")',
    era: 'c. 1040 – 970 BC (Golden Age of Israel)',
    role: 'Shepherd, Sweet Psalmist of Israel & King of Judah and Israel',
    testament: 'Old Testament',
    category: 'Wisdom',
    booksWritten: ['Psalms (73 canonical psalms directly ascribed)'],
    totalChapters: 73,
    keyVerse: {
      reference: 'Psalm 23:1',
      text: 'The LORD is my shepherd; I lack nothing.',
    },
    biography:
      'The youngest son of Jesse of Bethlehem, David spent his youth tending sheep where he honed deadly accuracy with the sling and developed deep intimacy with YHWH through harp composition. After slaying the Philistine champion Goliath, David endured years of fugitive persecution by King Saul in the Judean wilderness. Anointed king over Judah at Hebron and later all Israel, David conquered the Jebusite fortress of Zion, made Jerusalem his capital, brought the Ark of the Covenant with rejoicing, and established the Davidic Covenant.',
    historicalSetting:
      'Iron Age IIA. With Egypt and Assyria temporarily weakened, the Davidic kingdom expanded from the River of Egypt to the Euphrates River.',
    theologicalThemes: [
      'The Eternal Davidic Covenant (2 Sam 7, Ps 89)',
      'Deep Personal Repentance & Divine Mercy (Ps 51)',
      'The Suffering and Glorified Messiah (Ps 22, Ps 110)',
      'Praise as Spiritual Warfare and Cosmic Truth',
    ],
    manuscriptEvidence:
      'Over 39 Psalms scrolls unearthed in the Dead Sea Caves at Qumran (including the Great Psalms Scroll 11Q5), proving Psalms was the most copied book in ancient Judaism.',
    archaeologicalFinds:
      'The Stepped Stone Structure and Large Stone Structure in the City of David (Jerusalem); the Khirbet Qeiyafa fortified border city.',
  },
  {
    id: 'solomon',
    name: 'Solomon',
    originalName: 'שְׁלֹמֹה',
    transliteration: 'Shelōmōh ("Peaceful / Jedidiah")',
    era: 'c. 990 – 931 BC (Imperial Monarchy)',
    role: 'Third King of Israel, Sage, Temple Builder & Philosopher',
    testament: 'Old Testament',
    category: 'Wisdom',
    booksWritten: ['Proverbs', 'Ecclesiastes', 'Song of Songs', 'Psalm 72', 'Psalm 127'],
    totalChapters: 56,
    keyVerse: {
      reference: 'Proverbs 9:10',
      text: 'The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.',
    },
    biography:
      'Son of David and Bathsheba, Solomon inherited a vast, pacified empire. When offered any gift by God at Gibeon, young Solomon asked not for riches or long life, but for an understanding heart to govern God’s people. God granted him unprecedented wisdom, vast wealth, and peaceful international trade. He constructed the First Temple on Mount Moriah, composed 3,000 proverbs and 1,005 songs, and hosted global monarchs including the Queen of Sheba. In his twilight years, he authored Ecclesiastes, pondering the vanity of earthly pursuits apart from the fear of God.',
    historicalSetting:
      'The peak of Israelite wealth, maritime commerce with Hiram of Tyre, copper mining at Ezion-Geber, and diplomatic marriages across the ancient Near East.',
    theologicalThemes: [
      'The Fear of the Lord as the Foundation of True Knowledge',
      'The Practical Ethics of Daily Life (Proverbs)',
      'The Emptiness of Secular Materialism (Ecclesiastes)',
      'The Sacred Holiness of Marital Love (Song of Songs)',
    ],
    manuscriptEvidence:
      'Manuscript fragments of Proverbs, Ecclesiastes, and Song of Songs (4QEccl, 4QCant) from Qumran affirm their early canonical reception.',
    archaeologicalFinds:
      'Solomonic six-chambered city gates discovered at Megiddo, Hazor, and Gezer matching 1 Kings 9:15; royal stables and copper smelting works at Timna.',
  },

  // ── OLD TESTAMENT: PROPHETS ────────────────────────────────────────────────
  {
    id: 'isaiah',
    name: 'Isaiah',
    originalName: 'יְשַׁעְיָהוּ',
    transliteration: 'Yesha’yāhū ("Salvation of YHWH")',
    era: 'c. 760 – 681 BC (Neo-Assyrian Crisis)',
    role: 'Court Prophet, Poet Laureate & Theologian of Redemption',
    testament: 'Old Testament',
    category: 'Major Prophets',
    booksWritten: ['Isaiah'],
    totalChapters: 66,
    keyVerse: {
      reference: 'Isaiah 53:5',
      text: 'He was pierced for our transgressions, He was crushed for our iniquities; the punishment that brought us peace was on Him, and by His wounds we are healed.',
    },
    biography:
      'Son of Amoz and minister in the royal court of Jerusalem, Isaiah served during the reigns of kings Uzziah, Jotham, Ahaz, and Hezekiah. In the year King Uzziah died, Isaiah beheld the terrifying holiness of YHWH high and lifted up, his lips cleansed by an altar coal. Isaiah counseled King Hezekiah during Sennacherib’s siege of Jerusalem when 185,000 Assyrian soldiers perished overnight. Isaiah is celebrated as the "Fifth Evangelist" for his breathtakingly specific Messianic prophecies: the Virgin Birth (7:14), the Wonderful Counselor (9:6), the Suffering Servant (52:13–53:12), and the New Heavens and New Earth (65:17).',
    historicalSetting:
      'The brutal expansion of the Neo-Assyrian Empire under Tiglath-Pileser III, Shalmaneser V (who destroyed Samaria in 722 BC), and Sennacherib.',
    theologicalThemes: [
      'The Holy One of Israel (Qadosh Yisrael)',
      'The Suffering Servant Substitutionary Atonement',
      'The Remnant Preserved by Grace',
      'Global Gentile Ingathering into God’s Covenant',
      'Cosmic New Creation',
    ],
    manuscriptEvidence:
      'The Great Isaiah Scroll (1QIsa-a), complete in 54 columns of leather dating to c. 125 BC, found in Cave 1 at Qumran, matches the modern Hebrew Bible word for word with over 99% accuracy.',
    archaeologicalFinds:
      'The Sennacherib Prism (Taylor Prism) recording the siege of Jerusalem and Hezekiah "shut up like a bird in a cage"; the royal bulla (seal impression) reading "Belonging to Isaiah the prophet" found near the Temple Mount in Jerusalem.',
  },
  {
    id: 'jeremiah',
    name: 'Jeremiah',
    originalName: 'יִרְמְיָהוּ',
    transliteration: 'Yirməyāhū ("YHWH Exalts / Appoints")',
    era: 'c. 650 – 570 BC (Babylonian Destruction & Exile)',
    role: 'Priest of Anathoth & The Weeping Prophet',
    testament: 'Old Testament',
    category: 'Major Prophets',
    booksWritten: ['Jeremiah', 'Lamentations'],
    totalChapters: 57,
    keyVerse: {
      reference: 'Jeremiah 31:33',
      text: 'I will put my law in their minds and write it on their hearts. I will be their God, and they will be my people.',
    },
    biography:
      'Called by God before he was formed in the womb, young Jeremiah was commissioned as a prophet to the nations. For forty agonizing years, he warned Jerusalem of coming destruction by Babylon. Rejected, beaten, thrown into a muddy cistern, and branded a traitor, Jeremiah wept over the stubborn idolatry of his people. He witnessed the horrific siege and burning of Solomon’s Temple by Nebuchadnezzar in 586 BC, composed the poetic funeral dirge of Lamentations, and prophesied the 70-year exile followed by the glorious New Covenant written on human hearts.',
    historicalSetting:
      'The collapse of the Assyrian Empire, the rise of the Neo-Babylonian Empire under Nebuchadnezzar II, and the devastating destructions of Jerusalem in 597 and 586 BC.',
    theologicalThemes: [
      'The New Covenant Written on the Heart (Jer 31:31-34)',
      'The Absolute Deceitfulness of the Human Heart (Jer 17:9)',
      'Divine Sovereignty over Nations and Empires',
      'The Faithful Remnant and Promised Restoration',
    ],
    manuscriptEvidence:
      'Fragments of Jeremiah found at Qumran (4QJer-a, 4QJer-b) preserve both the longer Hebrew Masoretic tradition and the shorter Septuagint editorial recension.',
    archaeologicalFinds:
      'The Lachish Letters (ostraca from 588 BC) chronicling the final days before the Babylonian breach; clay bullae of Jeremiah’s scribe Baruch son of Neriah and court officials Jehucal and Gedaliah.',
  },
  {
    id: 'daniel',
    name: 'Daniel',
    originalName: 'דָּנִיֵּאל',
    transliteration: 'Dāniyyē’l ("God is my Judge")',
    era: 'c. 620 – 535 BC (Babylonian & Persian Empires)',
    role: 'Statesman, Prime Minister, Exilic Sage & Apocalyptic Prophet',
    testament: 'Old Testament',
    category: 'Major Prophets',
    booksWritten: ['Daniel'],
    totalChapters: 12,
    keyVerse: {
      reference: 'Daniel 7:13-14',
      text: 'There before me was one like a son of man, coming with the clouds of heaven... He was given authority, glory and sovereign power; all nations and peoples of every language worshiped him.',
    },
    biography:
      'Taken captive as a teenage nobleman during Nebuchadnezzar’s first deportation in 605 BC, Daniel was trained in the language and literature of the Chaldeans in Babylon. Refusing to defile himself with the king’s pagan delicacies, Daniel interpreted Nebuchadnezzar’s terrifying dream of the four world empires and the stone that smashed them. Daniel rose to prime minister over Babylon, survived the lion’s den under Darius the Mede for praying three times daily, and received apocalyptic visions of the Son of Man, the 70 Weeks, and the final resurrection.',
    historicalSetting:
      'The majestic palaces of Babylon, the Ishtar Gate, the hanging gardens, and the fall of Babylon to Cyrus the Great of Persia in 539 BC.',
    theologicalThemes: [
      'God’s Universal Rule over Earthly Superpowers',
      'The Cosmic Kingdom of the Son of Man',
      'Faithful Integrity under Hostile Secular Regimes',
      'The Exact Chronology of the Messiah’s Arrival',
      'The Bodily Resurrection to Everlasting Life (Dan 12:2)',
    ],
    manuscriptEvidence:
      'Eight separate scrolls of Daniel discovered in Qumran Caves 1, 4, and 6 dating as early as the late 2nd century BC, seamlessly transitioning between Hebrew and Aramaic.',
    archaeologicalFinds:
      'The Cyrus Cylinder (539 BC) confirming the biblical record of Cyrus releasing captives; the Nabonidus Cylinder affirming Belshazzar as co-regent of Babylon.',
  },

  // ── NEW TESTAMENT: THE FOUR GOSPELS ─────────────────────────────────────────
  {
    id: 'matthew',
    name: 'Matthew',
    originalName: 'מַתִּתְיָהוּ / Μαθθαῖος',
    transliteration: 'Mattityahu ("Gift of YHWH") / Levi',
    era: 'c. AD 10 – 70 (Apostolic Era)',
    role: 'Tax Collector of Capernaum & Apostle of Jesus Christ',
    testament: 'New Testament',
    category: 'Gospels',
    booksWritten: ['Matthew'],
    totalChapters: 28,
    keyVerse: {
      reference: 'Matthew 28:18-20',
      text: 'All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
    },
    biography:
      'Stationed at a customs toll booth on the major trade route through Capernaum in Galilee, Levi sat collecting excise taxes for Herod Antipas and the Roman Empire. When Jesus passed by and uttered two words, "Follow me," Matthew abandoned his lucrative ledger books immediately, hosted a great banquet for tax collectors and sinners, and became one of the Twelve Apostles. Matthew utilized his meticulous record-keeping and bilingual literacy in Aramaic and Greek to author the premier Jewish-Christian Gospel, quoting the Old Testament over 60 times to prove Jesus is the promised Son of David and King of the Jews.',
    historicalSetting:
      'Roman Judea and Galilee under the Pax Romana and Herodian tetrarchs. Written primarily to Hebrew believers navigating the transition from Temple ritual to the Kingdom of Heaven.',
    theologicalThemes: [
      'Jesus the Messiah Fulfilling Every Hebrew Prophecy',
      'The Kingdom of Heaven (Malkhut Shamayim)',
      'The Sermon on the Mount & Inward Righteousness',
      'The Church (Ekklesia) as the New Covenant Community',
      'The Great Commission to All Nations (Panta ta Ethne)',
    ],
    manuscriptEvidence:
      'Papyrus 104 (c. AD 150–200), Papyrus 64/67 (the Magdalen Papyrus, c. AD 175), and early citations by Papias of Hierapolis and Irenaeus of Lyons.',
    archaeologicalFinds:
      'The 1st-century basalt foundations of the Capernaum synagogue where Jesus and Matthew worshiped; 1st-century Roman toll booth coinage along the Sea of Galilee.',
  },
  {
    id: 'mark',
    name: 'Mark',
    originalName: 'Ἰωάννης Μᾶρκος',
    transliteration: 'John Mark (Yohanan / Marcus)',
    era: 'c. AD 15 – 68 (Apostolic Era)',
    role: 'Companion of Peter, Paul & Barnabas, Evangelist',
    testament: 'New Testament',
    category: 'Gospels',
    booksWritten: ['Mark'],
    totalChapters: 16,
    keyVerse: {
      reference: 'Mark 10:45',
      text: 'For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.',
    },
    biography:
      'Son of Mary, a prominent Jerusalem Christian whose home was the prayer gathering place where Peter fled after escaping Herod’s prison (Acts 12), Mark grew up in the cradle of the early Church. He accompanied Paul and his cousin Barnabas on the First Missionary Journey, withdrew prematurely at Perga, but later matured into an indispensable co-worker restored by Paul and beloved as a "son" by the Apostle Peter. According to 2nd-century church father Papias, Mark served as Peter’s interpreter in Rome, compiling Peter’s eyewitness memoirs into the fastest-paced, action-packed Gospel of the Suffering Servant.',
    historicalSetting:
      'Rome during the brutal persecutions under Emperor Nero (c. AD 64–68) following the Great Fire of Rome, writing to encourage suffering Roman Christians facing martyrdom.',
    theologicalThemes: [
      'Jesus the Mighty Son of God & Suffering Servant',
      'The Messianic Secret',
      'Rapid, Action-Oriented Discipleship ("Immediately" - Euthys)',
      'The Cost of the Cross in the Midst of Persecution',
    ],
    manuscriptEvidence:
      'Papyrus 45 (Chester Beatty Papyri, c. AD 250) and Codex Vaticanus (4th century). Church fathers Justin Martyr and Clement of Alexandria quote Mark as Peter’s memoirs.',
    archaeologicalFinds:
      'The Roman Colosseum and Circus Maximus where early Roman Christians heard Mark’s Gospel; early catacomb inscriptions in Rome.',
  },
  {
    id: 'luke',
    name: 'Luke',
    originalName: 'Λουκᾶς',
    transliteration: 'Loukas ("Light-giving")',
    era: 'c. AD 15 – 84 (Greco-Roman World)',
    role: 'Physician, First-Rate Historian & Companion of Paul',
    testament: 'New Testament',
    category: 'Gospels',
    booksWritten: ['Luke', 'Acts of the Apostles'],
    totalChapters: 52,
    keyVerse: {
      reference: 'Luke 19:10',
      text: 'For the Son of Man came to seek and to save the lost.',
    },
    biography:
      'A cultured Gentile physician, likely from Antioch of Syria, Luke was the only non-Jewish author of Scripture. He joined the Apostle Paul at Troas during the Second Missionary Journey (signaled by the famous "we" passages in Acts 16), traveled across Greece and Asia Minor, and remained steadfastly at Paul’s side during his final Roman imprisonment ("Only Luke is with me," 2 Tim 4:11). Commissioned by the noble Theophilus, Luke conducted exhaustive historical investigations, interviewing eyewitnesses including Mary the mother of Jesus, the apostles, and early disciples to produce a meticulously chronological two-volume masterwork (Luke & Acts) spanning from the birth of John the Baptist to Paul preaching unhindered in imperial Rome.',
    historicalSetting:
      'The Greco-Roman Mediterranean under emperors Claudius, Nero, and Vespasian. Luke navigated Greek philosophy, Roman provincial jurisprudence, and Jewish temple customs with unparalleled scholarly precision.',
    theologicalThemes: [
      'The Gospel for All People: Outcasts, Gentiles, Women, the Poor',
      'The Person and Power of the Holy Spirit',
      'Joy, Prayer, and Thanksgiving in Everyday Discipleship',
      'Historical Precision & Eyewitness Truth',
      'The Unstoppable Global Expansion of the Church',
    ],
    manuscriptEvidence:
      'Papyrus 75 (Bodmer XIV-XV, c. AD 175–225) preserving the earliest near-complete text of Luke and John; Papyrus 45 (c. AD 250).',
    archaeologicalFinds:
      'The Erastus Inscription at Corinth confirming Paul’s friend (Rom 16:23); the Gallio Inscription at Delphi establishing the exact date of Paul’s trial in Corinth (Acts 18:12); the Politarch inscriptions in Thessalonica vindicating Luke’s unique title.',
  },
  {
    id: 'john',
    name: 'John',
    originalName: 'יוֹחָנָן / Ἰωάννης',
    transliteration: 'Yohanan ("YHWH is Gracious")',
    era: 'c. AD 12 – 98 (Judea, Ephesus, Patmos)',
    role: 'Fisherman, Pillar Apostle, The Beloved Disciple & Seer of Patmos',
    testament: 'New Testament',
    category: 'Gospels',
    booksWritten: ['John', '1 John', '2 John', '3 John', 'Revelation'],
    totalChapters: 50,
    keyVerse: {
      reference: 'John 1:1,14',
      text: 'In the beginning was the Word, and the Word was with God, and the Word was God... The Word became flesh and made his dwelling among us.',
    },
    biography:
      'Son of Zebedee and Salome, John was a partner in the fishing trade with his brother James and Simon Peter on the Sea of Galilee. Nicknamed "Sons of Thunder" (Boanerges) for their fiery temperament, John was drawn into Jesus’ closest inner circle (Peter, James, and John), reclining next to Jesus at the Last Supper and standing alone among the Twelve at the foot of the Cross, where Jesus entrusted His mother Mary into John’s care. John outran Peter to the empty tomb on Easter morning. In later decades, John ministered in Ephesus, was exiled under Emperor Domitian to the penal island of Patmos, and received the cosmic apocalypse of Revelation before dying of old age in Ephesus.',
    historicalSetting:
      'From 1st-century Roman Judea to the great Asian metropolis of Ephesus and the volcanic penal colony of Patmos during the fierce persecutions under Domitian (c. AD 95).',
    theologicalThemes: [
      'The Deity of Jesus Christ as the Eternal Logos',
      'The Seven "I AM" Statements of Christ',
      'Eternal Life Received by Believing (Pisteuō)',
      'God is Love (Agape) and God is Light',
      'Cosmic Victory of the Slain and Risen Lamb',
    ],
    manuscriptEvidence:
      'Papyrus 52 (the Rylands Papyrus, c. AD 117–138), the oldest known surviving New Testament manuscript fragment in existence, containing verses from John 18; Papyrus 66 (c. AD 200).',
    archaeologicalFinds:
      'The Pool of Bethesda with its five porticoes excavated in Jerusalem near St. Anne’s Church, precisely verifying John 5:2; the cave of the Apocalypse on the island of Patmos.',
  },

  // ── NEW TESTAMENT: PAULINE EPISTLES ─────────────────────────────────────────
  {
    id: 'paul',
    name: 'Paul',
    originalName: 'שָׁאוּל / Παῦλος',
    transliteration: 'Sha’ul (Saul) / Paulos ("Little / Humble")',
    era: 'c. AD 5 – 67 (Tarsus, Jerusalem, Rome)',
    role: 'Pharisee of Pharisees, Tentmaker & Apostle to the Gentiles',
    testament: 'New Testament',
    category: 'Pauline Epistles',
    booksWritten: [
      'Romans',
      '1 Corinthians',
      '2 Corinthians',
      'Galatians',
      'Ephesians',
      'Philippians',
      'Colossians',
      '1 Thessalonians',
      '2 Thessalonians',
      '1 Timothy',
      '2 Timothy',
      'Titus',
      'Philemon',
    ],
    totalChapters: 87,
    keyVerse: {
      reference: 'Galatians 2:20',
      text: 'I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.',
    },
    biography:
      'Born in Tarsus of Cilicia with prized Roman citizenship, Saul was educated at the feet of the renowned Rabbi Gamaliel in Jerusalem. Rising as a zealous Pharisee, he hunted, imprisoned, and consented to the stoning of the first Christian martyr, Stephen. On the road to Damascus to arrest more believers, Saul was blinded by the radiant glory of the Risen Christ, who asked, "Saul, Saul, why do you persecute me?" Transformed from chief persecutor to the greatest missionary in human history, Paul planted churches across Asia Minor, Macedonia, and Greece through three epic missionary voyages, endured shipwrecks, beatings, and stonings, authored thirteen inspired epistles establishing Christian systematic theology, and was martyred by beheading under Nero outside the walls of Rome.',
    historicalSetting:
      'The Roman Empire at its zenith under emperors Tiberius, Caligula, Claudius, and Nero. Paul utilized Roman roads, naval trade routes, and his Roman citizenship to proclaim the Gospel from Jerusalem to Illyricum and Rome.',
    theologicalThemes: [
      'Justification by Grace Alone through Faith Alone (Sola Fide)',
      'Union with Christ: "In Christ" (En Christō)',
      'The Mystery of the Church as One Body (Jews & Gentiles)',
      'The Triumphant Power of the Cross and Resurrection',
      'Walking by the Spirit vs. the Flesh',
    ],
    manuscriptEvidence:
      'Papyrus 46 (Chester Beatty Papyri II, c. AD 175–225), containing almost all of Paul’s epistles; Codex Sinaiticus and Codex Vaticanus.',
    archaeologicalFinds:
      'The Bema seat (judgment seat) at ancient Corinth where Paul stood before Gallio; the Great Theater of Ephesus where the riot of Demetrius the silversmith erupted (Acts 19); the Mamertine Prison in Rome.',
  },

  // ── NEW TESTAMENT: GENERAL EPISTLES ─────────────────────────────────────────
  {
    id: 'peter',
    name: 'Peter',
    originalName: 'שִׁמְעוֹן / Κηφᾶς / Πέτρος',
    transliteration: 'Shimon / Cephas / Petros ("Rock")',
    era: 'c. AD 1 – 67 (Galilee, Jerusalem, Antioch, Rome)',
    role: 'Fisherman, Leader of the Twelve, Pillar of Jerusalem & Martyr',
    testament: 'New Testament',
    category: 'General Epistles',
    booksWritten: ['1 Peter', '2 Peter'],
    totalChapters: 8,
    keyVerse: {
      reference: '1 Peter 1:3',
      text: 'Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead.',
    },
    biography:
      'A rough-hewn Galilean fisherman from Bethsaida and Capernaum, Simon was introduced to Jesus by his brother Andrew. Jesus renamed him Cephas/Peter ("Rock"). Impulsive and passionate, Peter was the first to confess Jesus as "the Christ, the Son of the living God," walked briefly on the water, and was present at the Transfiguration and Gethsemane. After weeping bitterly over his threefold denial on the night of Jesus’ arrest, Peter was tenderly restored by the Risen Christ on the shore of Galilee with the threefold command: "Feed my sheep." On Pentecost, Peter preached with explosive boldness, seeing 3,000 baptized in a day. He opened the Gospel door to the Gentiles at Cornelius’ house, championed salvation by grace at the Jerusalem Council, and was ultimately crucified upside down in Rome under Nero.',
    historicalSetting:
      'The growing imperial persecution of Christians scattered throughout Pontus, Galatia, Cappadocia, Asia, and Bithynia. Peter ministered from "Babylon" (code for imperial Rome).',
    theologicalThemes: [
      'The Living Hope Anchored in the Resurrection',
      'The Royal Priesthood & Chosen Nation of Believers',
      'Suffering Joyfully for the Sake of Christ',
      'The Certainty of the Day of the Lord & New Heavens',
      'Growing in the Grace and Knowledge of the Lord',
    ],
    manuscriptEvidence:
      'Papyrus 72 (Bodmer VII-VIII, 3rd/4th century) containing the full texts of 1 and 2 Peter alongside Jude.',
    archaeologicalFinds:
      'The House of St. Peter in Capernaum beneath the 5th-century octagonal church, containing 1st-century Christian graffiti; the tomb of St. Peter beneath the high altar of St. Peter’s Basilica in the Vatican.',
  },
  {
    id: 'james',
    name: 'James',
    originalName: 'יַעֲקֹב / Ἰάκωβος',
    transliteration: 'Ya’aqov (Jacob) / Iakōbos',
    era: 'c. AD 5 – 62 (Nazareth, Jerusalem)',
    role: 'Brother of the Lord, Pillar of the Jerusalem Church & Bishop',
    testament: 'New Testament',
    category: 'General Epistles',
    booksWritten: ['James'],
    totalChapters: 5,
    keyVerse: {
      reference: 'James 1:22',
      text: 'Do not merely listen to the word, and so deceive yourselves. Do what it says.',
    },
    biography:
      'Raised alongside Jesus in the household of Joseph and Mary in Nazareth, James did not believe in Jesus’ divine claims during His earthly ministry (John 7:5). However, following the resurrection, the Risen Christ appeared specifically and personally to James (1 Cor 15:7), radically transforming him into a devoted servant. James rose to become the undisputed leader of the mother church in Jerusalem, presided over the landmark Jerusalem Council (Acts 15), and earned the title "James the Just" (Camel Knees) for his unceasing prayer intercession. He authored the most practical epistle in the New Testament, demanding that authentic faith produce compassionate, active works.',
    historicalSetting:
      'Jerusalem during the tumultuous decades leading up to the Jewish Revolt of AD 66. James was martyred around AD 62 when High Priest Ananus II had him cast down from the Temple pinnacle and clubbed to death, as recorded by the Jewish historian Flavius Josephus.',
    theologicalThemes: [
      'Living Faith Demonstrated by Works (James 2:14-26)',
      'Taming the Untamable Tongue',
      'Patience in Suffering and the Power of Fervent Prayer',
      'Pure Religion: Caring for Widows and Orphans',
      'True Heavenly Wisdom vs. Earthly Bitterness',
    ],
    manuscriptEvidence:
      'Papyrus 20 and Papyrus 23 (early 3rd century); Codex Sinaiticus and Codex Vaticanus.',
    archaeologicalFinds:
      'The historical account of James’ execution recorded in Josephus’ *Antiquities of the Jews* (Book 20, Chapter 9); the James Ossuary ("James, son of Joseph, brother of Jesus").',
  },
  {
    id: 'jude',
    name: 'Jude',
    originalName: 'יְהוּדָה / Ἰούδας',
    transliteration: 'Yehūdah (Judah) / Ioudas',
    era: 'c. AD 10 – 80 (Galilee, Jerusalem)',
    role: 'Brother of James, Brother of the Lord & Evangelist',
    testament: 'New Testament',
    category: 'General Epistles',
    booksWritten: ['Jude'],
    totalChapters: 1,
    keyVerse: {
      reference: 'Jude 1:24-25',
      text: 'To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy—to the only God our Savior be glory, majesty, power and authority.',
    },
    biography:
      'Another brother of Jesus and brother of James the Just, Jude humbly introduced himself in his fiery letter not as the sibling of Christ, but as "a bondservant of Jesus Christ and brother of James." Like his brother James, he came to faith after the resurrection. Deeply alarmed by antinomian false teachers infiltrating early Christian love feasts and turning God’s grace into a license for immorality, Jude penned a punchy, urgent pastoral manifesto urging the saints to "contend earnestly for the faith once delivered to the saints," closing with one of the most majestic doxologies in all of world literature.',
    historicalSetting:
      'The mid-to-late 1st century as early Gnostic and libertine heresies began threatening the purity and moral integrity of Christian communities across the Levant.',
    theologicalThemes: [
      'Contending Earnestly for Apostolic Truth',
      'The Perils of Moral Compromise and Licentiousness',
      'The Sovereign Ability of God to Keep Believers from Falling',
      'Rescuing the Doubting with Fear and Compassion',
    ],
    manuscriptEvidence:
      'Papyrus 72 (c. 3rd–4th century); Papyrus 78 (3rd century); early acceptance in the Muratorian Canon (c. AD 170).',
    archaeologicalFinds:
      'Early Christian inscriptions in Roman Judea mentioning the relatives (desposyni) of Jesus Christ who were interrogated by Emperor Domitian.',
  },
];
