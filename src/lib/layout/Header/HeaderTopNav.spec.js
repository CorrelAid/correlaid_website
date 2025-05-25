import HeaderTopNav from './HeaderTopNav.svelte';
import {render, screen} from '@testing-library/svelte';
import {locale} from '$lib/stores/i18n';

describe('Top Nav links', () => {
  const navItems = ['navbar.about', 'navbar.using_data'];

  test('Link in path should have a different color', async () => {
    locale.set('de');

    render(HeaderTopNav, {
      props: {topNav: navItems, lastClickedLink: ''},
    });

    const aboutLink = screen.getByText('Über uns');
    const dataLink = screen.getByText('Daten nutzen');
    expect(aboutLink).toBeInTheDocument();
    expect(dataLink).toBeInTheDocument();

    expect(aboutLink).not.toHaveClass('text-primary');
    expect(dataLink).not.toHaveClass('text-primary');
  });
  test('Link in path should have a different color', async () => {
    locale.set('de');
    render(HeaderTopNav, {
      props: {topNav: navItems, lastClickedLink: 'navbar.about'},
    });

    const aboutLink = screen.getByText('Über uns');
    const dataLink = screen.getByText('Daten nutzen');

    expect(aboutLink).toHaveClass('text-primary');
    expect(dataLink).not.toHaveClass('text-primary');
  });
  test('Link in path should have a different color', async () => {
    locale.set('de');
    render(HeaderTopNav, {
      props: {topNav: navItems, lastClickedLink: 'navbar.using_data'},
    });

    const aboutLink = screen.getByText('Über uns');
    const dataLink = screen.getByText('Daten nutzen');

    expect(aboutLink).not.toHaveClass('text-primary');
    expect(dataLink).toHaveClass('text-primary');
  });
});
