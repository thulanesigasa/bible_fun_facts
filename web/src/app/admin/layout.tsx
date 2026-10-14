import type { Metadata } from 'next';
export const metadata: Metadata = { title: { absolute: 'Admin Dashboard | exégeomai' }, robots: { index: false, follow: false }, alternates: { canonical: null } };
export const dynamic = 'force-dynamic';
export default function AdminLayout({children}: {children:React.ReactNode}) { return children; }
