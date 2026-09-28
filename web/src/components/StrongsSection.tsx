import React from 'react';

const entries = [
  { num: 'G1834', word: 'ἐξηγέομαι', translit: 'exēgeomai', def: 'To lead out; to unfold, declare, and interpret. Used of expounding divine mysteries.' },
  { num: 'G26',   word: 'ἀγάπη',     translit: 'agapē',     def: 'Unconditional, selfless love — the highest form. Used predominantly for divine love in the NT.' },
  { num: 'G4102', word: 'πίστις',     translit: 'pistis',    def: "Faith, belief, trust; the conviction that God's promises are true and will be fulfilled." },
  { num: 'H430',  word: 'אֱלֹהִים',   translit: 'ʾĕlōhîm',  def: 'God, gods; the plural form used for the singular divine being, indicating majesty and fullness.' },
  { num: 'G5485', word: 'χάρις',      translit: 'charis',    def: 'Grace; unmerited divine favor, beauty, and gifting. The root of "charisma".' },
  { num: 'H7307', word: 'רוּחַ',      translit: 'rûaḥ',     def: 'Spirit, breath, wind. The animating life-force of God breathed into humanity and all creation.' },
];

const capabilities = [
  "Tap any verse word to see its Strong's entry instantly",
  'Full-text search across definitions, roots, and transliterations',
  'Greek NT & Hebrew OT lexicons embedded — fully offline',
  'Cross-referenced to all 32 Bible translations in one tap',
];

export function StrongsSection() {
  return (
    <section className="page-section section-alt" id="strongs">
      <div className="wrap">
        <header className="section-intro">
          <h2>14,298 Original Language Entries — Fully Searchable</h2>
          <p>
            Every Greek and Hebrew word indexed with Strong&apos;s numbering, transliteration,
            and full semantic definition. Powered by FTS5 SQLite for millisecond substring
            search across the entire lexicon — fully offline.
          </p>
        </header>

        <p className="lexicon-search" aria-label="Search example">
          Search Greek or Hebrew… e.g. &quot;grace&quot;, &quot;G5485&quot;, &quot;χάρις&quot;
        </p>

        <ol className="lexicon-list" role="list">
          {entries.map((e) => (
            <li className="lexicon-entry" key={e.num}>
              <span className="lexicon-num">{e.num}</span>
              <article>
                <p className="lexicon-word">{e.word}</p>
                <p className="lexicon-translit">{e.translit}</p>
                <p className="lexicon-def">{e.def}</p>
              </article>
            </li>
          ))}
        </ol>

        <ul className="capability-list" role="list">
          {capabilities.map((c) => <li key={c}>{c}</li>)}
        </ul>

        <p style={{ marginTop: '32px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Based on James Strong&apos;s Exhaustive Concordance (1890) — public domain
        </p>
      </div>
    </section>
  );
}
