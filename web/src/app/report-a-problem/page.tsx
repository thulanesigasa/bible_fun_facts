'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ReportAProblemPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'bug',
    version: '1.0.4',
    device: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Issue Tracking</span>
            <h1>Report a Problem</h1>
            <p>
              Found a bug in the app, discovered an erratum in Strong’s Greek/Hebrew text,
              or identified an incorrect church listing? Let us know.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card" style={{ maxWidth: 760 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0F172A" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2>Issue Report Submitted</h2>
                  <p>
                    Thank you for helping us maintain the highest standard of scholarly and technical excellence!
                    We have logged your report and our engineering team will investigate.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', category: 'bug', version: '1.0.4', device: '', details: '' }); }}
                    className="btn-primary"
                    style={{ marginTop: 16 }}
                  >
                    Submit Another Report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Submit Problem Report</h2>
                  <p style={{ marginBottom: 28 }}>
                    For security vulnerabilities, you may also email{' '}
                    <a href="mailto:security@exegeomai.app" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                      security@exegeomai.app
                    </a> directly.
                  </p>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">Problem Category</label>
                    <select
                      id="category"
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="bug">Application Crash or Technical Bug</option>
                      <option value="lexicon">Strong’s Greek/Hebrew Lexicon Erratum</option>
                      <option value="translation">Translation Verse Discrepancy</option>
                      <option value="church">Church Listing Correction or Flag</option>
                      <option value="security">Security / Privacy Concern</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="details" className="form-label">Description &amp; Steps to Reproduce</label>
                    <textarea
                      id="details"
                      rows={5}
                      required
                      placeholder="Describe what occurred, expected outcome, or verse reference..."
                      className="form-textarea"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="device" className="form-label">Device Model &amp; Android Version</label>
                    <input
                      id="device"
                      type="text"
                      placeholder="e.g. Samsung Galaxy S23 (Android 14)"
                      className="form-input"
                      value={formData.device}
                      onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email (for updates)</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. researcher@seminary.edu"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                    <span>Submit Report</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
