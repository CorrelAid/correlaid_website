// using dot because svelte env vars cannot deal with undefined vars
import dotenv from 'dotenv';
dotenv.config();

let pr;

if (process.env.PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = 'auto';
}

export const prerender = pr;
