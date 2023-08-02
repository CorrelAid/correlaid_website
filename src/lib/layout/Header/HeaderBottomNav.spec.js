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

    const {component} = render(HeaderBottomNav, {
      props: {bot_nav: navItems, lastClickedLink: ''},
    });

    // Relies on a lot of configuration wrt. translations, meaning
    // Language specific lookups. It would be nice if testing was more explict
    expect(screen.getByText('Über uns')).toBeInTheDocument();
    const navLink = screen.getByText('Daten nutzen');
    const navColorDivWrapper = screen.getByTestId(
      'navColoringTest-navbar.using_data',
    );
    expect(navLink).toBeInTheDocument();
    expect(navColorDivWrapper).not.toHaveClass('text-secondary');

    await component.$set({lastClickedLink: 'navbar.using_data'});
    expect(navColorDivWrapper).toHaveClass('text-secondary');

    await component.$set({lastClickedLink: 'navbar.using_data.projects'});
    expect(navColorDivWrapper).toHaveClass('text-secondary');

    await component.$set({lastClickedLink: 'navbar.home'});
    expect(navColorDivWrapper).not.toHaveClass('text-secondary');
  });
});
