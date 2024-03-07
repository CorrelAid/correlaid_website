import Partner from './Partner.svelte';
import {render, screen} from '@testing-library/svelte';

describe('Partner', () => {
  test('contains name and details', () => {
    render(Partner, {
      props: {
        name: 'NPO A',
        description: 'a very cool NPO',
        imageSrc: 'expected.image.url',
        website: 'npoa.website.org',
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
        imageSrc: 'fakeImgSrc.org ',
        website: 'npoa.website.org',
      },
    });
  });
});
