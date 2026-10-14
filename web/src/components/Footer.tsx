import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="exégeomai home">
              <span className="brand-mark" aria-hidden="true">
                <Image
                  src="/logo-transparent.png"
                  alt="exégeomai Holy Scripture and Exegesis logo"
                  width={28}
                  height={28}
                  loading="lazy"
                />
              </span>
              <span>exégeomai</span>
            </Link>
            <p>
              Scripture has depths. A new Bible study experience is coming —
              made for curiosity, understanding and a growing faith.
            </p>
          </div>

          <div>
            <div className="footer-col-title">PRODUCT</div>
            <div className="footer-links">
              <Link href="/#features">Features</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/waitlist-privacy">Waitlist Privacy</Link>
              <Link href="/#waitlist">Join Waiting List</Link>
              <Link href="/#faq">FAQ</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">COMPANY</div>
            <div className="footer-links">
              <Link href="/#about">About exégeomai</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/support">Support &amp; FAQ</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">SAFETY</div>
            <div className="footer-links">
              <Link href="/safety">Safety &amp; Trust</Link>
              <Link href="/safety-and-trust">Security Architecture</Link>
              <Link href="/community-guidelines">Community Guidelines</Link>
              <Link href="/report-a-problem">Report a Problem</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">SUPPORT</div>
            <div className="footer-links">
              <Link href="/help">Help Centre</Link>
              <Link href="/contact">Contact Support</Link>
              <Link href="/deletion">Account Deletion</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">LEGAL</div>
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/data-safety">Data Safety</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} exégeomai. Scripture has depths.
          </span>
          <span>
            Built for disciples, scholars, and local churches worldwide.
          </span>
        </div>
      </div>
    </footer>
  );
}
