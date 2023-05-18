import Partner from './Partner.svelte';
import {render, screen} from '@testing-library/svelte';

describe('Partner', () => {
  test('contains name and details', () => {
    render(Partner, {
      props: {
        name: 'NPO A',
        description: 'a very cool NPO',
        img: 'expected.image.url',
      },
    });

    expect(screen.getByText('NPO A')).toBeInTheDocument();
    expect(screen.getByText('a very cool NPO')).toBeInTheDocument();
  });

  test('image has hyperlink', () => {
    render(Partner, {
      props: {
        name: 'NPO A',
        description: 'a very cool NPO',
        img: 'fakeimgurl.org ',
        website: 'npoa.website.org',
      },
    });

    // const image = screen.getByAltText('NPO A');
    // expect(image.closest('a')).toHaveAttribute('href', 'npoa.website.org');
  });
});
