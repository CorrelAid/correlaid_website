import {test, expect} from '@playwright/test';

test.describe('test lc chapter pages', () => {
  test('lc city links use lower case names in url', async ({page}) => {
    await page.goto('/community/correlaidx', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Berlin'}).click();
    await page.waitForURL('**/community/correlaidx/berlin/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Berlin'})).toHaveCount(1);

    await page.goto('http://localhost:5173/community/correlaidx/');
    await page.getByRole('link', {name: 'Hamburg'}).click();
    await page.waitForURL('**/community/correlaidx/hamburg/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Hamburg'})).toHaveCount(1);

    await page.goto('http://localhost:5173/community/correlaidx/');
    await page.getByRole('link', {name: 'Rhein-Main'}).click();
    await page.waitForURL('**/community/correlaidx/rhein-main/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Rhein-Main'})).toHaveCount(
      1,
    );
  });
});
