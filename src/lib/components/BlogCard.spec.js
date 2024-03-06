import BlogCard from './BlogCard.svelte';
import {render, screen} from '@testing-library/svelte';
import {locale} from '$lib/stores/i18n';

describe('Blog Cards', () => {
  const blogPropsUrl = {
    langs: ['de-DE'],
    title: 'Test blog post',
    teaser: 'This eases the testing blog post',
    pubDate: '2023-04-28T00:20:00',
    contentCreators: [],
    href: 'https://fakeurl.com',
    imageAlt: 'Not image for testing',
  };

  test('Can be initialized with href', () => {
    locale.set('de');
    render(BlogCard, {props: blogPropsUrl});

    expect(screen.getByText('Test blog post').closest('a')).toHaveAttribute(
      'href',
      'https://fakeurl.com',
    );
  });
});
