import { test, expect } from '@playwright/test';

test.describe('Admin Booking List', () => {
  test('unauthenticated user accessing /admin/bookings is redirected to /login', async ({ page }) => {
    await page.goto('/admin/bookings');
    await expect(page).toHaveURL(/\/login/);
  });

  test('staff can access booking list page after login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);

    await page.goto('/admin/bookings');
    await expect(page.locator('.booking-list')).toBeVisible();
  });

  test('booking list shows column headers', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await page.goto('/admin/bookings');
    await expect(page.getByText(/nama customer/i)).toBeVisible();
    await expect(page.getByText(/kendaraan/i)).toBeVisible();
    await expect(page.getByText(/jadwal/i)).toBeVisible();
  });

  test('admin page has link to booking list', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'staff@majumotor.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);

    await expect(page.getByRole('link', { name: /daftar booking/i })).toBeVisible();
  });
});
