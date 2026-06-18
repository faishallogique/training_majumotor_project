import { test, expect } from '@playwright/test';

test.describe('Booking Test Drive', () => {
  test('booking page shows vehicle list', async ({ page }) => {
    await page.goto('/booking');
    await expect(page.locator('.vehicle-list')).toBeVisible();
    await expect(page.locator('.vehicle-card')).toHaveCount(4);
  });

  test('customer can select a vehicle', async ({ page }) => {
    await page.goto('/booking');
    await page.locator('.vehicle-card').first().click();
    await expect(page.locator('.vehicle-card').first()).toHaveAttribute('data-selected', 'true');
  });

  test('customer cannot select more than 2 vehicles', async ({ page }) => {
    await page.goto('/booking');

    await page.locator('.vehicle-card').nth(0).click();
    await page.locator('.vehicle-card').nth(1).click();

    const thirdCard = page.locator('.vehicle-card').nth(2);
    await thirdCard.click();

    await expect(thirdCard).not.toHaveAttribute('data-selected', 'true');
    await expect(page.locator('.vehicle-card[data-selected="true"]')).toHaveCount(2);
  });

  test('shows available time slots after vehicle selection', async ({ page }) => {
    await page.goto('/booking');

    await page.locator('.vehicle-card').first().click();
    await page.getByRole('button', { name: /lanjut/i }).click();

    await expect(page.locator('.slot-list')).toBeVisible();
    await expect(page.locator('.slot-option')).toHaveCount.bind(expect)(1);
  });

  test('completes booking and shows confirmation page', async ({ page }) => {
    await page.goto('/booking');

    // Step 1: select vehicle
    await page.locator('.vehicle-card').first().click();
    await page.getByRole('button', { name: /lanjut/i }).click();

    // Step 2: select time slot
    await expect(page.locator('.slot-option').first()).toBeVisible();
    await page.locator('.slot-option').first().click();
    await page.getByRole('button', { name: /lanjut/i }).click();

    // Step 3: fill customer data
    await page.fill('input[name="customerName"]', 'Budi Santoso');
    await page.fill('input[name="customerPhone"]', '081234567890');
    await page.fill('input[name="customerEmail"]', 'budi@example.com');
    await page.fill('input[name="customerKtp"]', '3201234567890001');
    await page.getByRole('button', { name: /pesan test drive/i }).click();

    // Should land on confirmation page
    await expect(page).toHaveURL(/\/booking\/confirmation/);
    await expect(page.getByText('Budi Santoso')).toBeVisible();
  });
});
