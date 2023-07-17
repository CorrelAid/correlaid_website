import {test, expect} from '@playwright/test';

// Currently all tests are skipped because the functionality
// is implemented with a service worker which only has
// experimental support in playwright (and needs to be activated
// with an env variable)
test.describe('test error pages', () => {
  test.skip('test pages root', async ({page}) => {
    await page.goto('/not-a-valid-path', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('/en/not-a-valid-path', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages blog', async ({page}) => {
    await page.goto('/blog/not-a-valid-post', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('/en/blog/not-a-valid-post', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages events', async ({page}) => {
    await page.goto('/veranstaltungen/not-a-valid-event', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('/en/events/not-a-valid-event', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages projects', async ({page}) => {
    await page.goto('/daten_nutzen/projektdatenbank/not-a-valid-project', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('/en/using-data/project-database/not-a-valid-project', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages correlaidx', async ({page}) => {
    await page.goto('/community/correlaidx/not-a-valid-lc', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('/en/community/correlaidx/not-a-valid-lc', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });
});
