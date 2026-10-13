"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const links = [
  ["Home", "/"],
  ["Features", "/#features"],
  ["How It Works", "/#how-it-works"],
  ["About", "/#about"],
  ["FAQ", "/#faq"],
];
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
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
                alt=""
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
          <button
            ref={button}
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
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
