'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuSvg } from './SvgIcons';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="exégeomai Home">
          <Image src="/assets/favicon.png" alt="" className="brand-logo" width={34} height={34} priority />
          <span>
            <span className="brand-name">exégeomai</span>
            <span className="brand-sub">ἐξηγέομαι · Unfold the Word</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <MenuSvg size={22} />
        </button>

        <nav aria-label="Site" className={open ? 'open' : ''}>
          <Link href="/features"  onClick={() => setOpen(false)}>Features</Link>
          <Link href="/strongs"   onClick={() => setOpen(false)}>Strong&apos;s Lexicon</Link>
          <Link href="/security"  onClick={() => setOpen(false)}>Security &amp; Privacy</Link>
          <Link href="/faq"       onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/deletion"  onClick={() => setOpen(false)}>Account Deletion</Link>
          <Link href="/privacy"   onClick={() => setOpen(false)}>Privacy</Link>
        </nav>

        <a
          href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
          className="header-cta"
          id="navDownloadBtn"
        >
          Download APK
        </a>
      </div>
    </header>
  );
}
