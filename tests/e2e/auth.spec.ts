import { test, expect } from './utils/mock-fixture';

test.describe('Authentication', () => {
  test('should allow a user to register', async ({ page }) => {
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
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
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    const email = `loginuser${uniqueId}@example.com`;
    const password = 'password123';
    const name = 'Test User';
    
    await page.goto('/register');
    await page.fill('input[name="name"]', name);
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
    await expect(page.locator('h1')).toContainText(`Hi, ${name}`);
  });

  test('should redirect authenticated users from login page', async ({ page }) => {
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    const name = 'Test User';
    await page.goto('/register');
    await page.fill('input[name="name"]', name);
    await page.fill('input[name="email"]', `auth${uniqueId}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/trips/);

    await page.goto('/login');
    
    await expect(page).toHaveURL(/\/trips/);
  });


  test('should allow a user to logout', async ({ page }) => {
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    const name = 'Test User';
    await page.goto('/register');
    await page.fill('input[name="name"]', name);
    await page.fill('input[name="email"]', `logout${uniqueId}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/trips/);

    await page.click('[data-testid="user-menu-trigger"]');
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
    await page.click('[data-testid="logout-button"]');

    await expect(page).toHaveURL(/\/login/);
  });
});
