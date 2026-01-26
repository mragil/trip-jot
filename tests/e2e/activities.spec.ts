import { test, expect } from './utils/mock-fixture';

test.describe('Activity Management (Mobile)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ page }) => {
        const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
        await page.goto('/register');
        await page.fill('input[name="name"]', 'Mobile User');
        await page.fill('input[name="email"]', `mobile${uniqueId}@example.com`);
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/trips/);

        await page.addStyleTag({ content: 'button[aria-label="Open TanStack Devtools"], .TanStackDevtools { display: none !important; }' });
        await page.locator('a[href="/trips/new-trip"]:visible').click({ force: true });
        await expect(page).toHaveURL(/\/trips\/new-trip/);
        await page.fill('input[name="name"]', 'Mobile Adv.');
        await page.fill('input[name="destination"]', 'Bali');
        await page.click('button:has-text("Pick a date")');
        await page.locator('.rdp-day:not(.rdp-day_hidden)').first().click(); 
        await page.keyboard.press('Escape');
        
        await page.click('button:has-text("Pick a date")');
        await page.locator('.rdp-day:not(.rdp-day_hidden)').nth(5).click(); 
        await page.keyboard.press('Escape');
        await page.click('button:has-text("Create Trip")');
        
        await page.click('text=Mobile Adv.');
    });

    test('should allow adding an activity in mobile view', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Mobile Adv.');

        const emptyStateButton = page.locator('button', { hasText: 'Add your first stop' });
        const addActivityButton = page.locator('button', { hasText: 'Add Activity' });

        if (await emptyStateButton.isVisible()) {
            await emptyStateButton.click();
        } else if (await addActivityButton.isVisible()) {
            await addActivityButton.first().click();
        } else {
             await page.click('button:has(.lucide-plus)'); 
        }

        await expect(page.locator('h2:has-text("Add Activity")')).toBeVisible();

        await page.fill('input[name="name"]', 'Surfing Lesson');
        await page.fill('input[name="location"]', 'Canggu Beach');
        await page.fill('input[name="startTime"]', '10:00');
        await page.fill('input[name="endTime"]', '12:00');
        await page.fill('input[name="cost"]', '500000');
        
        await page.click('button:has-text("Add Activity")');

        await expect(page.locator('h2:has-text("Add Activity")')).not.toBeVisible();

        await expect(page.locator('text=Surfing Lesson').first()).toBeVisible();
        await expect(page.locator('text=Canggu Beach').first()).toBeVisible();
    });
});
