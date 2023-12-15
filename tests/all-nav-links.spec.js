import {test} from '@playwright/test';

test.describe('test regular viewport', () => {
  const linkAndItems = [
    {
      linkClick: async (page) =>
        page
          .getByRole('banner', {name: 'Site Header'})
          .getByRole('link', {name: 'Veranstaltungen'})
          .click(),
      page: '**/veranstaltungen/',
    },
    {
      linkClick: async (page) => page.getByRole('link', {name: 'Blog'}).click(),
      page: '**/blog/',
    },
    {
      linkClick: async (page) =>
        page.getByRole('link', {name: 'Podcast', exact: true}).click(),
      page: '**/podcast/',
    },
    {
      linkClick: async (page) =>
        page.getByRole('listitem').filter({hasText: 'Newsletter'}).click(),
      page: '**/newsletter/',
    },
    {
      linkClick: async (page) =>
        page.getByRole('link', {name: 'Über uns'}).click(),
      page: '**/ueber/',
    },
    {
      linkClick: async (page) => {
        await page.getByRole('link', {name: 'Über uns'}).hover();
        page
          .getByRole('banner', {name: 'Site Header'})
          .getByRole('link', {name: 'Team'})
          .click();
      },
      page: '**/ueber/team/',
    },
    {
      linkClick: async (page) => {
        await page.getByRole('link', {name: 'Über uns'}).hover();
        await page.getByRole('link', {name: 'Werte'}).click();
      },
      page: '**/ueber/werte/',
    },
    {
      linkClick: async (page) => {
        await page.getByRole('link', {name: 'Über uns'}).hover();
        page.getByRole('link', {name: 'Partner'}).click();
      },
      page: '**/ueber/partner/',
    },
    {
      linkClick: async (page) =>
        page.getByRole('link', {name: 'Daten nutzen'}).click(),
      page: '**/daten-nutzen/',
    },
    {
      linkClick: async (page) => {
        await page.getByRole('link', {name: 'Daten nutzen'}).hover();
        page
          .getByRole('banner', {name: 'Site Header'})
          .getByRole('link', {name: 'Data4Good Projekte'})
          .click();
      },
      page: '**/daten-nutzen/projekte/',
    },
    {
      linkClick: async (page) => {
        await page.getByRole('link', {name: 'Daten nutzen'}).hover();
        page.getByRole('link', {name: 'Beratung'}).click();
      },
      page: '**/daten-nutzen/beratung/',
    },
    {
      linkClick: async (page) => {
        await page.getByRole('link', {name: 'Daten nutzen'}).hover();
        page.getByRole('link', {name: 'Hackathons & Datendialoge'}).click();
      },
      page: '**/daten-nutzen/hackathons/',
    },
    {
      linkClick: async (page) =>
        page
          .getByTestId('navColoringTest-navbar.education')
          .getByRole('link', {name: 'Bildung'})
          .click(),
      page: '**/bildung/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.education')
          .getByRole('link', {name: 'Bildung'})
          .hover();
        page
          .getByRole('banner', {name: 'Site Header'})
          .getByRole('link', {name: 'Bildungsressourcen'})
          .click();
      },
      page: '**/bildung/ressourcen/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.education')
          .getByRole('link', {name: 'Bildung'})
          .hover();
        page.getByRole('link', {name: 'R Lernen', exact: true}).click();
      },
      page: '**/bildung/r-lernen/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.education')
          .getByRole('link', {name: 'Bildung'})
          .hover();
        page.getByRole('link', {name: 'TidyTuesday'}).click();
      },
      page: '**/bildung/tidy-tuesday/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.education')
          .getByRole('link', {name: 'Bildung'})
          .hover();
        page.getByRole('link', {name: 'Mentoring'}).click();
      },
      page: '**/bildung/mentoring/',
    },
    {
      linkClick: async (page) =>
        page.getByRole('link', {name: 'Mitmachen'}).click(),
      page: '**/mitmachen/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.volunteering')
          .getByRole('link', {name: 'Mitmachen'})
          .hover();
        page.getByRole('link', {name: 'Engagiere dich vor Ort'}).click();
      },
      page: '**/mitmachen/correlaidx/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.volunteering')
          .getByRole('link', {name: 'Mitmachen'})
          .hover();
        page.getByRole('link', {name: 'Gründe (d)eine Lokalgruppe'}).click();
      },
      page: '**/mitmachen/lc-gruenden/',
    },
    {
      linkClick: async (page) => {
        await page
          .getByTestId('navColoringTest-navbar.volunteering')
          .getByRole('link', {name: 'Mitmachen'})
          .hover();
        page.getByRole('link', {name: 'Trete einem Team bei'}).click();
      },
      page: '**/mitmachen/volunteer-teams/',
    },
  ];

  test('smoke test all nav links', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'});
    for (const linkItem of linkAndItems) {
      await linkItem.linkClick(page);
      await page.waitForURL(linkItem['page'], {waitUntil: 'networkidle'});
    }
  });
});
