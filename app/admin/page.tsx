'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <main className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Portal Admin — PT Maju Motor</h1>
        <button
          data-testid="logout"
          onClick={handleLogout}
          className="btn-logout"
        >
          Logout
        </button>
      </div>
      <div className="admin-menu">
        <Link href="/admin/bookings" className="admin-menu-card">
          <h2>Daftar Booking</h2>
          <p>Pantau booking test drive yang masuk dari customer.</p>
        </Link>
      </div>
    </main>
  );
}
