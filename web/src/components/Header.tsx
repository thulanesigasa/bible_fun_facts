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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [open]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = id;
        }
      }
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Fixed Sticky Nav Bar */}
      <nav
        className={`nav${scrolled ? " is-scrolled" : ""}`}
        aria-label="Main Navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 76,
          zIndex: 1000000,
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(255, 255, 255, 0.98)" : "#FFFFFF",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div
          className="nav-row"
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="brand"
            aria-label="exégeomai home"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setOpen(false);
              }
            }}
          >
            <span className="brand-mark" aria-hidden="true">
              <Image
                src="/logo-transparent.png"
                alt="exégeomai Logo"
                width={30}
                height={30}
                priority
              />
            </span>
            <span>exégeomai</span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="desktop-nav">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link"
                onClick={(e) => handleLink(e, href)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA (Hidden on Mobile) */}
          <div className="nav-right">
            <a
              href="/#waitlist"
              className="cta-btn"
              onClick={(e) => handleLink(e, "/#waitlist")}
            >
              <span>Join Waiting List</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Animated Hamburger Button (Visible on Mobile) */}
          <button
            type="button"
            className={`hamburger ${open ? "is-active" : ""}`}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              padding: 0,
              border: "none",
              background: "transparent",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              zIndex: 1000001,
              position: "relative",
            }}
          >
            <svg
              viewBox="0 0 32 32"
              width="32"
              height="32"
              aria-hidden="true"
              style={{ pointerEvents: "none", display: "block" }}
            >
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              />
              <path className="line" d="M7 16 27 16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu Overlay */}
      {open && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            top: 76,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#FFFFFF",
            zIndex: 999999,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px 20px 48px",
            borderTop: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxWidth: 480,
              margin: "0 auto",
              width: "100%",
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
                  border: "1px solid rgba(15, 23, 42, 0.06)",
                  touchAction: "manipulation",
                  transition: "background 0.15s ease",
                }}
              >
                <span>{label}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                >
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
                touchAction: "manipulation",
                boxShadow: "0 4px 14px rgba(253, 210, 35, 0.4)",
              }}
            >
              Join Waiting List <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
