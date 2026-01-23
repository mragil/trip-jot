import { test, expect } from '@playwright/test';

test.describe('Placeholder Pages', () => {

    test.beforeEach(async ({ page }) => {
        const uniqueId = Date.now();
        const email = `testuser${uniqueId}@example.com`;
        const name = 'Test User';

        await page.goto('/register');
        await page.fill('input[name="name"]', name);
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/trips/);
    });

	test('Explore page shows construction message', async ({ page }) => {
		await page.goto('/explore');
		await expect(page.getByText('Explore')).toBeVisible();
		await expect(page.getByText("We're building a way for you to discover amazing trips.")).toBeVisible();
		await expect(page.getByText('Back to Dashboard')).toBeVisible();
	});

	test('Profile page shows construction message', async ({ page }) => {
		await page.goto('/profile');
		await expect(page.getByText('Your Profile')).toBeVisible();
		await expect(page.getByText("Soon you'll be able to manage your account and preferences here.")).toBeVisible();
		await expect(page.getByText('Back to Dashboard')).toBeVisible();
	});

	test('Not found page shows 404 message', async ({ page }) => {
		await page.goto('/non-existent-route');
		await expect(page.getByText('Page Not Found')).toBeVisible();
		await expect(page.getByText("Sorry, we couldn't find the page you're looking for.")).toBeVisible();
		await expect(page.getByText('Back to Dashboard')).toBeVisible();
	});

	test('Back to Dashboard button works', async ({ page }) => {
		await page.goto('/explore');
		await page.getByText('Back to Dashboard').click();
		await expect(page).toHaveURL(/\/trips/);
	});
});
