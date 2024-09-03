import {sveltekit} from '@sveltejs/kit/vite';
import {svelteTesting} from '@testing-library/svelte/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), svelteTesting()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTest.js'],
    include: ['**/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
};

export default config;
