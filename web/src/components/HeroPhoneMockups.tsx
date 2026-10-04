import React from 'react';

export function HeroPhoneMockups() {
  return (
    <div className="hero-phones" aria-label="Interactive mobile application interface mockups">
      {/* LEFT PHONE: Daily Exegesis & Verse Feed */}
      <div className="hero-phone-side left">
        <div className="phone-float">
          <div className="phone-mock phone-mock--hero-side" role="img" aria-label="exégeomai daily exegesis feed showing Greek root breakdown">
            <div className="phone-mock-inner" aria-hidden="true">
              <div className="phone-device">
                <span className="phone-btn2"></span>
                <div className="phone-viewport">
                  <div className="phone-gloss"></div>
                  <div className="phone-screen">
                    {/* Status Bar */}
                    <div className="pm-status">
                      <span>09:42</span>
                      <div className="pm-status-icons">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                          <circle cx="12" cy="20" r="1" fill="currentColor" />
                        </svg>
                        <span className="pm-batt">100</span>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="pm-header">
                      <div className="pm-header-title">
                        <span className="pm-header-logo">ἐ</span>
                        <span>Daily Exegesis</span>
                      </div>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </div>

                    {/* App Content */}
                    <div className="pm-content">
                      <div className="pm-card">
                        <span className="pm-badge">365 DEVOTIONALS · GREEK ROOT</span>
                        <div className="pm-verse-ref">John 1:1 · En Archē ēn ho Logos</div>
                        <div className="pm-verse-greek">
                          Ἐν ἀρχῇ ἦν ὁ <span className="highlight">λόγος</span>, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν...
                        </div>
                        <p className="pm-text">
                          The Logos is not an impersonal philosophical abstraction. He is the eternal, self-revealing divine Person who walked among us full of grace and truth.
                        </p>
                      </div>

                      <div className="pm-card" style={{ background: '#F8FAFC' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FDD223' }}></span>
                          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#0F172A' }}>PHONETIC RECITATION</span>
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#475569' }}>
                          [en ar-khay&apos; ane ho log&apos;-os]
                        </div>
                      </div>
                    </div>

                    {/* Tab Navigation Pill (Rule 20) */}
                    <div className="pm-tabbar">
                      <div className="pm-tab is-active">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                        </svg>
                        <span>Exegesis</span>
                        <span className="pm-tab-dot"></span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                        <span>Reader</span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>Churches</span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Vault</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER PHONE: Scripture Reader with Strong's Concordance Card */}
      <div className="hero-phone-center">
        <div className="phone-float">
          <div className="phone-mock phone-mock--hero-center" role="img" aria-label="exégeomai interlinear reader showing G1834 exegeomai Strongs concordance entry">
            <div className="phone-mock-inner" aria-hidden="true">
              <div className="phone-device">
                <span className="phone-btn2"></span>
                <div className="phone-viewport">
                  <div className="phone-gloss"></div>
                  <div className="phone-screen">
                    {/* Status Bar */}
                    <div className="pm-status">
                      <span>09:42</span>
                      <div className="pm-status-icons">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <circle cx="12" cy="20" r="1" fill="currentColor" />
                        </svg>
                        <span className="pm-batt">100</span>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="pm-header">
                      <div className="pm-header-title">
                        <span className="pm-header-logo">G</span>
                        <span>John 1:18 · Interlinear</span>
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: 700, background: '#FDD223', color: '#0F172A', padding: '2px 6px', borderRadius: 4 }}>
                        KJV + GNT
                      </span>
                    </div>

                    {/* App Content with Strong's Card */}
                    <div className="pm-content">
                      <div className="pm-card" style={{ padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: '#64748B', marginBottom: 2 }}>John 1:18 (KJV)</div>
                        <p style={{ fontSize: 10.5, lineHeight: 1.45, color: '#0F172A' }}>
                          No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath{' '}
                          <span style={{ background: '#FDD223', fontWeight: 700, padding: '1px 3px', borderRadius: 3 }}>
                            declared
                          </span>{' '}
                          him.
                        </p>
                      </div>

                      {/* Strong's Popover Card */}
                      <div className="pm-lexicon-card">
                        <div className="pm-lex-header">
                          <span className="pm-lex-code">G1834</span>
                          <span className="pm-lex-word">ἐξηγέομαι</span>
                        </div>
                        <div className="pm-lex-pronounce">[ex-ay-geh&apos;-om-ahee] · Verb</div>
                        <div className="pm-lex-def">
                          To lead out, draw forth in narrative, declare, or unfold divine secrets and divine mysteries.
                        </div>
                        <div className="pm-lex-meta">
                          <span className="pm-lex-tag">Root: G1537 + G2233</span>
                          <span className="pm-lex-tag">6 occurrences</span>
                        </div>
                      </div>

                      <div className="pm-card" style={{ padding: '8px 10px', background: '#F8FAFC' }}>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>HISTORICAL CONTEXT</div>
                        <div style={{ fontSize: 9.5, color: '#64748B' }}>
                          Apostle John · Patmos / Ephesus · c. 85–95 AD
                        </div>
                      </div>
                    </div>

                    {/* Tab Navigation Pill (Rule 20) */}
                    <div className="pm-tabbar">
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                        </svg>
                        <span>Exegesis</span>
                      </div>
                      <div className="pm-tab is-active">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                        <span>Reader</span>
                        <span className="pm-tab-dot"></span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>Churches</span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Vault</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PHONE: Verified Church Ministries & Canons */}
      <div className="hero-phone-side right">
        <div className="phone-float">
          <div className="phone-mock phone-mock--hero-side" role="img" aria-label="exégeomai church ministries directory and offline canons">
            <div className="phone-mock-inner" aria-hidden="true">
              <div className="phone-device">
                <span className="phone-btn2"></span>
                <div className="phone-viewport">
                  <div className="phone-gloss"></div>
                  <div className="phone-screen">
                    {/* Status Bar */}
                    <div className="pm-status">
                      <span>09:42</span>
                      <div className="pm-status-icons">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <circle cx="12" cy="20" r="1" fill="currentColor" />
                        </svg>
                        <span className="pm-batt">100</span>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="pm-header">
                      <div className="pm-header-title">
                        <span className="pm-header-logo">✞</span>
                        <span>Sound Churches</span>
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: '#0F172A' }}>
                        GPS Verified
                      </span>
                    </div>

                    {/* App Content */}
                    <div className="pm-content">
                      <div className="pm-card">
                        <span className="pm-badge">32 CANONS LOADED</span>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>
                          Local SQLite Bibles
                        </div>
                        <div style={{ fontSize: 9.5, color: '#64748B' }}>
                          KJV · ASV · YLT · Vulgate · isiZulu · Sepedi
                        </div>
                      </div>

                      <div className="pm-card">
                        <div className="pm-church-item">
                          <div className="pm-church-icon">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#0F172A" strokeWidth="2">
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </div>
                          <div>
                            <div className="pm-church-name">Grace Reformed Fellowship</div>
                            <div className="pm-church-sub">Cape Town · Sun 09:30 AM</div>
                          </div>
                        </div>

                        <div className="pm-church-item">
                          <div className="pm-church-icon">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#0F172A" strokeWidth="2">
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </div>
                          <div>
                            <div className="pm-church-name">Assemblies of God Central</div>
                            <div className="pm-church-sub">Soweto · Sun 10:00 AM</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tab Navigation Pill (Rule 20) */}
                    <div className="pm-tabbar">
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                        </svg>
                        <span>Exegesis</span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                        <span>Reader</span>
                      </div>
                      <div className="pm-tab is-active">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>Churches</span>
                        <span className="pm-tab-dot"></span>
                      </div>
                      <div className="pm-tab">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Vault</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
