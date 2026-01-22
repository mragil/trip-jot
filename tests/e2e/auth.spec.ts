import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should allow a user to register', async ({ page }) => {
    const uniqueId = Date.now();
    const email = `testuser${uniqueId}@example.com`;
    const name = 'Test User';

    await page.goto('/register');
    
    await page.fill('input[name="name"]', name);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/trips/);
    await expect(page.locator('h1')).toContainText(`Hi, ${name}`);
  });

  test('should allow a used to login', async ({ page }) => {
    const uniqueId = Date.now();
    const email = `loginuser${uniqueId}@example.com`;
    const password = 'password123';
    
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Login User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/trips/);

    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.goto('/login');

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/trips/);
    await expect(page.locator('h1')).toContainText('Hi, Login User');
  });

  test('should redirect authenticated users from login page', async ({ page }) => {
    const uniqueId = Date.now();
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Auth User');
    await page.fill('input[name="email"]', `auth${uniqueId}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/trips/);

    await page.goto('/login');
    
    await expect(page).toHaveURL(/\/trips/);
  });
});
