'use client';

import React, { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function DeletionForm() {
  const [email, setEmail]     = useState('');
  const [reason, setReason]   = useState('');
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus]   = useState<Status>('idle');
  const [errMsg, setErrMsg]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm) { setErrMsg('Please confirm you understand this action is irreversible.'); return; }
    setStatus('loading'); setErrMsg('');

    try {
      const res = await fetch('/api/deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), reason }),
      });
      if (res.ok) { setStatus('success'); }
      else {
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
      <article className="form-success">
        <h3>Request Received</h3>
        <p>
          Your deletion request has been submitted for <strong>{email}</strong>.
          You will receive a confirmation email within 24 hours. Your data will
          be fully purged within 30 days.
        </p>
        <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
          Reference ID: DEL-{Date.now().toString(36).toUpperCase()}
        </p>
      </article>
    );
  }

  return (
    <section className="form-block">
      <h2 style={{ marginBottom: '8px', fontSize: '1.3rem' }}>Submit Deletion Request</h2>
      <p style={{ marginBottom: '32px', fontSize: '14px' }}>
        All fields marked * are required. Requests are processed within 30 days.
      </p>

      <form onSubmit={handleSubmit} id="deletionRequestForm">
        <fieldset>
          <legend className="sr-only">Deletion request details</legend>

          <div className="field">
            <label htmlFor="deletionEmail">Email address associated with your account *</label>
            <input
              id="deletionEmail"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="deletionReason">Reason for deletion (optional)</label>
            <textarea
              id="deletionReason"
              rows={4}
              placeholder="Let us know why you're leaving — optional, but helps us improve."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <label className="field-check" htmlFor="deletionConfirm">
            <input
              id="deletionConfirm"
              type="checkbox"
              checked={confirm}
              onChange={(e) => { setConfirm(e.target.checked); if (e.target.checked) setErrMsg(''); }}
            />
            I understand this action is <strong>&nbsp;permanent and irreversible</strong>. All my
            data will be deleted within 30 days and cannot be recovered.
          </label>

          {errMsg && <p className="form-error" role="alert">{errMsg}</p>}

          <p className="notice">
            Your request will be verified against our records. You will receive a confirmation
            email before deletion begins. If you registered via Google Sign-In, use your
            Google account email address.
          </p>

          <button
            type="submit"
            className="btn btn-primary"
            id="submitDeletionBtn"
            disabled={status === 'loading'}
            style={{ marginTop: '8px' }}
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Deletion Request'}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
