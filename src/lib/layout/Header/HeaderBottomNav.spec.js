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

    render(HeaderBottomNav, {
      props: {botNav: navItems, lastClickedLink: ''},
    });

    // Relies on a lot of configuration wrt. translations, meaning
    // Language specific lookups. It would be nice if testing was more explicit
    expect(screen.getByText('Über uns')).toBeInTheDocument();
    const navLink = screen.getByText('Daten nutzen');
    const navColorDivWrapper = screen.getByTestId(
      'navColoringTest-navbar.using_data',
    );
    expect(navLink).toBeInTheDocument();
    expect(navColorDivWrapper).toBeInTheDocument();

    expect(navColorDivWrapper).not.toHaveClass('text-secondary');
  });
  test('main navigations present present', async () => {
    render(HeaderBottomNav, {
      props: {botNav: navItems, lastClickedLink: 'navbar.using_data'},
    });
    const navColorDivWrapper = screen.getByTestId(
      'navColoringTest-navbar.using_data',
    );
    expect(navColorDivWrapper).toHaveClass('text-secondary');
  });
  test('main navigations present present', async () => {
    render(HeaderBottomNav, {
      props: {botNav: navItems, lastClickedLink: 'navbar.using_data.projects'},
    });
    const navColorDivWrapper = screen.getByTestId(
      'navColoringTest-navbar.using_data',
    );
    expect(navColorDivWrapper).toHaveClass('text-secondary');
  });
  test('main navigations present present', async () => {
    render(HeaderBottomNav, {
      props: {botNav: navItems, lastClickedLink: 'navbar.home'},
    });
    const navColorDivWrapper = screen.getByTestId(
      'navColoringTest-navbar.using_data',
    );
    expect(navColorDivWrapper).not.toHaveClass('text-secondary');
  });
});
