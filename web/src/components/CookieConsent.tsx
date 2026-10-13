"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "exegeomai_cookie_consent_v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so layout doesn't shift on immediate paint
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      className="cookie-banner"
      role="region"
      aria-label="Cookie and Privacy Preferences"
      aria-live="polite"
    >
      <div className="cookie-wrap">
        <div className="cookie-content">
          <p className="cookie-title">
            <strong>Privacy &amp; Cookie Preferences</strong>
          </p>
          <p className="cookie-text">
            We only use essential local storage to safeguard your session, waitlist confirmation, and reading preferences. We do not use third-party tracking or advertising cookies. Learn more in our{" "}
            <Link href="/privacy" className="cookie-link">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/data-safety" className="cookie-link">
              Data Safety declaration
            </Link>
            .
          </p>
        </div>
        <div className="cookie-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-essential"
            onClick={handleEssentialOnly}
          >
            Essential Only
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
          >
            Accept Preferences
          </button>
        </div>
      </div>
    </aside>
  );
}
