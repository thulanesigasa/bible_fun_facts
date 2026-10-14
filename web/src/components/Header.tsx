"use client";

import { useState, useEffect, useRef } from "react";
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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

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
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!toggleRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

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
                src="/logo.webp"
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
            ref={toggleRef}
            type="button"
            className={`hamburger ${open ? "is-active" : ""}`}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen((prev) => !prev)}
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

      {/* Compact dropdown; the page remains visible and scrollable below it. */}
      <nav
        ref={menuRef}
        id="mobile-nav-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={(e) => handleLink(e, href)}>
              {label}
            </a>
          ))}
          <a className="mobile-menu-waitlist" href="/#waitlist" onClick={(e) => handleLink(e, "/#waitlist")}>
            Join Waiting List <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </>
  );
}
