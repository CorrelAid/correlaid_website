import {test, expect} from '@playwright/test';

test.describe('test error pages', () => {
  test('test pages root', async ({page}) => {
    await page.goto('http://localhost:5173/not-a-valid-path', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*Fehler.*/, {
      ignoreCase: true,
    });

    await page.goto('http://localhost:5173/en/not-a-valid-path', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*error.*/, {
      ignoreCase: true,
    });
  });

  test('test pages blog', async ({page}) => {
    await page.goto('http://localhost:5173/blog/not-a-valid-post', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*Fehler.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*Blog.*/, {
      ignoreCase: true,
    });

    await page.goto('http://localhost:5173/en/blog/not-a-valid-post', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*Blog.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*error.*/, {
      ignoreCase: true,
    });
  });

  test('test pages events', async ({page}) => {
    await page.goto('http://localhost:5173/veranstaltungen/not-a-valid-event', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*Fehler.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*Veranstaltung.*/, {
      ignoreCase: true,
    });

    await page.goto('http://localhost:5173/en/events/not-a-valid-event', {
      waitUntil: 'networkidle',
    });
    await expect(page.locator('#grow')).toHaveText(/.*event.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*error.*/, {
      ignoreCase: true,
    });
  });

  test('test pages projects', async ({page}) => {
    await page.goto(
      'http://localhost:5173/daten_nutzen/projekte/not-a-valid-project',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*Fehler.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*Projekt.*/, {
      ignoreCase: true,
    });

    await page.goto(
      'http://localhost:5173/en/using_data/projects/not-a-valid-project',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*project.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*error.*/, {
      ignoreCase: true,
    });
  });

  test('test pages correlaidx', async ({page}) => {
    await page.goto(
      'http://localhost:5173/community/correlaidx/not-a-valid-lc',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*local chapter.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*fehler.*/, {
      ignoreCase: true,
    });

    await page.goto(
      'http://localhost:5173/en/community/correlaidx/not-a-valid-lc',
      {waitUntil: 'networkidle'},
    );
    await expect(page.locator('#grow')).toHaveText(/.*local chapter.*/, {
      ignoreCase: true,
    });
    await expect(page.locator('#grow')).toHaveText(/.*error.*/, {
      ignoreCase: true,
    });
  });
});
