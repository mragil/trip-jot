import { test as base } from '@playwright/test';
import { setupMocks } from '../mocks/handlers';

export const test = base.extend({
  page: async ({ page }, use) => {
    
    
    if (process.env.E2E_MOCK === 'true') {
      console.log('Setting up mocks...');
      await setupMocks(page);
    }

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText));
    page.on('requestfinished', async request => {
        const response = await request.response();
        console.log('REQUEST FINISHED:', request.url(), response?.status());
    });
    
    await use(page);
  },
});

export { expect } from '@playwright/test';
