'use client';
import { useState } from 'react';
export function AdminLogin() {
  const [error,setError]=useState('');const [busy,setBusy]=useState(false);
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();setError('');setBusy(true);
    const form=new FormData(event.currentTarget);
    try {
      const response=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:form.get('email'),password:form.get('password')}),credentials:'same-origin'});
      const result=await response.json();
      if(!response.ok){setError(result.error || 'Sign-in failed.');return;}
      window.location.assign('/admin');
    } catch {setError('Unable to connect. Please try again.');} finally{setBusy(false);}
  }
  return <main id="main" className="admin-page"><div className="admin-login-card">
    <p className="section-kicker">EXÉGEOMAI · ADMIN</p><h1>Welcome back.</h1><p>Sign in with an authorised, verified exégeomai account to monitor the launch waiting list.</p>
    <form onSubmit={submit}><label htmlFor="admin-email">Email address</label><input id="admin-email" name="email" type="email" autoComplete="username" required maxLength={254}/>
    <label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={1024}/>
    {error && <p role="alert" className="admin-error">{error}</p>}
    <button type="submit" className="admin-primary" disabled={busy}>{busy?'Signing in…':'Sign in to dashboard'}</button></form>
    <p className="admin-help">Access is granted by the site owner. There is no public admin signup.</p><a href="/">← Back to website</a>
  </div></main>;
}
