/**
 * Red Letter Bible — Verses containing the spoken words of Jesus Christ.
 *
 * Format: each entry is [bookId, chapter, startVerse, endVerse] (inclusive).
 * Built from traditional red-letter Bible scholarship covering Matthew, Mark,
 * Luke, John (Gospels), Acts (post-resurrection appearances), and Revelation.
 *
 * Book IDs match the bibleCanon.ts identifiers (3-letter uppercase: MAT, MRK, etc.)
 */

type RedLetterRange = [string, number, number, number]; // [bookId, ch, startV, endV]

const RED_LETTER_RANGES: RedLetterRange[] = [
  // ── MATTHEW ────────────────────────────────────────────────────────────────
  ['MAT', 3, 15, 15],
  ['MAT', 4, 4, 4], ['MAT', 4, 7, 7], ['MAT', 4, 10, 10], ['MAT', 4, 17, 17], ['MAT', 4, 19, 19],
  // Sermon on the Mount (full)
  ['MAT', 5, 3, 48],
  ['MAT', 6, 1, 34],
  ['MAT', 7, 1, 27],
  // Healings & calls
  ['MAT', 8, 3, 4], ['MAT', 8, 7, 7], ['MAT', 8, 10, 13], ['MAT', 8, 20, 20], ['MAT', 8, 22, 22], ['MAT', 8, 26, 26],
  ['MAT', 9, 2, 2], ['MAT', 9, 4, 6], ['MAT', 9, 9, 9], ['MAT', 9, 12, 13], ['MAT', 9, 15, 17], ['MAT', 9, 22, 22], ['MAT', 9, 24, 24], ['MAT', 9, 28, 29], ['MAT', 9, 37, 38],
  // Commission of the Twelve
  ['MAT', 10, 5, 42],
  // John the Baptist, come to me
  ['MAT', 11, 4, 6], ['MAT', 11, 7, 15], ['MAT', 11, 20, 30],
  // Sabbath disputes & Beelzebub
  ['MAT', 12, 3, 8], ['MAT', 12, 11, 12], ['MAT', 12, 25, 37], ['MAT', 12, 39, 45], ['MAT', 12, 48, 50],
  // Kingdom parables
  ['MAT', 13, 3, 23], ['MAT', 13, 24, 30], ['MAT', 13, 31, 33], ['MAT', 13, 37, 43], ['MAT', 13, 44, 52], ['MAT', 13, 57, 57],
  // Feeding, walking on water
  ['MAT', 14, 16, 18], ['MAT', 14, 27, 31],
  // Traditions of elders
  ['MAT', 15, 3, 9], ['MAT', 15, 11, 11], ['MAT', 15, 13, 14], ['MAT', 15, 16, 20], ['MAT', 15, 24, 24], ['MAT', 15, 26, 28], ['MAT', 15, 32, 38],
  // Peter's confession, passion predictions
  ['MAT', 16, 2, 4], ['MAT', 16, 6, 6], ['MAT', 16, 8, 12], ['MAT', 16, 13, 20], ['MAT', 16, 23, 28],
  ['MAT', 17, 7, 7], ['MAT', 17, 9, 9], ['MAT', 17, 11, 12], ['MAT', 17, 17, 17], ['MAT', 17, 20, 23], ['MAT', 17, 25, 27],
  // Greatness, forgiveness, lost sheep
  ['MAT', 18, 1, 35],
  // Marriage, wealth, disciples
  ['MAT', 19, 4, 6], ['MAT', 19, 8, 9], ['MAT', 19, 11, 12], ['MAT', 19, 14, 14], ['MAT', 19, 17, 26], ['MAT', 19, 28, 30],
  // Laborers, third passion, sons of Zebedee, servanthood, blind Bartimaeus
  ['MAT', 20, 13, 28], ['MAT', 20, 32, 33],
  // Triumphal entry, temple cleansing, fig tree
  ['MAT', 21, 2, 3], ['MAT', 21, 13, 13], ['MAT', 21, 21, 22], ['MAT', 21, 24, 25], ['MAT', 21, 27, 27], ['MAT', 21, 28, 32], ['MAT', 21, 33, 44],
  // Wedding feast, Caesar, resurrection, greatest commandment, David's son
  ['MAT', 22, 2, 14], ['MAT', 22, 18, 21], ['MAT', 22, 29, 32], ['MAT', 22, 37, 40], ['MAT', 22, 42, 45],
  // Seven woes
  ['MAT', 23, 2, 39],
  // Olivet Discourse
  ['MAT', 24, 2, 51],
  // Judgment parables (virgins, talents, sheep/goats)
  ['MAT', 25, 1, 46],
  // Passion week
  ['MAT', 26, 2, 2], ['MAT', 26, 10, 13], ['MAT', 26, 18, 18], ['MAT', 26, 21, 21], ['MAT', 26, 23, 23],
  ['MAT', 26, 25, 29], ['MAT', 26, 31, 32], ['MAT', 26, 34, 34], ['MAT', 26, 36, 46], ['MAT', 26, 50, 56], ['MAT', 26, 64, 64],
  ['MAT', 27, 11, 11], ['MAT', 27, 46, 46],
  // Great Commission
  ['MAT', 28, 9, 10], ['MAT', 28, 18, 20],

  // ── MARK ───────────────────────────────────────────────────────────────────
  ['MRK', 1, 15, 15], ['MRK', 1, 17, 17], ['MRK', 1, 25, 25], ['MRK', 1, 38, 38], ['MRK', 1, 41, 41], ['MRK', 1, 44, 44],
  ['MRK', 2, 5, 5], ['MRK', 2, 8, 11], ['MRK', 2, 14, 14], ['MRK', 2, 17, 22], ['MRK', 2, 25, 28],
  ['MRK', 3, 3, 5], ['MRK', 3, 23, 29], ['MRK', 3, 33, 35],
  ['MRK', 4, 2, 32], ['MRK', 4, 35, 40],
  ['MRK', 5, 8, 9], ['MRK', 5, 30, 34], ['MRK', 5, 36, 36], ['MRK', 5, 39, 39],
  ['MRK', 6, 4, 4], ['MRK', 6, 10, 11], ['MRK', 6, 31, 31], ['MRK', 6, 38, 38], ['MRK', 6, 50, 50],
  ['MRK', 7, 6, 23], ['MRK', 7, 27, 29],
  ['MRK', 8, 2, 3], ['MRK', 8, 5, 5], ['MRK', 8, 12, 12], ['MRK', 8, 15, 21], ['MRK', 8, 27, 38],
  ['MRK', 9, 1, 1], ['MRK', 9, 9, 13], ['MRK', 9, 16, 19], ['MRK', 9, 21, 29], ['MRK', 9, 31, 32], ['MRK', 9, 35, 50],
  ['MRK', 10, 3, 9], ['MRK', 10, 11, 15], ['MRK', 10, 18, 30], ['MRK', 10, 32, 45], ['MRK', 10, 49, 52],
  ['MRK', 11, 2, 3], ['MRK', 11, 14, 14], ['MRK', 11, 17, 17], ['MRK', 11, 22, 33],
  ['MRK', 12, 1, 12], ['MRK', 12, 15, 17], ['MRK', 12, 24, 34], ['MRK', 12, 35, 44],
  ['MRK', 13, 2, 37],
  ['MRK', 14, 6, 9], ['MRK', 14, 13, 15], ['MRK', 14, 18, 25], ['MRK', 14, 27, 28], ['MRK', 14, 30, 30],
  ['MRK', 14, 34, 42], ['MRK', 14, 48, 49], ['MRK', 14, 62, 62],
  ['MRK', 15, 2, 2], ['MRK', 15, 34, 34],
  ['MRK', 16, 15, 18],

  // ── LUKE ───────────────────────────────────────────────────────────────────
  ['LUK', 2, 49, 49],
  ['LUK', 4, 4, 4], ['LUK', 4, 8, 8], ['LUK', 4, 12, 12], ['LUK', 4, 18, 19], ['LUK', 4, 21, 21], ['LUK', 4, 23, 27], ['LUK', 4, 34, 35], ['LUK', 4, 43, 43],
  ['LUK', 5, 4, 4], ['LUK', 5, 10, 10], ['LUK', 5, 13, 13], ['LUK', 5, 20, 24], ['LUK', 5, 27, 27], ['LUK', 5, 31, 39],
  ['LUK', 6, 3, 5], ['LUK', 6, 8, 10], ['LUK', 6, 20, 49],
  ['LUK', 7, 9, 10], ['LUK', 7, 13, 15], ['LUK', 7, 22, 28], ['LUK', 7, 31, 35], ['LUK', 7, 40, 50],
  ['LUK', 8, 5, 18], ['LUK', 8, 21, 21], ['LUK', 8, 25, 25], ['LUK', 8, 28, 30], ['LUK', 8, 39, 39], ['LUK', 8, 45, 48], ['LUK', 8, 50, 52],
  ['LUK', 9, 3, 5], ['LUK', 9, 13, 14], ['LUK', 9, 18, 27], ['LUK', 9, 41, 48], ['LUK', 9, 50, 62],
  ['LUK', 10, 2, 24], ['LUK', 10, 26, 28], ['LUK', 10, 30, 37], ['LUK', 10, 41, 42],
  ['LUK', 11, 2, 13], ['LUK', 11, 17, 36], ['LUK', 11, 39, 54],
  ['LUK', 12, 1, 59],
  ['LUK', 13, 2, 9], ['LUK', 13, 12, 16], ['LUK', 13, 18, 21], ['LUK', 13, 23, 35],
  ['LUK', 14, 3, 6], ['LUK', 14, 8, 24], ['LUK', 14, 26, 35],
  ['LUK', 15, 4, 32],
  ['LUK', 16, 1, 31],
  ['LUK', 17, 1, 10], ['LUK', 17, 14, 14], ['LUK', 17, 17, 21], ['LUK', 17, 23, 37],
  ['LUK', 18, 2, 8], ['LUK', 18, 10, 17], ['LUK', 18, 19, 30], ['LUK', 18, 31, 34], ['LUK', 18, 40, 42],
  ['LUK', 19, 5, 5], ['LUK', 19, 9, 10], ['LUK', 19, 12, 27], ['LUK', 19, 30, 31], ['LUK', 19, 40, 40], ['LUK', 19, 42, 44], ['LUK', 19, 46, 46],
  ['LUK', 20, 3, 8], ['LUK', 20, 9, 18], ['LUK', 20, 21, 25], ['LUK', 20, 27, 40], ['LUK', 20, 41, 47],
  ['LUK', 21, 3, 4], ['LUK', 21, 6, 36],
  ['LUK', 22, 10, 12], ['LUK', 22, 14, 22], ['LUK', 22, 25, 53], ['LUK', 22, 67, 70],
  ['LUK', 23, 3, 3], ['LUK', 23, 28, 31], ['LUK', 23, 34, 34], ['LUK', 23, 43, 43], ['LUK', 23, 46, 46],
  ['LUK', 24, 17, 49],

  // ── JOHN ───────────────────────────────────────────────────────────────────
  ['JHN', 1, 38, 39], ['JHN', 1, 42, 42], ['JHN', 1, 43, 43], ['JHN', 1, 47, 51],
  ['JHN', 2, 4, 4], ['JHN', 2, 7, 8], ['JHN', 2, 16, 16], ['JHN', 2, 19, 19],
  ['JHN', 3, 3, 21],
  ['JHN', 4, 7, 26], ['JHN', 4, 32, 35], ['JHN', 4, 48, 50],
  ['JHN', 5, 6, 9], ['JHN', 5, 14, 14], ['JHN', 5, 17, 47],
  ['JHN', 6, 5, 7], ['JHN', 6, 10, 12], ['JHN', 6, 20, 21], ['JHN', 6, 26, 65],
  ['JHN', 7, 6, 8], ['JHN', 7, 16, 24], ['JHN', 7, 28, 29], ['JHN', 7, 33, 36], ['JHN', 7, 37, 38],
  ['JHN', 8, 7, 11], ['JHN', 8, 12, 59],
  ['JHN', 9, 3, 5], ['JHN', 9, 35, 39], ['JHN', 9, 41, 41],
  ['JHN', 10, 1, 18], ['JHN', 10, 25, 38],
  ['JHN', 11, 4, 4], ['JHN', 11, 9, 15], ['JHN', 11, 23, 27], ['JHN', 11, 34, 35], ['JHN', 11, 39, 44],
  ['JHN', 12, 7, 8], ['JHN', 12, 23, 36], ['JHN', 12, 44, 50],
  ['JHN', 13, 7, 17], ['JHN', 13, 19, 21], ['JHN', 13, 26, 38],
  ['JHN', 14, 1, 31],
  ['JHN', 15, 1, 27],
  ['JHN', 16, 1, 33],
  ['JHN', 17, 1, 26],
  ['JHN', 18, 4, 8], ['JHN', 18, 11, 11], ['JHN', 18, 20, 23], ['JHN', 18, 34, 37],
  ['JHN', 19, 11, 11], ['JHN', 19, 26, 28], ['JHN', 19, 30, 30],
  ['JHN', 20, 15, 17], ['JHN', 20, 19, 22], ['JHN', 20, 26, 29],
  ['JHN', 21, 5, 6], ['JHN', 21, 10, 12], ['JHN', 21, 15, 22],

  // ── ACTS (post-resurrection appearances) ───────────────────────────────────
  ['ACT', 1, 4, 8],
  ['ACT', 9, 4, 6], ['ACT', 9, 10, 12], ['ACT', 9, 15, 16],
  ['ACT', 10, 13, 15],
  ['ACT', 18, 9, 10],
  ['ACT', 22, 7, 10], ['ACT', 22, 17, 21],
  ['ACT', 23, 11, 11],
  ['ACT', 26, 14, 18],

  // ── PAULINE EPISTLES (Spoken words of Christ) ─────────────────────────────
  ['1CO', 11, 24, 25],
  ['2CO', 12, 9, 9],

  // ── REVELATION ─────────────────────────────────────────────────────────────
  ['REV', 1, 8, 8], ['REV', 1, 11, 11], ['REV', 1, 17, 20],
  ['REV', 2, 1, 29],
  ['REV', 3, 1, 22],
  ['REV', 16, 15, 15],
  ['REV', 21, 5, 8],
  ['REV', 22, 7, 7], ['REV', 22, 12, 16], ['REV', 22, 20, 20],
];

/**
 * O(1) lookup Set. Key format: "BOOKID_CHAPTER_VERSE" e.g. "MAT_5_3".
 * Built once at module load from the ranges above.
 */
export const RED_LETTER_SET: Set<string> = new Set<string>();

for (const [bookId, chapter, startVerse, endVerse] of RED_LETTER_RANGES) {
  for (let v = startVerse; v <= endVerse; v++) {
    RED_LETTER_SET.add(`${bookId}_${chapter}_${v}`);
  }
}

/**
 * Returns true if the given verse contains the spoken words of Jesus.
 * @param bookId   e.g. 'MAT', 'JHN'
 * @param chapter  chapter number
 * @param verse    verse number
 */
export function isRedLetter(bookId: string, chapter: number, verse: number): boolean {
  return RED_LETTER_SET.has(`${bookId}_${chapter}_${verse}`);
}
