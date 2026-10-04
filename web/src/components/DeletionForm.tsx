'use client';

import React, { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function DeletionForm() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm) {
      setErrMsg('Please confirm you understand this action is irreversible.');
      return;
    }
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('/api/deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), reason }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const d = await res.json().catch(() => ({}));
        setErrMsg(d.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrMsg('Network error. Check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#0F172A" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontSize: 22, marginBottom: 8, color: 'var(--ink)' }}>Request Received</h3>
        <p style={{ color: 'var(--body-text)', fontSize: 15, maxWidth: 540, margin: '0 auto 16px' }}>
          Your deletion request has been submitted for <strong>{email}</strong>.
          You will receive a confirmation email within 24 hours. Your data will
          be fully purged within 30 days per GDPR Article 17.
        </p>
        <span style={{ fontSize: 13, color: 'var(--muted)', background: 'var(--surface-alt)', padding: '6px 12px', borderRadius: 4 }}>
          Reference ID: DEL-{Date.now().toString(36).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: 8, fontSize: 22 }}>Submit Deletion Request</h2>
      <p style={{ marginBottom: 24, fontSize: 14.5, color: 'var(--body-text)' }}>
        All fields marked * are required. Requests are verified and processed within 30 days.
      </p>

      <form onSubmit={handleSubmit} id="deletionRequestForm">
        <div className="form-group">
          <label htmlFor="deletionEmail" className="form-label">
            Email address associated with account *
          </label>
          <input
            id="deletionEmail"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deletionReason" className="form-label">
            Reason for deletion (optional)
          </label>
          <textarea
            id="deletionReason"
            rows={4}
            placeholder="Let us know why you are leaving — optional, but helps us improve."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="form-textarea"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, margin: '20px 0' }}>
          <input
            id="deletionConfirm"
            type="checkbox"
            checked={confirm}
            style={{ marginTop: 4, width: 16, height: 16, accentColor: 'var(--accent)' }}
            onChange={(e) => {
              setConfirm(e.target.checked);
              if (e.target.checked) setErrMsg('');
            }}
          />
          <label htmlFor="deletionConfirm" style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.5 }}>
            I understand this action is <strong>permanent and irreversible</strong>.
            All personal data, reading records, and notes will be permanently erased.
          </label>
        </div>

        {errMsg && (
          <div style={{ padding: '10px 14px', background: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--r-sm)', fontSize: 13.5, marginBottom: 20 }}>
            {errMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          id="submitDeletionBtn"
          disabled={status === 'loading'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>{status === 'loading' ? 'Submitting…' : 'Submit Deletion Request'}</span>
        </button>
      </form>
    </div>
  );
}
