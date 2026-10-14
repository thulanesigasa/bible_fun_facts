'use client';
import { useCallback, useEffect, useState } from 'react';
import type { WaitlistStats } from '@/lib/admin';
const formatTime=(value:string)=>new Intl.DateTimeFormat('en-ZA',{dateStyle:'medium',timeStyle:'short',timeZone:'Africa/Johannesburg'}).format(new Date(value));
export function WaitlistDashboard({email}:{email:string}) {
  const [stats,setStats]=useState<WaitlistStats|null>(null);const [error,setError]=useState('');const [busy,setBusy]=useState(false);const [signingOut,setSigningOut]=useState(false);
  const load=useCallback(async(signal?:AbortSignal)=>{
    setBusy(true);
    try {const r=await fetch('/api/admin/waitlist',{cache:'no-store',credentials:'same-origin',signal});
      if(r.status===401){window.location.assign('/admin/login');return;}
      const data=await r.json();if(!r.ok)throw Error(data.error || 'Unable to load waiting-list data.');
      setStats(data);setError('');
    } catch(e){if(!signal?.aborted)setError(e instanceof Error?e.message:'Unable to load data.');}finally{if(!signal?.aborted)setBusy(false);}
  },[]);
  useEffect(()=>{const controller=new AbortController();let active=true;let timer:ReturnType<typeof setTimeout>;
    async function refresh(){await load(controller.signal);if(active)timer=setTimeout(refresh,30000);}void refresh();
    return()=>{active=false;controller.abort();clearTimeout(timer);};
  },[load]);
  async function logout(){setSigningOut(true);try{const r=await fetch('/api/admin/logout',{method:'POST',credentials:'same-origin'});if(!r.ok)throw Error('Unable to sign out. Please try again.');window.location.assign('/admin/login');}catch(e){setError(e instanceof Error?e.message:'Unable to sign out.');setSigningOut(false);}}
  const cards=stats?[['Total subscribers',stats.total,'Unique waiting-list email registrations'],['Joined today',stats.today,'Since midnight in South Africa'],['Last 7 days',stats.last7Days,'Today and the previous 6 calendar days'],['Last 30 days',stats.last30Days,'Today and the previous 29 calendar days']]:[];
  const max=Math.max(1,...(stats?.daily.map(d=>d.count)||[]));
  return <main id="main" className="admin-page"><div className="admin-wrap">
    <header className="admin-heading"><div><p className="section-kicker">EXÉGEOMAI · LAUNCH CONTROL</p><h1>Waiting list</h1><p>Monitor the people ready to discover what’s coming.</p></div><div className="admin-actions"><button onClick={()=>void load()} disabled={busy}>{busy?'Refreshing…':'Refresh'}</button><button onClick={()=>void logout()} disabled={signingOut}>{signingOut?'Signing out…':'Sign out'}</button></div></header>
    <p className="admin-account">Signed in as {email} · Dates and counts use South African time (SAST).</p>
    {error && <div role="alert" className="admin-error">{error}{stats && <p>Showing the last successful snapshot below. These numbers may be out of date.</p>}</div>}
    {!stats && !error && <p role="status">Loading live waiting-list data…</p>}
    {stats && <>
      <section className="admin-metrics" aria-label="Waiting-list totals">{cards.map(([label,value,note])=><article className="admin-stat" key={label}><h2>{label}</h2><p className="admin-number">{Number(value).toLocaleString('en-ZA')}</p><p>{note}</p></article>)}</section>
      <section className="admin-chart-card"><div className="admin-chart-heading"><div><h2>Daily signups</h2><p>Last 30 calendar days · duplicates do not increase the count</p></div><span className="admin-live">Refreshes every 30 seconds</span></div>
        {stats.last30Days===0 && <p className="admin-empty">No signups in the last 30 days. New registrations will appear here after a refresh.</p>}
        <div className="admin-chart" aria-hidden="true">{stats.daily.map(d=><div className="admin-bar-slot" key={d.date}><span title={`${d.date}: ${d.count}`} style={{height:`${d.count/max*100}%`}}/><small>{Number(d.date.slice(-2))}</small></div>)}</div>
        <details className="admin-data-table"><summary>View daily counts as a table</summary><table><caption>Daily waiting-list registrations in SAST</caption><thead><tr><th scope="col">Date</th><th scope="col">Signups</th></tr></thead><tbody>{stats.daily.map(d=><tr key={d.date}><th scope="row">{d.date}</th><td>{d.count}</td></tr>)}</tbody></table></details>
      </section>
      <div className="admin-footer"><p>Latest signup: <strong>{stats.latestSignup?formatTime(stats.latestSignup):'No subscribers yet'}</strong></p><p>Last updated: <time dateTime={stats.updatedAt}>{formatTime(stats.updatedAt)}</time>{error?' · Update failed':''}</p></div>
    </>}
  </div></main>;
}
