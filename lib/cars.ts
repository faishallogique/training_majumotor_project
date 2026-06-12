// Daftar lineup mobil PT Maju Motor (fiktif — untuk keperluan training).
// Satu sumber data statis: dipakai homepage, dan nantinya dropdown form
// booking test drive (tiket TMM-3).

export interface Car {
  slug: string;
  name: string;
  type: string;
  priceFrom: string;
}

export const cars: Car[] = [
  { slug: "mm-city",    name: "MM City",    type: "City Car", priceFrom: "Rp 189 juta" },
  { slug: "mm-cruiser", name: "MM Cruiser", type: "SUV",      priceFrom: "Rp 388 juta" },
  { slug: "mm-family",  name: "MM Family",  type: "MPV",      priceFrom: "Rp 265 juta" },
  { slug: "mm-ev",      name: "MM EV One",  type: "Electric", priceFrom: "Rp 480 juta" },
];
