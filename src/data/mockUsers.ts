export interface CommunityUser {
  id: string;
  name: string;
  username: string; // @handle
  role: string;
  theologicalFocus: string;
  bio: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  streak: number;
  versesExplored: number;
  isVerified?: boolean;
  tags: string[];
  favoriteVerse: {
    reference: string;
    text: string;
    note: string;
  };
}

export const MOCK_COMMUNITY_USERS: CommunityUser[] = [
  {
    id: 'user_1',
    name: 'Prof. Sarah M. Jenkins',
    username: 'sarah_exegesis',
    role: 'Pauline Epistles Scholar',
    theologicalFocus: 'Hellenistic Greek & Early Church Hermeneutics',
    bio: 'Associate Professor of Biblical Exegesis. Unpacking historical context and linguistic nuances in Romans and Galatians.',
    joinedDate: 'March 2026',
    followersCount: 1420,
    followingCount: 215,
    streak: 84,
    versesExplored: 940,
    isVerified: true,
    tags: ['Romans', 'Galatians', 'Koine Greek', 'Hermeneutics'],
    favoriteVerse: {
      reference: 'Romans 8:28',
      text: 'We know that all things work together for good for those who love God, to those who are called according to his purpose.',
      note: 'The Greek "synergei" emphasizes God’s sovereign weaving of historical providence with redemptive purpose.',
    },
  },
  {
    id: 'user_2',
    name: 'Dr. David N. Cohen',
    username: 'david_hebrew',
    role: 'Semitic Lexicographer',
    theologicalFocus: 'Biblical Hebrew & Ancient Near Eastern Context',
    bio: 'Exploring poetic parallelism in the Psalms and the theological significance of covenantal faithfulness (Hesed).',
    joinedDate: 'January 2026',
    followersCount: 980,
    followingCount: 140,
    streak: 112,
    versesExplored: 1250,
    isVerified: true,
    tags: ['Psalms', 'Hebrew Poetry', 'Wisdom', 'Hesed'],
    favoriteVerse: {
      reference: 'Psalm 23:1',
      text: 'Yahweh is my shepherd: I shall lack nothing.',
      note: '"Ro’i" conveys pastoral tenderness, protection, and complete reliance on God as our Shepherd King.',
    },
  },
  {
    id: 'user_3',
    name: 'Lydia of Philippi Circle',
    username: 'lydia_fellowship',
    role: 'Acts & Missions Fellowship',
    theologicalFocus: 'Macedonian Call & First-Century Hospitality',
    bio: 'Dedicated study group exploring first-century house churches, prayer gatherings, and missional hospitality across Acts.',
    joinedDate: 'February 2026',
    followersCount: 650,
    followingCount: 88,
    streak: 45,
    versesExplored: 410,
    isVerified: false,
    tags: ['Acts', 'Hospitality', 'Prayer', 'Missions'],
    favoriteVerse: {
      reference: 'Acts 16:14',
      text: 'A certain woman named Lydia, a seller of purple fruit from the city of Thyatira, who worshiped God, heard us. The Lord opened her heart...',
      note: 'Notice the synergy between faithful proclamation and the Lord opening the receptive heart.',
    },
  },
  {
    id: 'user_4',
    name: 'Pastor Marcus Aurelius Vance',
    username: 'marcus_vance',
    role: 'Senior Teaching Pastor',
    theologicalFocus: 'Expository Preaching & Biblical Theology',
    bio: 'Preaching verse-by-verse through the Gospel of John. Passionate about historical orthodoxy and discipleship in daily life.',
    joinedDate: 'April 2026',
    followersCount: 1890,
    followingCount: 310,
    streak: 67,
    versesExplored: 820,
    isVerified: true,
    tags: ['Gospel of John', 'Exposition', 'Discipleship'],
    favoriteVerse: {
      reference: 'John 1:14',
      text: 'The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.',
      note: '"Eskēnōsen" (tabernacled) directly connects the Incarnation to the sacred tent of Exodus.',
    },
  },
  {
    id: 'user_5',
    name: 'Miriam K. Al-Haddad',
    username: 'miriam_scriptures',
    role: 'Biblical Archaeology Fellow',
    theologicalFocus: 'Cultural Customs & Levant Artifacts',
    bio: 'Connecting archaeological discoveries in Jerusalem and Galilee with the historical narrative of the Bible.',
    joinedDate: 'May 2026',
    followersCount: 540,
    followingCount: 92,
    streak: 39,
    versesExplored: 360,
    isVerified: false,
    tags: ['Archaeology', 'Customs', 'Historical Levant'],
    favoriteVerse: {
      reference: 'Micah 5:2',
      text: 'But you, Bethlehem Ephrathah, being small among the clans of Judah, out of you one will come out to me that is to be ruler in Israel...',
      note: 'Archaeological stratigraphy at Bethlehem validates its ancient agricultural antiquity.',
    },
  },
  {
    id: 'user_6',
    name: 'Brother Apollos Circle',
    username: 'apollos_apologetics',
    role: 'Textual Criticism Study',
    theologicalFocus: 'Manuscript Reliability & Classical Rhetoric',
    bio: 'Examining the Dead Sea Scrolls, Codex Vaticanus, and the miraculous preservation of Scripture through the ages.',
    joinedDate: 'June 2026',
    followersCount: 780,
    followingCount: 120,
    streak: 92,
    versesExplored: 1100,
    isVerified: true,
    tags: ['Manuscripts', 'Dead Sea Scrolls', 'Apologetics'],
    favoriteVerse: {
      reference: 'Isaiah 40:8',
      text: 'The grass withers, the flower fades; but the word of our God stands forever.',
      note: 'Confirmed word-for-word in the Great Isaiah Scroll preserved in the Qumran caves.',
    },
  },
  {
    id: 'user_7',
    name: 'Grace A. Mthembu',
    username: 'grace_walk',
    role: 'Devotional Writer',
    theologicalFocus: 'Daily Wisdom & Proverbs in Modern Practice',
    bio: 'Reflecting on Solomon’s proverbs and how ancient Hebrew wisdom brings clarity, peace, and discernment to our work and family life.',
    joinedDate: 'July 2026',
    followersCount: 420,
    followingCount: 165,
    streak: 52,
    versesExplored: 490,
    isVerified: false,
    tags: ['Proverbs', 'Daily Walk', 'Family', 'Wisdom'],
    favoriteVerse: {
      reference: 'Proverbs 3:5-6',
      text: 'Trust in Yahweh with all your heart, and don’t lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight.',
      note: 'Total confidence in Yahweh replaces human anxiety with divine alignment.',
    },
  },
  {
    id: 'user_8',
    name: 'Jonathan Edwards Fellowship',
    username: 'solagratia_study',
    role: 'Historical Theology Group',
    theologicalFocus: 'Covenant Theology & Reformation Exegesis',
    bio: 'Reading Scripture through the lens of divine grace, covenant promise, and historical theology.',
    joinedDate: 'August 2026',
    followersCount: 610,
    followingCount: 75,
    streak: 61,
    versesExplored: 580,
    isVerified: false,
    tags: ['Covenant', 'Grace', 'Reformation', 'Epistles'],
    favoriteVerse: {
      reference: 'Ephesians 2:8-9',
      text: 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast.',
      note: 'Grace (charis) as unmerited divine favor is the central pillar of biblical salvation.',
    },
  },
];
