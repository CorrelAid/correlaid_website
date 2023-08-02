import BlogCard from './Blog_Card.svelte';
import {render, screen} from '@testing-library/svelte';
import {locale} from '$lib/stores/i18n';

describe('Blog Cards', () => {
  const blogPropsUrl = {
    langs: ['de-DE'],
    title: 'Test blog post',
    teaser: 'This eases the testing blog post',
    pubdate: '2023-04-28T00:20:00',
    content_creators: [],
    href: 'https://fakeurl.com',
    image_alt: 'Not image for testing',
  };
  const blogPropsSlug = {
    langs: ['de-DE'],
    title: 'Test blog post',
    teaser: 'This eases the testing blog post',
    pubdate: '2023-04-28T00:20:00',
    content_creators: [],
    slug: 'blog-post-slug',
    image_alt: 'Not image for testing',
  };

  test('Can be initialized with href', () => {
    locale.set('de');
    render(BlogCard, {props: blogPropsUrl});

    expect(screen.getByText('Test blog post').closest('a')).toHaveAttribute(
      'href',
      'https://fakeurl.com',
    );
  });

  test('Can be initialized with slug locale de', () => {
    locale.set('de');
    render(BlogCard, {props: blogPropsSlug});

    expect(screen.getByText('Test blog post').closest('a')).toHaveAttribute(
      'href',
      '/blog/blog-post-slug',
    );
  });

  test('Can be initialized with slug locale en', () => {
    locale.set('en');
    render(BlogCard, {props: blogPropsSlug});

    expect(screen.getByText('Test blog post').closest('a')).toHaveAttribute(
      'href',
      '/en/blog/blog-post-slug',
    );
  });
});
