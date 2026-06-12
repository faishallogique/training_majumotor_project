import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Maju Motor — Dealer Resmi",
  description:
    "Dealer otomotif PT Maju Motor. Lihat lineup kendaraan kami dan kunjungi showroom terdekat.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <header className="site-header">
          <div className="container">
            <div className="brand">
              MAJU<span>MOTOR</span>
            </div>
            <nav>Beranda</nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            © {new Date().getFullYear()} PT Maju Motor (fiktif) — project
            training internal LOGIQUE.
          </div>
        </footer>
      </body>
    </html>
  );
}
