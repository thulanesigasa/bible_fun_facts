'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="notus-navbar" id="top">
      <nav className="navbar-container" aria-label="Main Navigation">
        <Link href="/" className="navbar-brand">
          <Image
            src="/assets/favicon.png"
            alt=""
            width={24}
            height={24}
            className="navbar-brand-logo"
            priority
          />
          <span>exégeomai</span>
        </Link>

        <ul className="navbar-left-links" role="list">
          <li>
            <Link href="/features" className="navbar-link">
              Docs
            </Link>
          </li>
        </ul>

        <ul className="navbar-right-links" role="list">
          <li>
            <Link href="/features" className="navbar-link">
              Features
            </Link>
          </li>
          <li>
            <Link href="/strongs" className="navbar-link">
              Strong&apos;s
            </Link>
          </li>
          <li>
            <Link href="/security" className="navbar-link">
              Security
            </Link>
          </li>
          <li>
            <Link href="/faq" className="navbar-link">
              FAQ
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/thulanesigasa/bible_fun_facts"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-link"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
              className="btn-nav-download"
            >
              Download
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
