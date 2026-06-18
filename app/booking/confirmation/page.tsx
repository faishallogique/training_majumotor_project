import Link from 'next/link';
import { cars } from '@/lib/cars';

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { bookingId?: string; name?: string; vehicles?: string; dateTime?: string };
}) {
  const { bookingId, name, vehicles, dateTime } = searchParams;

  const vehicleSlugs = vehicles?.split(',').filter(Boolean) ?? [];
  const vehicleNames = vehicleSlugs.map(
    (slug) => cars.find((c) => c.slug === slug)?.name ?? slug
  );

  const formattedDate = dateTime
    ? new Date(dateTime).toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

  return (
    <main className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <h1>Booking Terkonfirmasi!</h1>
          <p>
            Terima kasih, <strong>{name}</strong>. Booking test drive Anda telah berhasil
            dikonfirmasi.
          </p>

          <div className="confirmation-details">
            <div className="confirmation-item">
              <span className="label">ID Booking</span>
              <span data-testid="booking-id">{bookingId}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">Nama</span>
              <span data-testid="customer-name">{name}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">Kendaraan</span>
              <span>{vehicleNames.join(', ')}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">Jadwal</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="confirmation-note">
            Screenshot halaman ini sebagai bukti booking Anda. Tim kami akan menghubungi Anda
            sebelum jadwal test drive.
          </div>

          <Link href="/" className="btn-booking-outline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
