import { defineConfig } from "vitest/config";
import path from "path";

// Konfigurasi minimal vitest untuk unit test fungsi murni (mis. lib/cars.ts).
// Alias "@" disamakan dengan tsconfig agar import "@/lib/..." jalan di test.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
  },
});
