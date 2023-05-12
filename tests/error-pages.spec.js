import {test, expect} from '@playwright/test';

// Currently all tests are skipped because the functionality
// is implemented with a service worker which only has
// experimental support in playwright (and needs to be activated
// with an env variable)
test.describe('test error pages', () => {
  test.skip('test pages root', async ({page}) => {
    await page.goto('http://localhost:3000/not-a-valid-path', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('http://localhost:3000/en/not-a-valid-path', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages blog', async ({page}) => {
    await page.goto('http://localhost:3000/blog/not-a-valid-post', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('http://localhost:3000/en/blog/not-a-valid-post', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages events', async ({page}) => {
    await page.goto('http://localhost:3000/veranstaltungen/not-a-valid-event', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto('http://localhost:3000/en/events/not-a-valid-event', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages projects', async ({page}) => {
    await page.goto(
      'http://localhost:3000/daten_nutzen/projekte/not-a-valid-project',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto(
      'http://localhost:3000/en/using_data/projects/not-a-valid-project',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });

  test.skip('test pages correlaidx', async ({page}) => {
    await page.goto(
      'http://localhost:3000/community/correlaidx/not-a-valid-lc',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*nicht gefunden.*/, {
      ignoreCase: true,
    });

    await page.goto(
      'http://localhost:3000/en/community/correlaidx/not-a-valid-lc',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*not found.*/, {
      ignoreCase: true,
    });
  });
});
