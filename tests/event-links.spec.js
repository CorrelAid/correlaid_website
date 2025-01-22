import {test, expect} from '@playwright/test';

test.describe('event subpages accessibility test', () => {
  const eventPages = [
    {path: '/veranstaltungen/?viewType=list', lang: 'de'},
    {path: '/en/events/?viewType=list', lang: 'en'},
  ];

  for (const {path, lang} of eventPages) {
    test(`check if all ${lang} event detail pages are accessible`, async ({
      page,
    }) => {
      // Go to events page with list view
      await page.goto(path, {waitUntil: 'networkidle'});
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000); // Wait for dynamic content

      // Get all event links
      const eventLinks = await page.evaluate((lang) => {
        const baseSelector =
          lang === 'en'
            ? 'a[href*="/en/events/"]'
            : 'a[href*="/veranstaltungen/"]';

        return Array.from(document.querySelectorAll(baseSelector))
          .filter((link) => {
            const href = link.href;
            const isMainPage =
              lang === 'en'
                ? href === 'http://localhost:3000/en/events' ||
                  href === 'http://localhost:3000/en/events/'
                : href === 'http://localhost:3000/veranstaltungen' ||
                  href === 'http://localhost:3000/veranstaltungen/';
            const isEventDetail =
              href.includes('?viewType=list') && !isMainPage;
            return isEventDetail;
          })
          .map((link) => ({
            url: link.href.replace('?viewType=list', ''),
            title: link.textContent?.trim() || null,
          }));
      }, lang);

      // Log found links for debugging
      console.log(`Found ${eventLinks.length} event links:`);
      eventLinks.forEach((link) => {
        console.log(`- ${link.title}: ${link.url}`);
      });

      // Verify we found links
      expect(
        eventLinks.length,
        `No event links found for ${lang} page`,
      ).toBeGreaterThan(0);

      // Limit to first 5 events
      const limitedEventLinks = eventLinks.slice(0, 5);

      // Visit and check each event page
      for (const {url, title} of limitedEventLinks) {
        console.log(`Checking event: ${title} at ${url}`);

        const response = await page.goto(url, {waitUntil: 'networkidle'});
        expect(response?.status(), `Failed to load ${url}`).toBe(200);

        // Basic accessibility checks
        await expect(page).toHaveTitle(/.+/);
        await expect(page.locator('header')).toBeVisible();

        // Event specific checks
        const eventTitle = page.getByRole('heading', {level: 1});
        await expect(eventTitle).toBeVisible();

        // Language verification
        const expectedPath =
          lang === 'en' ? '/en/events/' : '/veranstaltungen/';
        expect(page.url()).toContain(expectedPath);
      }
    });
  }
});
