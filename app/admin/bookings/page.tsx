'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cars } from '@/lib/cars';

type BookingVehicle = { id: string; vehicleSlug: string };
type TimeSlot = { id: string; dateTime: string };
type Booking = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerKtp: string;
  createdAt: string;
  vehicles: BookingVehicle[];
  timeSlot: TimeSlot;
};

function vehicleName(slug: string) {
  return cars.find((c) => c.slug === slug)?.name ?? slug;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Daftar Booking Test Drive</h1>
          <p style={{ color: '#666', marginTop: '0.25rem', fontSize: '0.9rem' }}>
            Data masuk secara otomatis — read only
          </p>
        </div>
        <Link href="/admin" className="btn-logout">
          ← Kembali
        </Link>
      </div>

      {loading && <p style={{ color: '#666' }}>Memuat data...</p>}

      {!loading && (
        <div className="booking-list">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Nama Customer</th>
                <th>Nomor HP</th>
                <th>Kendaraan</th>
                <th>Jadwal</th>
                <th>Tanggal Booking</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="booking-empty">
                    Belum ada booking yang masuk.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.customerName}</td>
                    <td>{b.customerPhone}</td>
                    <td>{b.vehicles.map((v) => vehicleName(v.vehicleSlug)).join(', ')}</td>
                    <td>
                      {new Date(b.timeSlot.dateTime).toLocaleString('id-ID', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>
                      {new Date(b.createdAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
