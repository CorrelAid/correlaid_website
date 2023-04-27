import HeaderTopNav from './HeaderTopNav.svelte';
import {render, fireEvent, screen} from '@testing-library/svelte';
import {locale} from '$lib/stores/i18n';

describe('Top Nav links', () => {
  const navItems = ['navbar.about', 'navbar.using_data'];

  test('Last clicked nav link should have a different color', async () => {
    locale.set('de');

    render(HeaderTopNav, {props: {top_nav: navItems}});

    const aboutLink = screen.getByText('Über uns');
    const dataLink = screen.getByText('Daten nutzen');
    expect(aboutLink).toBeInTheDocument();
    expect(dataLink).toBeInTheDocument();
    expect(aboutLink).not.toHaveClass('text-primary');
    expect(dataLink).not.toHaveClass('text-primary');

    await fireEvent.click(aboutLink);

    expect(aboutLink).toHaveClass('text-primary');
    expect(dataLink).not.toHaveClass('text-primary');

    await fireEvent.click(dataLink);

    expect(aboutLink).not.toHaveClass('text-primary');
    expect(dataLink).toHaveClass('text-primary');
  });
});
