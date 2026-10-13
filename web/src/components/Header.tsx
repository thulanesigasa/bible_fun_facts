"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const links = [
  ["Home", "/"],
  ["About", "/#about"],
  ["Features", "/#features"],
  ["How It Works", "/#how-it-works"],
  ["FAQ", "/#faq"],
];
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <a href="#main" className="launch-skip">
        Skip to content
      </a>
      <nav
        className={`nav ${scrolled ? "is-scrolled" : ""} ${pathname !== "/" ? "is-solid" : ""}`}
        aria-label="Main navigation"
      >
        <div className="nav-row">
          <Link href="/" className="brand" aria-label="exégeomai home">
            <span className="brand-mark" aria-hidden="true">
              <Image
                src="/logo-transparent.png"
                alt="exégeomai Holy Bible logo mark"
                width={30}
                height={30}
                priority
              />
            </span>
            <span>exégeomai</span>
          </Link>
          <div className="desktop-nav">
            {links.map(([label, href]) => (
              <Link
                key={label}
                className="nav-link"
                href={href}
                aria-current={
                  href === "/" && pathname === "/" ? "page" : undefined
                }
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <a href="/#waitlist" className="cta-btn">
              Join Waiting List <span aria-hidden="true">↗</span>
            </a>
          </div>
          <label className="hamburger" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
            <input
              ref={button}
              type="checkbox"
              checked={open}
              onChange={(e) => setOpen(e.target.checked)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            />
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              />
              <path className="line" d="M7 16 27 16" />
            </svg>
          </label>
        </div>
        {open && (
          <div className="mobile-menu is-open" id="mobile-menu">
            <div className="mobile-menu-links">
              {links.map(([label, href]) => (
                <Link key={label} href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ))}
              <a
                href="/#waitlist"
                className="cta-btn"
                onClick={() => setOpen(false)}
              >
                Join Waiting List ↗
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
