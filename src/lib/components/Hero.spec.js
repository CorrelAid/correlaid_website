import Hero from './Hero.svelte';
import {render, screen} from '@testing-library/svelte';

describe('Hero', () => {
  test('contains text', () => {
    const {container} = render(Hero, {
      props: {
        height: 'full',
        text: 'Hello World',
        gradient_only: true,
        image_alt: 'No image for testing',
      },
    });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  test('contains CorrelAidX logo', () => {
    const {container} = render(Hero, {
      props: {
        height: 'full',
        text: 'Hello World',
        correlaidx: true,
        gradient_only: true,
        image_alt: 'No image for testing',
      },
    });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
