import { test as base } from '@playwright/test';
import { setupMocks } from '../mocks/handlers';

export const test = base.extend({
  page: async ({ page }, use) => {
    // If E2E_MOCK env var is set, setup mocks
    if (process.env.E2E_MOCK === 'true') {
      await setupMocks(page);
    }
    
    await use(page);
  },
});

export { expect } from '@playwright/test';
