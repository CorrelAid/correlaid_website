import {test, expect} from '@playwright/test';

test.describe('test lc chapter pages', () => {
  test('lc city links use lower case names in url', async ({page}) => {
    await page.goto('/community/correlaidx', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Berlin'}).click();
    await page.waitForURL('**/community/correlaidx/berlin/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Berlin'})).toHaveCount(1);

    await page.goto('/community/correlaidx/', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Hamburg'}).click();
    await page.waitForURL('**/community/correlaidx/hamburg/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Hamburg'})).toHaveCount(1);

    await page.goto('/community/correlaidx/', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Rhein-Main'}).click();
    await page.waitForURL('**/community/correlaidx/rhein-main/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Rhein-Main'})).toHaveCount(
      1,
    );

    await page.goto('/en/community/correlaidx', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Berlin'}).click();
    await page.waitForURL('**/en/community/correlaidx/berlin/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Berlin'})).toHaveCount(1);
  });

  test('lc links in projects', async ({page}) => {
    await page.goto('/daten-nutzen/projekte/', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'CorrelAidX Mannheim'}).click();
    await page.waitForURL('**/community/correlaidx/mannheim/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Mannheim'})).toHaveCount(1);
  });
});
