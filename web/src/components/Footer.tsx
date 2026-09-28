import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="site-footer">
      <section className="footer-main">
        <section className="footer-brand">
          <Link href="/" className="brand">
            <Image
              src="/assets/favicon.png"
              alt=""
              width={30}
              height={30}
              className="brand-logo"
            />
            <span className="brand-name">exégeomai</span>
          </Link>
          <p>
            A scholarly React Native Bible app dedicated to opening the treasures
            of Scripture through sound linguistic, cultural, and historical exegesis.
          </p>
        </section>

        <nav className="footer-col" aria-label="Explore">
          <h4>Explore</h4>
          <ul>
            <li><Link href="/features">Core Features</Link></li>
            <li><Link href="/strongs">Strong&apos;s Lexicon</Link></li>
            <li><Link href="/security">Security Specs</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/deletion">Data Deletion</Link></li>
            <li>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT License
              </a>
            </li>
          </ul>
        </nav>

        <address className="footer-col" style={{ fontStyle: 'normal' }}>
          <h4>Distribution</h4>
          <ul>
            <li>
              <a href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest">
                Latest Release (v1.0.4)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a href="mailto:support@exegeomai.app">support@exegeomai.app</a>
            </li>
          </ul>
        </address>
      </section>

      <section className="footer-bottom">
        <small>&copy; 2026 exégeomai. Scripture resources in the public domain.</small>
        <small>v1.0.4 &nbsp;·&nbsp; Android &amp; iOS Standalone</small>
      </section>
    </footer>
  );
}
