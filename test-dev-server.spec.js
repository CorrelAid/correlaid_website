import {test, expect} from '@playwright/test';

test('test checkbox on dev server', async ({page}) => {
  // Go to dev server instead of static
  await page.goto('http://localhost:5173/daten-nutzen/projektdatenbank/', {
    waitUntil: 'networkidle',
  });

  // Check if filter is already visible
  const filterSection = page.locator('#filter');
  const isVisible = await filterSection.isVisible();

  if (!isVisible) {
    await page.getByRole('button', {name: 'Filter'}).click();
  }

  // Find and click the checkbox
  const teamSelectionCheckbox = page.getByRole('checkbox').first();
  await expect(teamSelectionCheckbox).toBeVisible();

  // Click the checkbox
  await teamSelectionCheckbox.click();

  // Wait a bit for debounced URL update
  await page.waitForTimeout(200);

  // Check if URL was updated
  const url = page.url();
  console.log('URL after checkbox click:', url);

  // Check for console errors
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.waitForTimeout(1000);

  if (errors.length > 0) {
    console.log('Console errors:', errors);
  }

  expect(
    errors.filter((e) => e.includes('Too many calls to Location')),
  ).toHaveLength(0);
});
