export interface BibleBook {
  id: string;
  name: string;
  testament: 'Old Testament' | 'New Testament';
  category: 'Law' | 'History' | 'Wisdom' | 'Prophecy' | 'Gospel' | 'Epistle' | 'Apocalyptic';
  chaptersCount: number;
}

export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapterData {
  reference: string;
  book_name: string;
  chapter: number;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // --- OLD TESTAMENT (39 Books) ---
  // Pentateuch / Law
  { id: 'GEN', name: 'Genesis', testament: 'Old Testament', category: 'Law', chaptersCount: 50 },
  { id: 'EXO', name: 'Exodus', testament: 'Old Testament', category: 'Law', chaptersCount: 40 },
  { id: 'LEV', name: 'Leviticus', testament: 'Old Testament', category: 'Law', chaptersCount: 27 },
  { id: 'NUM', name: 'Numbers', testament: 'Old Testament', category: 'Law', chaptersCount: 36 },
  { id: 'DEU', name: 'Deuteronomy', testament: 'Old Testament', category: 'Law', chaptersCount: 34 },
  // Historical Books
  { id: 'JOS', name: 'Joshua', testament: 'Old Testament', category: 'History', chaptersCount: 24 },
  { id: 'JDG', name: 'Judges', testament: 'Old Testament', category: 'History', chaptersCount: 21 },
  { id: 'RUT', name: 'Ruth', testament: 'Old Testament', category: 'History', chaptersCount: 4 },
  { id: '1SA', name: '1 Samuel', testament: 'Old Testament', category: 'History', chaptersCount: 31 },
  { id: '2SA', name: '2 Samuel', testament: 'Old Testament', category: 'History', chaptersCount: 24 },
  { id: '1KI', name: '1 Kings', testament: 'Old Testament', category: 'History', chaptersCount: 22 },
  { id: '2KI', name: '2 Kings', testament: 'Old Testament', category: 'History', chaptersCount: 25 },
  { id: '1CH', name: '1 Chronicles', testament: 'Old Testament', category: 'History', chaptersCount: 29 },
  { id: '2CH', name: '2 Chronicles', testament: 'Old Testament', category: 'History', chaptersCount: 36 },
  { id: 'EZR', name: 'Ezra', testament: 'Old Testament', category: 'History', chaptersCount: 10 },
  { id: 'NEH', name: 'Nehemiah', testament: 'Old Testament', category: 'History', chaptersCount: 13 },
  { id: 'EST', name: 'Esther', testament: 'Old Testament', category: 'History', chaptersCount: 10 },
  // Wisdom & Poetry
  { id: 'JOB', name: 'Job', testament: 'Old Testament', category: 'Wisdom', chaptersCount: 42 },
  { id: 'PSA', name: 'Psalms', testament: 'Old Testament', category: 'Wisdom', chaptersCount: 150 },
  { id: 'PRO', name: 'Proverbs', testament: 'Old Testament', category: 'Wisdom', chaptersCount: 31 },
  { id: 'ECC', name: 'Ecclesiastes', testament: 'Old Testament', category: 'Wisdom', chaptersCount: 12 },
  { id: 'SNG', name: 'Song of Solomon', testament: 'Old Testament', category: 'Wisdom', chaptersCount: 8 },
  // Major Prophets
  { id: 'ISA', name: 'Isaiah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 66 },
  { id: 'JER', name: 'Jeremiah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 52 },
  { id: 'LAM', name: 'Lamentations', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 5 },
  { id: 'EZK', name: 'Ezekiel', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 48 },
  { id: 'DAN', name: 'Daniel', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 12 },
  // Minor Prophets
  { id: 'HOS', name: 'Hosea', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 14 },
  { id: 'JOL', name: 'Joel', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 3 },
  { id: 'AMO', name: 'Amos', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 9 },
  { id: 'OBA', name: 'Obadiah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 1 },
  { id: 'JON', name: 'Jonah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 4 },
  { id: 'MIC', name: 'Micah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 7 },
  { id: 'NAM', name: 'Nahum', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 3 },
  { id: 'HAB', name: 'Habakkuk', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 3 },
  { id: 'ZEP', name: 'Zephaniah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 3 },
  { id: 'HAG', name: 'Haggai', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 2 },
  { id: 'ZEC', name: 'Zechariah', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 14 },
  { id: 'MAL', name: 'Malachi', testament: 'Old Testament', category: 'Prophecy', chaptersCount: 4 },

  // --- NEW TESTAMENT (27 Books) ---
  // Gospels
  { id: 'MAT', name: 'Matthew', testament: 'New Testament', category: 'Gospel', chaptersCount: 28 },
  { id: 'MRK', name: 'Mark', testament: 'New Testament', category: 'Gospel', chaptersCount: 16 },
  { id: 'LUK', name: 'Luke', testament: 'New Testament', category: 'Gospel', chaptersCount: 24 },
  { id: 'JHN', name: 'John', testament: 'New Testament', category: 'Gospel', chaptersCount: 21 },
  // History
  { id: 'ACT', name: 'Acts', testament: 'New Testament', category: 'History', chaptersCount: 28 },
  // Pauline Epistles
  { id: 'ROM', name: 'Romans', testament: 'New Testament', category: 'Epistle', chaptersCount: 16 },
  { id: '1CO', name: '1 Corinthians', testament: 'New Testament', category: 'Epistle', chaptersCount: 16 },
  { id: '2CO', name: '2 Corinthians', testament: 'New Testament', category: 'Epistle', chaptersCount: 13 },
  { id: 'GAL', name: 'Galatians', testament: 'New Testament', category: 'Epistle', chaptersCount: 6 },
  { id: 'EPH', name: 'Ephesians', testament: 'New Testament', category: 'Epistle', chaptersCount: 6 },
  { id: 'PHP', name: 'Philippians', testament: 'New Testament', category: 'Epistle', chaptersCount: 4 },
  { id: 'COL', name: 'Colossians', testament: 'New Testament', category: 'Epistle', chaptersCount: 4 },
  { id: '1TH', name: '1 Thessalonians', testament: 'New Testament', category: 'Epistle', chaptersCount: 5 },
  { id: '2TH', name: '2 Thessalonians', testament: 'New Testament', category: 'Epistle', chaptersCount: 3 },
  { id: '1TI', name: '1 Timothy', testament: 'New Testament', category: 'Epistle', chaptersCount: 6 },
  { id: '2TI', name: '2 Timothy', testament: 'New Testament', category: 'Epistle', chaptersCount: 4 },
  { id: 'TIT', name: 'Titus', testament: 'New Testament', category: 'Epistle', chaptersCount: 3 },
  { id: 'PHM', name: 'Philemon', testament: 'New Testament', category: 'Epistle', chaptersCount: 1 },
  // General Epistles
  { id: 'HEB', name: 'Hebrews', testament: 'New Testament', category: 'Epistle', chaptersCount: 13 },
  { id: 'JAS', name: 'James', testament: 'New Testament', category: 'Epistle', chaptersCount: 5 },
  { id: '1PE', name: '1 Peter', testament: 'New Testament', category: 'Epistle', chaptersCount: 5 },
  { id: '2PE', name: '2 Peter', testament: 'New Testament', category: 'Epistle', chaptersCount: 3 },
  { id: '1JN', name: '1 John', testament: 'New Testament', category: 'Epistle', chaptersCount: 5 },
  { id: '2JN', name: '2 John', testament: 'New Testament', category: 'Epistle', chaptersCount: 1 },
  { id: '3JN', name: '3 John', testament: 'New Testament', category: 'Epistle', chaptersCount: 1 },
  { id: 'JUD', name: 'Jude', testament: 'New Testament', category: 'Epistle', chaptersCount: 1 },
  // Apocalyptic
  { id: 'REV', name: 'Revelation', testament: 'New Testament', category: 'Apocalyptic', chaptersCount: 22 },
];

export const OLD_TESTAMENT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'Old Testament');
export const NEW_TESTAMENT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'New Testament');

// Fallback pre-bundled chapters for offline resilience
export const PREBUNDLED_CHAPTERS: Record<string, BibleChapterData> = {
  'Genesis_1': {
    reference: 'Genesis 1',
    book_name: 'Genesis',
    chapter: 1,
    verses: [
      { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
      { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.' },
      { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'God said, “Let there be light,” and there was light.' },
      { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'God saw the light, and saw that it was good. God divided the light from the darkness.' },
      { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'God called the light “day”, and the darkness he called “night”. There was evening and there was morning, the first day.' },
    ],
    text: 'In the beginning, God created the heavens and the earth...',
    translation_id: 'web',
    translation_name: 'World English Bible',
  },
  'John_3': {
    reference: 'John 3',
    book_name: 'John',
    chapter: 3,
    verses: [
      { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 1, text: 'Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews.' },
      { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 2, text: 'The same came to him by night, and said to him, “Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do, unless God is with him.”' },
      { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 3, text: 'Jesus answered him, “Most certainly, I tell you, unless one is born anew, he can’t see God’s Kingdom.”' },
      { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whoever believes in him should not perish, but have eternal life.' },
      { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'For God didn’t send his Son into the world to judge the world, but that the world should be saved through him.' },
    ],
    text: 'Now there was a man of the Pharisees named Nicodemus...',
    translation_id: 'web',
    translation_name: 'World English Bible',
  },
  'Psalms_23': {
    reference: 'Psalms 23',
    book_name: 'Psalms',
    chapter: 23,
    verses: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Yahweh is my shepherd: I shall lack nothing.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'He makes me lie down in green pastures. He leads me beside still waters.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'He restores my soul. He guides me in the paths of righteousness for his name’s sake.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'You prepare a table before me in the presence of my enemies. You have anointed my head with oil. My cup runs over.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever.' },
    ],
    text: 'Yahweh is my shepherd: I shall lack nothing...',
    translation_id: 'web',
    translation_name: 'World English Bible',
  },
};
