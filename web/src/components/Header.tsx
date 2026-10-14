"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  return (
    <>
      {/* NAV BAR */}
      <nav className={`hdr-nav${scrolled ? " hdr-scrolled" : ""}`} aria-label="Main navigation">
        <div className="hdr-row">
          {/* Brand */}
          <Link
            href="/"
            className="hdr-brand"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setOpen(false);
              }
            }}
          >
            <Image src="/logo-transparent.png" alt="exégeomai" width={30} height={30} priority />
            <span>exégeomai</span>
          </Link>

          {/* Desktop links */}
          <div className="hdr-desktop">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="hdr-link" onClick={(e) => handleLink(e, href)}>
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hdr-cta-wrap">
            <a href="/#waitlist" className="hdr-cta" onClick={(e) => handleLink(e, "/#waitlist")}>
              Join Waiting List <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="hdr-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="hdr-mobile-menu"
            onClick={() => setOpen((p) => !p)}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU — conditionally rendered so it literally does not exist in DOM when closed */}
      {open && (
        <div id="hdr-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" className="hdr-mobile-menu">
          <div className="hdr-mobile-links">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="hdr-mobile-link" onClick={(e) => handleLink(e, href)}>
                <span>{label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ))}
            <a href="/#waitlist" className="hdr-mobile-cta" onClick={(e) => handleLink(e, "/#waitlist")}>
              Join Waiting List ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
