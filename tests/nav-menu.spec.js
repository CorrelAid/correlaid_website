import {test, expect} from '@playwright/test';

test.describe('test regular viewport', () => {
  test('test english button', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'});
    await page.getByRole('button', {name: 'Sprache wechseln'}).click();
    await page.getByRole('menuitem', {name: 'English'}).waitFor();
    await page.getByRole('menuitem', {name: 'English'}).click();
    await page.waitForURL('**/en/', {waitUntil: 'networkidle'});
    await expect(page).toHaveURL(/.*en.*/);
  });

  test('test sub menu in bottom nav', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'});
    await page.getByRole('link', {name: 'Über uns'}).hover();
    await page.getByRole('link', {name: 'Partner'}).click();
    await expect(page.getByRole('link', {name: 'Über uns'})).toHaveCSS(
      'color',
      'rgb(56, 99, 162)',
    );
  });
});

test.describe('test iPhone SE viewport', () => {
  test.use({viewport: {width: 375, height: 667}});

  test('mobile nav menu', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'});
    await page.getByRole('button').click();
    await page
      .getByRole('navigation', {name: 'Main'})
      .getByRole('link', {name: 'Blog'})
      .click();
    await page.waitForNavigation({url: '**/blog/'});
    await expect(page).toHaveURL(/.*blog.*/);
  });
});
