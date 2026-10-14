"use client";
import { useState } from "react";
import Image from "next/image";
const screens = [
  {
    label: "Discover",
    title: "Let curiosity lead.",
    copy: "Explore fascinating biblical facts and the passages behind them. There is always another detail to discover.",
  },
  {
    label: "Scripture",
    title: "Make room for the Word.",
    copy: "A calm reading experience that keeps Scripture at the centre. Pause, reflect and follow the connections.",
  },
  {
    label: "Original words",
    title: "Get closer to the meaning.",
    copy: "Look into Greek and Hebrew words with lexical definitions and pronunciation guides.",
  },
];
export function PreviewPhone({ screen = 0 }: { screen?: number }) {
  return (
    <div
      className={`launch-phone screen-${screen}`}
      role="img"
      aria-label={`Illustrative exégeomai ${screens[screen].label} screen`}
    >
      <div className="phone-display" aria-hidden="true">
        <div className="phone-status">
          <span>9:41</span>
          <i />
          <span>▰</span>
        </div>
        <div className="phone-brand">
          <Image
            src="/logo.webp"
            alt="exégeomai Holy Bible app logo"
            width={25}
            height={25}
            loading="lazy"
          />
          <b>exégeomai</b>
          <span className="phone-menu-icon" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", pointerEvents: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>
        </div>
        <div className="phone-body">
          {screen === 0 ? (
            <>
              <small>DISCOVER SOMETHING DEEPER</small>
              <p className="phone-heading">Did You Know?</p>
              <p className="phone-muted">Hidden treasures in Scripture</p>
              <div className="phone-streak">
                <span>YOUR STUDY JOURNEY</span>
                <b>One discovery at a time.</b>
              </div>
              <div className="phone-fact">
                <span className="phone-tag">WORDS OF SCRIPTURE</span>
                <p className="phone-subheading">
                  A name with
                  <br />a deeper meaning.
                </p>
                <p>
                  exégeomai comes from a Greek word meaning to explain or make
                  known.
                </p>
                <div className="phone-rule" />
                <b>John 1:18</b>
                <p>Explore the word behind our name.</p>
              </div>
              <div className="phone-action">
                Discover another fact <span>↗</span>
              </div>
            </>
          ) : screen === 1 ? (
            <>
              <small>THE BIBLE / KING JAMES VERSION</small>
              <p className="phone-heading">
                John <span className="chapter-pill">1</span>
              </p>
              <p className="phone-muted">The Word became flesh</p>
              <div className="phone-verse">
                <sup>1</sup> In the beginning was the Word, and the Word was
                with God, and the Word was God.
              </div>
              <div className="phone-verse">
                <sup>2</sup> The same was in the beginning with God.
              </div>
              <div className="phone-verse marked">
                <sup>3</sup> All things were made by him; and without him was
                not any thing made that was made.
              </div>
              <div className="phone-verse">
                <sup>4</sup> In him was life; and the life was the light of men.
              </div>
              <div className="phone-read-footer">
                JOHN 1 <span>READ · REFLECT · DISCOVER</span>
              </div>
            </>
          ) : (
            <>
              <small>STRONG&apos;S CONCORDANCE</small>
              <p className="phone-heading">Original words</p>
              <p className="phone-muted">A closer look at the Greek</p>
              <div className="phone-lexicon">
                <span className="phone-tag">G1834 · VERB</span>
                <p className="phone-subheading" lang="el">ἐξηγέομαι</p>
                <p>exēgeomai</p>
                <hr />
                <b>To explain. To make known.</b>
                <p>To recount or unfold in detail.</p>
              </div>
              <div className="phone-definition">
                <small>IN SCRIPTURE</small>
                <p>
                  “…he hath <mark>declared</mark> him.”
                </p>
                <b>John 1:18 · KJV</b>
              </div>
              <div className="phone-definition">
                <small>FOLLOW THE MEANING</small>
                <p>Explore words in their biblical context.</p>
              </div>
            </>
          )}
        </div>
        <div className="phone-tabs">
          <span className={screen === 0 ? "active" : ""}>Discover</span>
          <span className={screen === 1 ? "active" : ""}>Scripture</span>
          <span className={screen === 2 ? "active" : ""}>Words</span>
          <span>Saved</span>
        </div>
        <div className="phone-home" />
      </div>
    </div>
  );
}
export function PhoneTrio() {
  return (
    <div className="phone-trio" aria-label="A preview of exégeomai">
      <div className="trio-side trio-left">
        <PreviewPhone screen={0} />
      </div>
      <div className="trio-centre">
        <PreviewPhone screen={1} />
      </div>
      <div className="trio-side trio-right">
        <PreviewPhone screen={2} />
      </div>
    </div>
  );
}
export function AppPreview() {
  const [screen, setScreen] = useState(0);
  return (
    <div className="app-preview">
      <div className="preview-copy">
        <div
          className="preview-picker"
          role="group"
          aria-label="Choose an app preview"
        >
          {screens.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={screen === index}
              onClick={() => setScreen(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="preview-description" aria-live="polite">
          <span className="launch-kicker">
            0{screen + 1} / {screens[screen].label.toUpperCase()}
          </span>
          <h3>{screens[screen].title}</h3>
          <p>{screens[screen].copy}</p>
        </div>
        <a href="#waitlist" className="launch-text-link">
          Be first to hear about launch <span aria-hidden="true">↗</span>
        </a>
        <p className="preview-disclaimer">
          Illustrative app previews based on exégeomai&apos;s features and
          branding. Final screens may change.
        </p>
      </div>
      <div className="preview-stage">
        <div className="preview-orbit" aria-hidden="true" />
        <PreviewPhone screen={screen} />
      </div>
    </div>
  );
}
