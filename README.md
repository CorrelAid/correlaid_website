## Dev Setup
1. Clone Repo

2. Install packages

    ```
    npm install
    ```
3. Create .env file with following contents:
    ```
    API_URL=https://6xdv3yb3.directus.app
    ```

## Project explanation

SvelteKit is documented [here](https://kit.svelte.dev/docs/introduction)

Svelte is documented [here](https://svelte.dev/docs)

The website gets its content from the API of a  directus cloud project

## Internationalization

The website currently supports two languages, german(default) and english. Most translations come from the CMS, but the content of the header and the footer comes from "src/lib/data/translations.js". This file contains all valid pages that exist once and are not dynamically generated like blog posts etc. The pages are assigned page keys to identify them independent of language. It also defines possible urls in both languages. When the name of a route folder contains a parameter, e.g. \[imprint=imprint\], there is a file in the folder "src/params", e.g. imprint.js, that extracts possible url parameters from translations.js. 