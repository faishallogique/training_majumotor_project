'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cars } from '@/lib/cars';

type Step = 1 | 2 | 3;

type TimeSlot = {
  id: string;
  dateTime: string;
  capacity: number;
  booked: number;
};

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerKtp: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 2) {
      setSlotsLoading(true);
      fetch('/api/time-slots')
        .then((r) => r.json())
        .then((data) => setSlots(data.slots ?? []))
        .finally(() => setSlotsLoading(false));
    }
  }, [step]);

  function toggleVehicle(slug: string) {
    setSelectedVehicles((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 2) return prev;
      return [...prev, slug];
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        timeSlotId: selectedSlot,
        vehicleSlugs: selectedVehicles,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Terjadi kesalahan. Coba lagi.');
      setSubmitting(false);
      return;
    }

    const slotInfo = slots.find((s) => s.id === selectedSlot);
    const params = new URLSearchParams({
      bookingId: data.booking.id,
      name: form.customerName,
      vehicles: selectedVehicles.join(','),
      dateTime: slotInfo?.dateTime ?? '',
    });
    router.push(`/booking/confirmation?${params}`);
  }

  const stepLabels = ['1. Pilih Kendaraan', '2. Pilih Jadwal', '3. Data Diri'];

  return (
    <main className="booking-page">
      <div className="container">
        <h1>Booking Test Drive</h1>

        <div className="booking-steps">
          {stepLabels.map((label, i) => (
            <span key={label} className={step >= i + 1 ? 'active' : ''}>
              {label}
            </span>
          ))}
        </div>

        {step === 1 && (
          <div>
            <p>Pilih kendaraan yang ingin Anda test drive (maks. 2 unit)</p>
            <div className="vehicle-list">
              {cars.map((car) => {
                const isSelected = selectedVehicles.includes(car.slug);
                const isDisabled = !isSelected && selectedVehicles.length >= 2;
                return (
                  <div
                    key={car.slug}
                    className="vehicle-card"
                    data-selected={isSelected ? 'true' : 'false'}
                    data-disabled={isDisabled ? 'true' : 'false'}
                    onClick={() => toggleVehicle(car.slug)}
                  >
                    <h3>{car.name}</h3>
                    <p className="v-type">{car.type}</p>
                    <p className="v-price">{car.priceFrom}</p>
                    {isSelected && <span className="vehicle-selected-badge">Dipilih</span>}
                  </div>
                );
              })}
            </div>
            <button
              className="btn-booking"
              disabled={selectedVehicles.length === 0}
              onClick={() => setStep(2)}
            >
              Lanjut
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="booking-section-title">Pilih jadwal test drive</p>
            {slotsLoading && <p>Memuat jadwal...</p>}
            {!slotsLoading && slots.length === 0 && (
              <p>Tidak ada slot tersedia saat ini.</p>
            )}
            <div className="slot-list">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="slot-option"
                  data-selected={selectedSlot === slot.id ? 'true' : 'false'}
                  onClick={() => setSelectedSlot(slot.id)}
                >
                  <span className="slot-time">
                    {new Date(slot.dateTime).toLocaleString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="slot-avail">
                    Sisa {slot.capacity - slot.booked} tempat
                  </span>
                </div>
              ))}
            </div>
            <button
              className="btn-booking"
              disabled={!selectedSlot}
              onClick={() => setStep(3)}
            >
              Lanjut
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            {error && (
              <div className="booking-error" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="customerName">Nama Lengkap</label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="customerPhone">Nomor HP</label>
                <input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="customerEmail">Email</label>
                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="customerKtp">Nomor KTP</label>
                <input
                  id="customerKtp"
                  name="customerKtp"
                  type="text"
                  value={form.customerKtp}
                  onChange={(e) => setForm((f) => ({ ...f, customerKtp: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn-booking" disabled={submitting}>
                {submitting ? 'Memproses...' : 'Pesan Test Drive'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
