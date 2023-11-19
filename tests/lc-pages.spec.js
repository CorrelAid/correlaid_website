import {test, expect} from '@playwright/test';

test.describe('test lc chapter pages', () => {
  test('lc city links use lower case names in url', async ({page}) => {
    await page.goto('/mitmachen/correlaidx', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Berlin'}).click();
    await page.waitForURL('**/mitmachen/correlaidx/berlin/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Berlin'})).toHaveCount(1);

    await page.goto('/mitmachen/correlaidx/', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Hamburg'}).click();
    await page.waitForURL('**/mitmachen/correlaidx/hamburg/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Hamburg'})).toHaveCount(1);

    await page.goto('/mitmachen/correlaidx/', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Rhein-Main'}).click();
    await page.waitForURL('**/mitmachen/correlaidx/rheinmain/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Rhein-Main'})).toHaveCount(
      1,
    );

    await page.goto('/en/volunteering/correlaidx', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Berlin'}).click();
    await page.waitForURL('**/en/volunteering/correlaidx/berlin/', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByRole('heading', {name: 'Berlin'})).toHaveCount(1);
  });

  test('lc links in projects', async ({page}) => {
    await page.goto('/daten-nutzen/projektdatenbank/', {
      waitUntil: 'networkidle',
    });
    await page.getByRole('link', {name: 'CorrelAidX Mannheim'}).first().click();
    await page.waitForURL('**/mitmachen/correlaidx/mannheim/', {
      waitUntil: 'networkidle',
    });
    await expect(
      page.getByRole('heading', {name: 'Mannheim', exact: true}),
    ).toHaveCount(1);
  });
});
