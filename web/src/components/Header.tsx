'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navClasses = [
    'nav',
    isScrolled ? 'is-scrolled' : '',
    !isHomePage ? 'is-solid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClasses} aria-label="Main Navigation">
      <div className="nav-row">
        <Link href="/" className="brand" aria-label="exégeomai home">
          <span className="brand-mark" aria-hidden="true">
            <Image
              src="/assets/logo-transparent.png"
              alt="exégeomai Logo"
              width={28}
              height={28}
              priority
            />
          </span>
          <span>exégeomai</span>
        </Link>

        <div className="desktop-nav">
          <Link
            href="/"
            className="nav-link"
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            href="/features"
            className="nav-link"
            aria-current={pathname === '/features' ? 'page' : undefined}
          >
            Features
          </Link>
          <Link
            href="/how-it-works"
            className="nav-link"
            aria-current={pathname === '/how-it-works' ? 'page' : undefined}
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="nav-link"
            aria-current={pathname === '/pricing' ? 'page' : undefined}
          >
            Pricing
          </Link>
          <Link
            href="/safety"
            className="nav-link"
            aria-current={pathname === '/safety' || pathname === '/safety-and-trust' ? 'page' : undefined}
          >
            Safety
          </Link>
          <Link
            href="/about"
            className="nav-link"
            aria-current={pathname === '/about' ? 'page' : undefined}
          >
            About
          </Link>
          <Link
            href="/support"
            className="nav-link"
            aria-current={pathname === '/support' ? 'page' : undefined}
          >
            Support
          </Link>
          <Link
            href="/faq"
            className="nav-link"
            aria-current={pathname === '/faq' ? 'page' : undefined}
          >
            FAQ
          </Link>
        </div>

        <div className="nav-right">
          <a href="/#download" className="cta-btn">
            <span>Download App</span>
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v12" />
              <path d="m7 11 5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
          </a>
        </div>

        <button
          type="button"
          className={`burger ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
      </div>

      <div
        className={`mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}
        id="mobile-menu"
      >
        <div className="mobile-menu-links">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          <Link href="/features" aria-current={pathname === '/features' ? 'page' : undefined}>
            Features
          </Link>
          <Link href="/how-it-works" aria-current={pathname === '/how-it-works' ? 'page' : undefined}>
            How It Works
          </Link>
          <Link href="/pricing" aria-current={pathname === '/pricing' ? 'page' : undefined}>
            Pricing (100% Free)
          </Link>
          <Link href="/safety" aria-current={pathname === '/safety' ? 'page' : undefined}>
            Safety &amp; Trust
          </Link>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
            About Exégeomai
          </Link>
          <Link href="/support" aria-current={pathname === '/support' ? 'page' : undefined}>
            Support &amp; FAQ
          </Link>
          <Link href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>
            Contact Us
          </Link>
          <div className="mobile-menu-actions">
            <a href="/#download" className="cta-btn">
              Download App (APK)
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
