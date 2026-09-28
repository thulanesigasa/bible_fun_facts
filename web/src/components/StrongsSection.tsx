'use client';

import React, { useState, useMemo } from 'react';

interface Entry {
  num: string;
  lang: 'Greek' | 'Hebrew';
  word: string;
  translit: string;
  def: string;
  occurrences: number;
}

const lexiconEntries: Entry[] = [
  {
    num: 'G1834',
    lang: 'Greek',
    word: 'ἐξηγέομαι',
    translit: 'exēgeomai',
    def: 'To lead out, unfold, declare, and interpret. Specifically used in John 1:18 of Christ declaring and unfolding the unseen Father.',
    occurrences: 6,
  },
  {
    num: 'G26',
    lang: 'Greek',
    word: 'ἀγάπη',
    translit: 'agapē',
    def: 'Self-sacrificial, unconditional divine love. The highest form of love in Scripture, originating in God’s nature.',
    occurrences: 116,
  },
  {
    num: 'G4102',
    lang: 'Greek',
    word: 'πίστις',
    translit: 'pistis',
    def: 'Faith, conviction of divine truth, personal trust and surrender to God’s promises in Jesus Christ.',
    occurrences: 243,
  },
  {
    num: 'G5485',
    lang: 'Greek',
    word: 'χάρις',
    translit: 'charis',
    def: 'Grace, unmerited divine favor, spiritual enablement, and lovingkindness freely bestowed upon believers.',
    occurrences: 156,
  },
  {
    num: 'G2222',
    lang: 'Greek',
    word: 'ζωή',
    translit: 'zōē',
    def: 'Life in the absolute sense; life as God has it; eternal, divine vitality bestowed upon redeemed humanity.',
    occurrences: 135,
  },
  {
    num: 'G3056',
    lang: 'Greek',
    word: 'λόγος',
    translit: 'logos',
    def: 'The Word; divine expression, cosmic reason, and the eternal Son incarnate as the revelation of God.',
    occurrences: 330,
  },
  {
    num: 'H7225',
    lang: 'Hebrew',
    word: 'רֵאשִׁית',
    translit: 'rēʾšît',
    def: 'Beginning, firstfruits, chief part, origin. The opening word of Genesis: "In the beginning".',
    occurrences: 51,
  },
  {
    num: 'H430',
    lang: 'Hebrew',
    word: 'אֱלֹהִים',
    translit: 'ʾĕlōhîm',
    def: 'God, gods. Plural of majesty used throughout Genesis 1 to declare the supreme, sovereign Creator.',
    occurrences: 2606,
  },
  {
    num: 'H7307',
    lang: 'Hebrew',
    word: 'רוּחַ',
    translit: 'rûaḥ',
    def: 'Spirit, breath, wind. The animating divine breath hovered over the face of the waters.',
    occurrences: 378,
  },
  {
    num: 'H2617',
    lang: 'Hebrew',
    word: 'חֶסֶד',
    translit: 'ḥesed',
    def: 'Steadfast covenant love, mercy, loyalty, lovingkindness that never fails or breaks covenant.',
    occurrences: 248,
  },
  {
    num: 'H7965',
    lang: 'Hebrew',
    word: 'שָׁלוֹם',
    translit: 'šālôm',
    def: 'Completeness, soundness, holistic peace, reconciliation, health, and welfare in God.',
    occurrences: 237,
  },
  {
    num: 'H1254',
    lang: 'Hebrew',
    word: 'בָּרָא',
    translit: 'bārāʾ',
    def: 'To create out of nothing; an action used in the Hebrew Bible exclusively of God’s creative activity.',
    occurrences: 54,
  },
];

const capabilities = [
  "Tap any verse word in the mobile app to unfold its Strong's concordance entry",
  'Millisecond SQLite FTS5 full-text search across definitions, roots, and Strong’s codes',
  'Canonical Greek NT & Hebrew OT lexicons embedded completely offline',
  'Direct lexical cross-references linking 14,298 entries to 32 Bible translations',
];

export function StrongsSection() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lexiconEntries;
    return lexiconEntries.filter(
      (e) =>
        e.num.toLowerCase().includes(q) ||
        e.word.toLowerCase().includes(q) ||
        e.translit.toLowerCase().includes(q) ||
        e.def.toLowerCase().includes(q) ||
        e.lang.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="page-section section-alt" id="strongs">
      <header className="section-intro">
        <h2>14,298 Original Language Entries — Instant FTS5 Search</h2>
        <p>
          Every Greek and Hebrew word indexed with Strong&apos;s numbering, original
          script, academic transliteration, and unabridged semantic definition.
          Search across English definitions, transliterations, or concordance numbers.
        </p>
      </header>

      {/* ── Interactive Search (Semantic Form, Zero Divs) ── */}
      <form
        className="lexicon-search-bar"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <input
          type="search"
          className="lexicon-search-input"
          placeholder="Filter live… e.g. G1834, grace, ἀγάπη, hesed, beginning, H430"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter Strong's lexicon"
        />
        {query && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setQuery('')}
            style={{ padding: '0 20px' }}
          >
            Clear
          </button>
        )}
      </form>

      {/* ── Filtered Lexicon Grid ── */}
      <ol className="lexicon-list" role="list">
        {filtered.map((e) => (
          <li className="lexicon-entry" key={e.num}>
            <header className="lexicon-header">
              <span className="lexicon-num">
                {e.num} · {e.lang}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {e.occurrences}x occurrences
              </span>
            </header>
            <article>
              <p className="lexicon-word">{e.word}</p>
              <p className="lexicon-translit">{e.translit}</p>
              <p className="lexicon-def">{e.def}</p>
            </article>
          </li>
        ))}
      </ol>

      {/* ── Technical Capabilities ── */}
      <ul className="capability-list" role="list">
        {capabilities.map((c) => (
          <li className="capability-item" key={c}>
            {c}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '36px', fontSize: '13px', color: 'var(--text-muted)' }}>
        Based on Dr. James Strong&apos;s Exhaustive Concordance of the Bible (1890) —
        canonical public domain dataset indexed with SQLite Full-Text Search (FTS5).
      </p>
    </section>
  );
}
