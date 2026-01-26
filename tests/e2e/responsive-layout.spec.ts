import { test, expect } from './utils/mock-fixture';

test.describe('Responsive Layout Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Register a new user to ensure we are logged in
        const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
        await page.goto('/register');
        await page.fill('input[name="name"]', 'Responsive User');
        await page.fill('input[name="email"]', `resp${uniqueId}@example.com`);
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/trips/);
    });

    test('Mobile Layout (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        
        // Check for FAB
        const fab = page.locator('a[href="/trips/new-trip"] button.rounded-full');
        await expect(fab).toBeVisible();
        
        // Check standard button is hidden
        const standardButton = page.locator('div.hidden.md\\:flex a[href="/trips/new-trip"]');
        await expect(standardButton).toBeHidden();
        
        // Check card container is flex centered
        const container = page.locator('div.flex.flex-wrap.justify-center');
        await expect(container).toBeVisible();
    });

    test('Tablet Layout (768px)', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });

        // Check FAB is hidden
        const fab = page.locator('a[href="/trips/new-trip"].md\\:hidden');
        await expect(fab).toBeHidden();

        // Check standard button is visible
        const standardButton = page.locator('div.hidden.md\\:flex a[href="/trips/new-trip"]');
        await expect(standardButton).toBeVisible();
        
        // Check grid layout is active (grid class presence)
        const container = page.locator('div.md\\:grid.md\\:grid-cols-2');
        await expect(container).toBeVisible();
    });

    test('Desktop Layout (1280px)', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });

         // Check FAB is hidden
         const fab = page.locator('a[href="/trips/new-trip"].md\\:hidden');
         await expect(fab).toBeHidden();
 
         // Check standard button is visible
         const standardButton = page.locator('div.hidden.md\\:flex a[href="/trips/new-trip"]');
         await expect(standardButton).toBeVisible();

        // Check grid layout is active
        const container = page.locator('div.lg\\:grid-cols-3');
        await expect(container).toBeVisible();
    });
});
