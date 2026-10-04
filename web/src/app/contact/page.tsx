'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
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
            <span className="section-kicker">Get in Touch</span>
            <h1>Contact Support &amp; Ministry</h1>
            <p>
              Have a question, feedback, church ministry recommendation, or lexical correction?
              We would love to hear from you.
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
                  <h2>Message Received</h2>
                  <p>
                    Thank you for contacting us! Your inquiry has been logged and our team will get back to you at{' '}
                    <strong>{formData.email}</strong> as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', topic: 'general', message: '' }); }}
                    className="btn-primary"
                    style={{ marginTop: 16 }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Send Us a Message</h2>
                  <p style={{ marginBottom: 28 }}>
                    Fill out the form below or email us directly at{' '}
                    <a href="mailto:support@exegeomai.app" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                      support@exegeomai.app
                    </a>.
                  </p>

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Johnathan Edwards"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. pastor@gracefellowship.org"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="topic" className="form-label">Inquiry Topic</label>
                    <select
                      id="topic"
                      className="form-select"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="lexicon">Strong’s Lexicon or Translation Errata</option>
                      <option value="church">Church Ministry Directory Addition</option>
                      <option value="technical">Technical Support / App Crash</option>
                      <option value="security">Security Vulnerability Disclosure</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Please provide details, references, or context..."
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                    <span>Submit Message</span>
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
