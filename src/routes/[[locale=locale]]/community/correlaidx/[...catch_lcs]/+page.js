import {error} from '@sveltejs/kit';

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export function load(event) {
  throw error(404, 'Local chapter not found');
}
