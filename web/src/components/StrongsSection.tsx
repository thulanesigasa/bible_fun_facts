import React from 'react';

const sampleEntries = [
  { strongs: 'G1834', word: 'ἐξηγέομαι', transliteration: 'exēgeomai', definition: 'To lead out; to unfold, declare, and interpret. Used of expounding divine mysteries.' },
  { strongs: 'G26', word: 'ἀγάπη', transliteration: 'agapē', definition: 'Unconditional, selfless love — the highest form. Used predominantly for divine love in the NT.' },
  { strongs: 'G4102', word: 'πίστις', transliteration: 'pistis', definition: "Faith, belief, trust; the conviction that God's promises are true and will be fulfilled." },
  { strongs: 'H430', word: 'אֱלֹהִים', transliteration: 'ʾĕlōhîm', definition: 'God, gods; the plural form used for the singular divine being, indicating majesty and fullness.' },
  { strongs: 'G5485', word: 'χάρις', transliteration: 'charis', definition: 'Grace; unmerited divine favor, beauty, and gifting. The root of "charisma".' },
  { strongs: 'H7307', word: 'רוּחַ', transliteration: 'rûaḥ', definition: 'Spirit, breath, wind. The animating life-force of God breathed into humanity and all creation.' },
];

const capabilities = [
  "Tap any verse word to see its Strong's entry instantly",
  'Full-text search across definitions, roots, and transliterations',
  'Greek New Testament & Hebrew Old Testament lexicons embedded offline',
  'Cross-referenced to all 32 Bible translations in one tap',
];

export function StrongsSection() {
  return (
    <section className="section section-alt" id="strongs">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">14,298 Original Language Entries — Fully Searchable</h2>
          <p className="section-desc">
            Every Greek and Hebrew word indexed with Strong&apos;s numbering, transliteration,
            pronunciation, and full semantic definition. Powered by FTS5 SQLite for
            millisecond substring search across the entire lexicon.
          </p>
        </div>

        <div className="strongs-search-demo">
          <div className="strongs-search-bar">
            <span className="strongs-search-placeholder">Search Greek or Hebrew… e.g. &quot;grace&quot;, &quot;G5485&quot;, &quot;χάρις&quot;</span>
          </div>
        </div>

        <div className="strongs-grid">
          {sampleEntries.map((e) => (
            <div className="strongs-card" key={e.strongs}>
              <div className="strongs-card-top">
                <span className="strongs-num">{e.strongs}</span>
                <div>
                  <div className="strongs-word">{e.word}</div>
                  <div className="strongs-translit">{e.transliteration}</div>
                </div>
              </div>
              <p className="strongs-def">{e.definition}</p>
            </div>
          ))}
        </div>

        <div className="strongs-features">
          {capabilities.map((feat) => (
            <div className="strongs-feat-item" key={feat}>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="strongs-attribution">
          <span>Based on James Strong&apos;s Exhaustive Concordance (1890) — public domain</span>
        </div>
      </div>
    </section>
  );
}
