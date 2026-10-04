import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollBrandMark, ScrollSection } from '@/components/ScrollBrandMark';

/**
 * ── Rich Interactive Sub-Components ────────────────────────────
 */

function StrongsPreviewCard() {
  return (
    <div className="strongs-preview-box">
      <div className="strongs-preview-header">
        <div className="strongs-lemma-wrap">
          <span className="strongs-number-pill">G1834</span>
          <span className="strongs-lemma-greek">ἐξηγέоmai</span>
          <span className="strongs-translit">exēgéomai</span>
        </div>
        <span className="strongs-speech-badge">Verb · Middle Voice</span>
      </div>

      <div className="strongs-pronounce-row">
        <span className="pronounce-label">Phonetics:</span>
        <span className="pronounce-value">ex-ay-geh&apos;-om-ahee</span>
        <span className="pronounce-root">From G1537 (ek) + G2233 (hēgeomai)</span>
      </div>

      <p className="strongs-def-text">
        <strong>Definition:</strong> To lead out, unfold, declare, explain, and set forth with divine authority and thorough narrative clarity.
      </p>

      <div className="strongs-quote-card">
        <p className="strongs-verse-quote">
          &ldquo;No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath <em>declared [ἐξηγήσατο]</em> him.&rdquo;
        </p>
        <span className="strongs-verse-cite">John 1:18 · King James Version (KJV 1611)</span>
      </div>
    </div>
  );
}

