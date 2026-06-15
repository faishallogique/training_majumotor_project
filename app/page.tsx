import { getFeaturedCars } from "@/lib/cars";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Temukan Mobil Impian Anda</h1>
          <p>
            PT Maju Motor — dealer resmi dengan lineup lengkap untuk kebutuhan
            keluarga dan bisnis Anda.
          </p>
        </div>
      </section>

      <section className="lineup">
        <div className="container">
          <h2>Lineup Kami</h2>
          <div className="car-grid">
            {getFeaturedCars().map((car) => (
              <div className="car-card" key={car.slug}>
                <h3>{car.name}</h3>
                <div className="type">{car.type}</div>
                <div className="price">mulai {car.priceFrom}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
