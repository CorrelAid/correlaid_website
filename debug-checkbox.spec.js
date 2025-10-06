import {test, expect} from '@playwright/test';

test('debug checkbox visibility', async ({page}) => {
  await page.goto('/daten-nutzen/projektdatenbank/', {
    waitUntil: 'networkidle',
  });

  // Click filter to expand
  await page.getByRole('button', {name: 'Filter'}).click();

  // Take a screenshot
  await page.screenshot({path: 'debug-filter.png'});

  // Check what's in the filter section
  const filterSection = page.locator('#filter');
  await expect(filterSection).toBeVisible();

  // Check for any inputs
  const allInputs = page.locator('input');
  const inputCount = await allInputs.count();
  console.log(`Found ${inputCount} inputs on the page`);

  for (let i = 0; i < inputCount; i++) {
    const input = allInputs.nth(i);
    const type = await input.getAttribute('type');
    const id = await input.getAttribute('id');
    const visible = await input.isVisible();
    console.log(`Input ${i}: type=${type}, id=${id}, visible=${visible}`);
  }

  // Check if there's a checkbox specifically
  const checkboxes = page.locator('input[type="checkbox"]');
  const checkboxCount = await checkboxes.count();
  console.log(`Found ${checkboxCount} checkboxes`);
});
