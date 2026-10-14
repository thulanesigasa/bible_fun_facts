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

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Smooth scroll for in-page links
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
      {/* Skip link */}
      <a
        href="#main"
        style={{
          position: "absolute",
          left: "-9999px",
          zIndex: 99999,
          padding: "8px 16px",
          background: "#FDD223",
          color: "#0F172A",
          fontWeight: 700,
        }}
      >
        Skip to content
      </a>

      {/* NAV BAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 76,
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          background: scrolled
            ? "rgba(255,255,255,0.98)"
            : "#FFFFFF",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
          backdropFilter: scrolled ? "blur(14px)" : "none",
        }}
        aria-label="Main navigation"
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 21,
              fontWeight: 700,
              color: "#0F172A",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setOpen(false);
              }
            }}
          >
            <Image
              src="/logo-transparent.png"
              alt="exégeomai"
              width={30}
              height={30}
              priority
              style={{ objectFit: "contain" }}
            />
            <span>exégeomai</span>
          </Link>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
            className="header-desktop-links"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleLink(e, href)}
                style={{
                  fontSize: 14.5,
                  fontWeight: 500,
                  color: "#0F172A",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="header-desktop-cta">
            <a
              href="/#waitlist"
              onClick={(e) => handleLink(e, "/#waitlist")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 600,
                background: "#FDD223",
                color: "#0F172A",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Join Waiting List <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Hamburger button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              flexShrink: 0,
              zIndex: 10002,
              position: "relative",
            }}
            className="header-hamburger"
          >
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ pointerEvents: "none", display: "block" }}
            >
              {open ? (
                // X icon
                <>
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </>
              ) : (
                // Hamburger icon
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

      {/* MOBILE MENU — position:fixed, driven by inline display so CSS can't hide it */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          display: open ? "flex" : "none",
          flexDirection: "column",
          position: "fixed",
          top: 76,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#FFFFFF",
          zIndex: 9999,
          overflowY: "auto",
          padding: "24px 20px 40px",
          gap: 8,
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleLink(e, href)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              fontSize: 17,
              fontWeight: 600,
              color: "#0F172A",
              textDecoration: "none",
              borderRadius: 12,
              background: "#F8FAFC",
              border: "1px solid rgba(15,23,42,0.06)",
            }}
          >
            {label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        ))}

        <a
          href="/#waitlist"
          onClick={(e) => handleLink(e, "/#waitlist")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "16px 20px",
            marginTop: 8,
            fontSize: 16,
            fontWeight: 700,
            color: "#0F172A",
            textDecoration: "none",
            borderRadius: 12,
            background: "#FDD223",
          }}
        >
          Join Waiting List ↗
        </a>
      </div>

      {/* Responsive CSS — hide hamburger on desktop, hide desktop links on mobile */}
      <style>{`
        @media (min-width: 1024px) {
          .header-hamburger { display: none !important; }
          #mobile-nav-menu { display: none !important; }
        }
        @media (max-width: 1023px) {
          .header-desktop-links { display: none !important; }
          .header-desktop-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
