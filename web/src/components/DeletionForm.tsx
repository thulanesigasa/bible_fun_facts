'use client';

import React, { useState } from 'react';
import { TrashSvg, CheckSvg } from './SvgIcons';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function DeletionForm() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm) {
      setErrorMsg('Please confirm you understand this action is irreversible.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), reason }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="deletion-portal">
        <div className="deletion-success">
          <div className="deletion-success-icon">
            <CheckSvg size={28} color="var(--text-primary)" />
          </div>
          <h3>Request Received</h3>
          <p>
            Your data deletion request has been submitted. You will receive a confirmation
            email at <strong>{email}</strong> within 24 hours. Your data will be fully
            purged within 30 days.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Reference ID: DEL-{Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="deletion-portal">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div className="security-icon-large">
          <TrashSvg size={22} />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>Submit Deletion Request</h3>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            All fields are required. Requests are processed within 30 days.
          </p>
        </div>
      </div>

      <form className="deletion-form" onSubmit={handleSubmit} id="deletionRequestForm">
        <div className="form-group">
          <label className="form-label" htmlFor="deletionEmail">
            Email Address associated with your account *
          </label>
          <input
            id="deletionEmail"
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="deletionReason">
            Reason for deletion (optional)
          </label>
          <textarea
            id="deletionReason"
            className="form-input"
            rows={4}
            placeholder="Let us know why you're leaving — optional, but helps us improve."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="form-group">
          <label className="form-checkbox-label" htmlFor="deletionConfirm">
            <input
              id="deletionConfirm"
              type="checkbox"
              checked={confirm}
              onChange={(e) => {
                setConfirm(e.target.checked);
                if (e.target.checked) setErrorMsg('');
              }}
            />
            <span>
              I understand that this action is <strong>permanent and irreversible</strong>. All
              my data will be deleted within 30 days and cannot be recovered.
            </span>
          </label>
        </div>

        {errorMsg && (
          <div className="form-error" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="deletion-notice">
          Your request will be verified against our records. You will receive a
          confirmation email before deletion begins. If you registered via Google
          Sign-In, use your Google account email address.
        </div>

        <button
          type="submit"
          className="btn btn-accent btn-lg"
          id="submitDeletionBtn"
          disabled={status === 'loading'}
          style={{ alignSelf: 'flex-start' }}
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Deletion Request'}
        </button>
      </form>
    </div>
  );
}
