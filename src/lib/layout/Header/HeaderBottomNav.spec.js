import HeaderBottomNav from './HeaderBottomNav.svelte';
import {render, screen} from '@testing-library/svelte';
import {locale} from '$lib/stores/i18n';

describe('Nav should have dropdown sub menus', () => {
  const navItems = [
    {
      key: 'navbar.about',
      category: 'about',
      children: ['navbar.about.team', 'navbar.about.values'],
    },
    {
      key: 'navbar.using_data',
      category: 'using_data',
      children: ['navbar.using_data.projects', 'navbar.using_data.consulting'],
    },
  ];

  test('main navigations present present', async () => {
    locale.set('de');

    render(HeaderBottomNav, {props: {bot_nav: navItems}});

    // Relies on a lot of configuration wrt. translations, meaning
    // Language specific lookups. It would be nice if testing was more explict
    expect(screen.getByText('Über uns')).toBeInTheDocument();
    const navLink = screen.getByText('Daten nutzen');
    expect(navLink).toBeInTheDocument();

    // TODO: Testing with fireEvent does not work if the on click is on a svelte
    // component, because fireEvent triggers very specific dom events
    // try using the user-event package for testing library instead.
    // await fireEvent.click(navLink);
    // expect(screen.getByText('Daten nutzen')).toHaveClass('text-secondary');
  });
});
