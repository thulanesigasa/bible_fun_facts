'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <Link href="/" className="brand" aria-label="exégeomai Home">
        <Image
          src="/assets/favicon.png"
          alt=""
          className="brand-logo"
          width={34}
          height={34}
          priority
        />
        <span className="brand-info">
          <span className="brand-name">exégeomai</span>
          <span className="brand-sub">ἐξηγέομαι · Unfold the Word</span>
        </span>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        MENU
      </button>

      <nav className={`site-nav ${open ? 'open' : ''}`} aria-label="Site">
        <Link href="/features" onClick={() => setOpen(false)}>Features</Link>
        <Link href="/strongs" onClick={() => setOpen(false)}>Strong&apos;s Lexicon</Link>
        <Link href="/security" onClick={() => setOpen(false)}>Security &amp; Privacy</Link>
        <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
        <Link href="/deletion" onClick={() => setOpen(false)}>Account Deletion</Link>
      </nav>

      <a
        href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
        className="header-cta"
        id="navDownloadBtn"
      >
        Download APK
      </a>
    </header>
  );
}
