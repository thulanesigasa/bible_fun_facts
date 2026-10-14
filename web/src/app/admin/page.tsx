import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, getAdminUser } from '@/lib/admin';
import { WaitlistDashboard } from '@/components/WaitlistDashboard';
export default async function AdminPage() {
  const user = await getAdminUser((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!user) redirect('/admin/login');
  return <WaitlistDashboard email={user.email} />;
}
