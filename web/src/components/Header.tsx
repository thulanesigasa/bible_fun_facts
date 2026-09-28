'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuSvg } from './SvgIcons';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container nav-wrap">
        <Link href="/" className="brand-link" aria-label="exégeomai Home">
          <Image
            src="/assets/favicon.png"
            alt="exégeomai Logo"
            className="brand-logo"
            width={36}
            height={36}
            priority
          />
          <div>
            <span className="brand-name">exégeomai</span>
            <div className="brand-tagline">ἐξηγέομαι • Unfold the Word</div>
          </div>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileOpen}
        >
          <MenuSvg size={24} />
        </button>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <Link href="/features" className="nav-link" onClick={() => setMobileOpen(false)}>
              Features
            </Link>
          </li>
          <li>
            <Link href="/strongs" className="nav-link" onClick={() => setMobileOpen(false)}>
              Strong&apos;s Lexicon
            </Link>
          </li>
          <li>
            <Link href="/security" className="nav-link" onClick={() => setMobileOpen(false)}>
              Security &amp; Privacy
            </Link>
          </li>
          <li>
            <Link href="/faq" className="nav-link" onClick={() => setMobileOpen(false)}>
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/deletion" className="nav-link" onClick={() => setMobileOpen(false)}>
              Account Deletion
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="nav-link" onClick={() => setMobileOpen(false)}>
              Privacy Policy
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <a
            href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
            className="btn btn-accent"
            id="navDownloadBtn"
          >
            Download APK
          </a>
        </div>
      </div>
    </header>
  );
}
