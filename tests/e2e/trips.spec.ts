import { test, expect } from '@playwright/test';

test.describe('Trip Management', () => {
  test.beforeEach(async ({ page }) => {
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Trip Master');
    await page.fill('input[name="email"]', `tripmaster${uniqueId}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/trips/);
  });

  test('should allow user to create a new trip', async ({ page }) => {
    await page.click('a[href="/trips/new-trip"]');
    await expect(page).toHaveURL(/\/trips\/new-trip/);

    const tripName = 'Test Trip to Paris';
    const destination = 'Paris, France';

    await page.fill('input[name="name"]', tripName);
    await page.fill('input[name="destination"]', destination);

    await page.click('button:has-text("Pick a date")');
    await page.locator('.rdp-day').first().click(); 
    await page.keyboard.press('Escape');
    
    await page.click('button:has-text("Pick a date")');
    await page.locator('.rdp-day').last().click(); 
    await page.keyboard.press('Escape');

    await page.click('button:has-text("Create Trip")');

    await expect(page).toHaveURL(/\/trips$/);
    
    await expect(page.locator('text=' + tripName)).toBeVisible();
    await expect(page.locator('text=' + destination)).toBeVisible();
  });

  test('should allow user to view trip details', async ({ page }) => {
    await page.click('a[href="/trips/new-trip"]');
    await expect(page).toHaveURL(/\/trips\/new-trip/);
    await page.fill('input[name="name"]', 'Details Trip');
    await page.fill('input[name="destination"]', 'Tokyo');
    await page.click('button:has-text("Pick a date")'); 
    await page.locator('.rdp-day').first().click(); 
    await page.keyboard.press('Escape');
    
    await page.click('button:has-text("Pick a date")');
    await page.locator('.rdp-day').last().click();
    await page.keyboard.press('Escape');
    
    await page.click('button:has-text("Create Trip")');

    await page.click('text=Details Trip');

    await expect(page).toHaveURL(/\/trips\/\d+/);
    await expect(page.locator('h1')).toContainText('Details Trip');
  });
});
