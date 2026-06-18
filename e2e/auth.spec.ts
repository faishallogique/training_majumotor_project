import { test, expect } from '@playwright/test';

test.describe('Staff Authentication', () => {
  test('AC-1: /admin redirect ke /login jika belum login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

  test('AC-2: login dengan kredensial benar masuk ke admin', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);
  });

  test('AC-3: login dengan kredensial salah tampil pesan error', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'salah');
    await page.click('button[type="submit"]');
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('AC-4: logged-in staff yang visit /login di-redirect ke /admin', async ({ page }) => {
    // Login dulu
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);

    // Visit /login lagi — harus redirect ke /admin
    await page.goto('/login');
    await expect(page).toHaveURL(/\/admin/);
  });

  test('AC-5: logout menghapus sesi dan redirect ke /login', async ({ page }) => {
    // Login dulu
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);

    // Logout
    await page.click('button[data-testid="logout"]');
    await expect(page).toHaveURL(/\/login/);

    // Verifikasi sesi sudah berakhir
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });
});