function TranslationsMatrixCard() {
  const translations = [
    { code: 'ZUL', name: 'IBhayibheli Elingcwele', region: 'isiZulu (1959)' },
    { code: 'XHO', name: 'IBhayibhile Engcwele', region: 'isiXhosa (1996)' },
    { code: 'NSO', name: 'Bibele Taba ye Botse', region: 'Sepedi / Northern Sotho' },
    { code: 'AFR', name: 'Die Bybel', region: 'Afrikaans (1953 / 1983)' },
    { code: 'SNA', name: 'Bhaibheri Dzvene', region: 'ChiShona (Zimbabwe)' },
    { code: 'KJV', name: 'King James Version', region: 'Strong\'s Concordance (1611)' },
    { code: 'ESV', name: 'English Standard', region: 'Scholarly Literal' },
    { code: 'ASV', name: 'American Standard', region: 'Cross-Reference Edition' },
    { code: 'YLT', name: 'Young\'s Literal', region: 'Hebrew / Greek Verbal Tenses' },
    { code: 'WEB', name: 'World English Bible', region: 'Modern Public Domain' },
  ];

  return (
    <div className="translations-matrix-box">
      <div className="translations-matrix-heading">
        <span>Authentic African &amp; Global Translations (32 Embedded Offline)</span>
        <span className="offline-verified-badge">100% Offline SQLite</span>
      </div>
      <div className="translations-tags-grid">
        {translations.map((t) => (
          <div key={t.code} className="translation-tag-card">
            <span className="trans-code">{t.code}</span>
            <div className="trans-meta">
              <span className="trans-name">{t.name}</span>
              <span className="trans-region">{t.region}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheologyLensesCard() {
  return (
    <div className="theology-lenses-box">
      <div className="lens-item lens-historical">
        <div className="lens-header">
          <span className="lens-icon-marker" />
          <h4>1. Historical Lens</h4>
          <span className="lens-tag">Context</span>
        </div>
        <p>
          Archaeological discoveries, Second Temple Judaism, the Roman imperial hegemony, and Old Testament cultural chronology.
        </p>
      </div>

      <div className="lens-item lens-customs">
        <div className="lens-header">
          <span className="lens-icon-marker" />
          <h4>2. Ancient Customs Lens</h4>
          <span className="lens-tag">Culture</span>
        </div>
        <p>
          Near Eastern marriage rituals, shepherd covenant pacts, Hebrew idioms, festival shadows, and biblical hospitality.
        </p>
      </div>

      <div className="lens-item lens-theology">
        <div className="lens-header">
          <span className="lens-icon-marker" />
          <h4>3. Theology Lens</h4>
          <span className="lens-tag">Christocentric</span>
        </div>
        <p>
          Typological fulfillment in Christ, redemptive historical progression, apostolic doctrine, and practical personal devotion.
        </p>
      </div>
    </div>
  );
}

function SecurityPillarsCard() {
  return (
    <div className="security-pillars-box">
      <div className="sec-pillar">
        <div className="sec-icon-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="sec-info">
          <h5>Hardware Keystore</h5>
          <p>Keys isolated inside Android Keystore &amp; Apple Secure Enclave.</p>
        </div>
      </div>

      <div className="sec-pillar">
        <div className="sec-icon-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="sec-info">
          <h5>AES-256-CBC Encryption</h5>
          <p>Every private note is ciphered client-side before touching disk.</p>
        </div>
      </div>

      <div className="sec-pillar">
        <div className="sec-icon-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="sec-info">
          <h5>Zero Telemetry or Ads</h5>
          <p>Zero third-party tracking SDKs, data brokers, or commercial cookies.</p>
        </div>
      </div>
    </div>
  );
}

function ChurchDirectoryCard() {
  const churches = [
    { name: 'Spirit Embassy (GoodNews Church)', loc: 'Harare, Zimbabwe', coords: '-17.842234, 31.064743' },
    { name: 'ECG The Jesus Nation Church', loc: 'Lilongwe, Malawi', coords: '-13.961257, 33.799067' },
    { name: 'God Embassy', loc: 'Pretoria, South Africa', coords: '-25.794938, 27.991938' },
    { name: 'Christ Embassy (BLW)', loc: 'Lagos, Nigeria', coords: '6.599262, 3.365993' },
  ];

  return (
    <div className="churches-directory-box">
      <div className="churches-header">
        <span>Pre-Seeded Headquarters &amp; Physical GPS Coordinates</span>
        <span className="gps-pill">Zero API Keys Required</span>
      </div>
      <div className="churches-grid">
        {churches.map((c) => (
          <div key={c.name} className="church-card">
            <div className="church-main">
              <span className="church-title">{c.name}</span>
              <span className="church-loc">{c.loc}</span>
            </div>
            <span className="church-coords">{c.coords}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ── Sections Composition for ScrollBrandMark ────────────────────
 */

export default function Home() {
  const sections: ScrollSection[] = [
    // ── Section 1: Hero (Sacred Biblical Exegesis) ──
    {
      id: 'hero',
      badge: 'Sacred Biblical Exegesis · Strong\'s G1834',
      title: 'Unfold the Sacred',
      subtitle: 'Depth of Scripture',
      align: 'left',
      description:
        'exégeomai bridges original ancient Greek, Hebrew, and Aramaic manuscripts directly with your daily devotional contemplation. Named after Strong\'s Greek 1834 (ἐξηγέομαι — to declare, lead out, and reveal). 365 calendar-synchronized devotionals, 14,298 Strong\'s concordance entries, and 32 offline Bible translations secured by AES-256 hardware encryption.',
      actions: [
        {
          label: 'Download APK — v1.0.4',
          variant: 'primary',
          href: 'https://github.com/thulanesigasa/bible_fun_facts/releases/latest',
        },
        {
          label: 'Explore Features',
          variant: 'secondary',
          href: '/features',
        },
        {
          label: 'View on GitHub',
          variant: 'secondary',
          href: 'https://github.com/thulanesigasa/bible_fun_facts',
        },
      ],
      features: [
        {
          title: '100% Zero-Cloud Telemetry',
          description: 'Zero commercial analytics, advertising trackers, or profiling algorithms. Your spiritual walk remains private.',
          tag: 'Privacy First',
        },
        {
          title: 'Compiled Offline SQLite Database',
          description: 'All 14,298 Strong\'s entries and 32 complete Bible translations bundled natively with zero runtime quota.',
          tag: 'Zero Quota',
        },
        {
          title: 'Hardware-Backed AES-256',
          description: 'Android Keystore and Apple Secure Enclave hardware cryptography protects all private study reflections.',
          tag: 'AES-256',
        },
      ],
    },

    // ── Section 2: Strong's Lexicon (14,298 Lemmas) ──
    {
      id: 'strongs',
      badge: 'Original Language Concordance',
      title: '14,298 Lemmas',
      subtitle: 'Sub-10ms Full-Text Search',
      align: 'right',
      description:
        'Explore the original inspired languages without needing internet connectivity. Search 5,624 Greek entries and 8,674 Hebrew roots with morphology, etymology, phonetic pronunciation guides, and KJV canonical usage metrics.',
      actions: [
        {
          label: 'Launch Strong\'s Explorer',
          variant: 'primary',
          href: '/strongs',
        },
        {
          label: 'Read Lexicon Docs',
          variant: 'secondary',
          href: '/features',
        },
      ],
      extraNode: <StrongsPreviewCard />,
      features: [
        {
          title: 'Textus Receptus & Septuagint (LXX)',
          description: 'Complete Greek lemma index with grammatical inflections and KJV cross-references.',
          tag: 'Greek G1–G5624',
        },
        {
          title: 'Masoretic Hebrew Roots',
          description: 'Ancient Tanakh vocabulary indexed with primitive root etymologies and voweling.',
          tag: 'Hebrew H1–H8674',
        },
        {
          title: 'Sub-10ms SQLite FTS5 Match',
          description: 'Full-text search virtual tables compile substring, prefix, and wildcard queries in under 10 milliseconds.',
          tag: 'FTS5 Engine',
        },
        {
          title: 'Syllabic Audio Phonetics',
          description: 'Deterministic phonetic transcription (e.g. ex-ay-geh\'-om-ahee) calibrated to standard academic pronunciation.',
          tag: 'Phonetics',
        },
      ],
    },

    // ── Section 3: 32 Offline Bible Translations ──
    {
      id: 'translations',
      badge: 'Multilingual Global Canons',
      title: '32 Translations',
      subtitle: 'African & Scholarly Canons Offline',
      align: 'left',
      description:
        'Read, compare, and study side-by-side without cellular data or Wi-Fi. Featuring complete South African and Zimbabwean indigenous translations alongside historical and scholarly English editions.',
      actions: [
        {
          label: 'Compare Canons',
          variant: 'primary',
          href: '/features',
        },
        {
          label: 'Download Standalone APK',
          variant: 'secondary',
          href: 'https://github.com/thulanesigasa/bible_fun_facts/releases/latest',
        },
      ],
      extraNode: <TranslationsMatrixCard />,
      features: [
        {
          title: 'Indigenous South African & Zimbabwean Canons',
          description: 'IBhayibheli Elingcwele (isiZulu), isiXhosa 1996, Bibele (Sepedi), Afrikaans 1953/1983, Bhaibheri Dzvene (ChiShona).',
          tag: 'Indigenous',
        },
        {
          title: 'Scholarly English Editions',
          description: 'King James Version (1611 with Strong\'s tags), ESV, American Standard Version (ASV), Young\'s Literal Translation (YLT), World English Bible (WEB).',
          tag: 'Scholarly',
        },
        {
          title: 'Parallel Interlinear Reader',
          description: 'Synchronized dual-pane scrolling allows word-by-word comparison across translations and original languages.',
          tag: 'Interlinear',
        },
        {
          title: 'Zero Download Wait',
          description: 'All 32 complete canons are pre-compiled into local device SQLite storage — ready immediately upon installation.',
          tag: 'Offline First',
        },
      ],
    },

    // ── Section 4: 365 Exegetical Devotionals & Streak Engine ──
    {
      id: 'devotionals',
      badge: 'Daily Exegetical Sanctuary',
      title: '365 Devotionals',
      subtitle: 'Triple Theological Lens',
      align: 'right',
      description:
        'Each calendar day delivers an unbroken, in-depth scriptural journey examined through three scholarly lenses: Historical Context, Ancient Customs, and Deep Christocentric Theology.',
      actions: [
        {
          label: 'Explore Devotional Lenses',
          variant: 'primary',
          href: '/features',
        },
        {
          label: 'Learn About Streak Math',
          variant: 'secondary',
          href: '/faq',
        },
      ],
      extraNode: <TheologyLensesCard />,
      features: [
        {
          title: 'Historical Context Lens',
          description: 'Roman imperial politics, Second Temple history, Babylonian exile chronology, and archaeological validation.',
          tag: 'History',
        },
        {
          title: 'Ancient Customs & Culture Lens',
          description: 'Near Eastern marriage pacts, blood covenants, pastoral shepherd metaphors, and sacred festival rituals.',
          tag: 'Customs',
        },
        {
          title: 'Christocentric Theology Lens',
          description: 'Typological fulfillment in Christ, redemptive historical progression, apostolic doctrine, and spiritual applications.',
          tag: 'Theology',
        },
        {
          title: 'Deterministic Streak Math Engine',
          description: 'UTC-anchored daily consistency engine with automated clamp healing, Day 10 milestone recovery, and badge achievements.',
          tag: 'Streak Engine',
        },
      ],
    },

    // ── Section 5: Hardware Keystore Cryptography ──
    {
      id: 'security',
      badge: 'Hardware-Backed Privacy',
      title: 'AES-256 Security',
      subtitle: 'Zero Cloud Telemetry',
      align: 'left',
      description:
        'Your study journal, prayer requests, and private theological notes are encrypted locally with hardware-level security chips. Even with physical access to your device, your private study remains mathematically unreadable.',
      actions: [
        {
          label: 'View Security Architecture',
          variant: 'primary',
          href: '/security',
        },
        {
          label: 'Account Deletion Portal',
          variant: 'secondary',
          href: '/deletion',
        },
      ],
      extraNode: <SecurityPillarsCard />,
      features: [
        {
          title: 'AES-256-CBC Payload Encryption',
          description: 'Hardware-derived keys encrypt every study note before writing to local flash memory.',
          tag: 'Hardware Crypto',
        },
        {
          title: '4-Digit PIN & Biometric Lockout',
          description: 'Secure Store lockout screen with fingerprint/FaceID hardware authentication fallback.',
          tag: 'Biometric PIN',
        },
        {
          title: 'Zero Third-Party Tracking',
          description: 'No advertising SDKs, Facebook pixels, Google Analytics, or monetized telemetry libraries.',
          tag: 'Zero SDKs',
        },
        {
          title: 'GDPR & POPIA Compliance',
          description: 'Full self-service account deletion portal with permanent record purging.',
          tag: 'Compliance',
        },
      ],
    },

    // ── Section 6: Church Community & Branch Directory ──
    {
      id: 'community',
      badge: 'Faith Community Directory',
      title: 'Kingdom Community',
      subtitle: 'Pre-Seeded Branch Directory & Native GPS',
      align: 'center',
      description:
        'Locate authentic global ministries with exact GPS coordinates and drive directly using device-native Google Maps, Apple Maps, or Waze — requiring zero third-party billing keys.',
      actions: [
        {
          label: 'Download Standalone APK — v1.0.4',
          variant: 'primary',
          href: 'https://github.com/thulanesigasa/bible_fun_facts/releases/latest',
        },
        {
          label: 'Explore FAQ & Documentation',
          variant: 'secondary',
          href: '/faq',
        },
        {
          label: 'View Open Source Repository',
          variant: 'secondary',
          href: 'https://github.com/thulanesigasa/bible_fun_facts',
        },
      ],
      extraNode: <ChurchDirectoryCard />,
      features: [
        {
          title: 'Pre-Seeded Canonical Campuses',
          description: 'God Embassy (Pretoria), Christ Embassy (Lagos), Spirit Embassy (Harare), and ECG The Jesus Nation Church (Lilongwe).',
          tag: 'Headquarters',
        },
        {
          title: 'Direct Native GPS Navigation',
          description: 'One-tap navigation launches device-native GPS apps using precision latitude and longitude coordinates.',
          tag: 'Native GPS',
        },
        {
          title: 'Zero API Key Quotas',
          description: 'No Google Maps SDK keys or billable tile subscriptions; navigation works natively forever.',
          tag: 'Free Forever',
        },
        {
          title: '100% Free & Open Source',
          description: 'Permissively licensed under MIT. Contributions, pull requests, and forks are warmly welcomed.',
          tag: 'MIT License',
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main>
        <ScrollBrandMark sections={sections} />
      </main>
      <Footer />
    </>
  );
}
