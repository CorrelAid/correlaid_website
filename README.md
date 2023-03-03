## Dev Setup
1. 

2. Install packages (in the SvelteKit folder)

    ```
    npm install
    ```
3. Create .env file with following contents (in the SvelteKit folder)
    ```
    PUBLIC_API_URL=https://correlaid.directus.app
    BYPASS_TOKEN=REPLACE_ME_WITH_SECRET_VALUE
    ```

5. Start project with:
    ```
    npm run dev
    ```


## Project explanation

SvelteKit is documented [here](https://kit.svelte.dev/docs/introduction)

Svelte is documented [here](https://svelte.dev/docs)

Only the implementations of most important concepts are explained here in a general manner. Refer to the code itself for detailed explanations.

### Design

- This project uses [tailwindcss](https://tailwindcss.com/) including the typography, line clamp and aspect ratio plugins. 
- Colours are defined in tailwind.config.js based on the [CorrelAid Design Guide](https://docs.correlaid.org/wiki/design-guide)
- Some custom styles, e.g. the gradient offset border, are defined in app.css
- Fonts are selfhosted and located in static/fonts/. They are specified in app.css and tailwind.config.js

### Internationalization

The website currently supports two languages, german(default) and english. Most translations come from the CMS, but the content of the header and the footer comes from "src/lib/data/translations.js". Apart from being a source for translations, this file also contains all valid pages that exist once and are not dynamically generated like blog posts. Its the source of truth for page names and urls. The pages are assigned page keys to identify them independent of language. It also defines valid urls in both languages. When the name of a route folder contains a parameter, e.g. \[imprint=imprint\], there is a file in the folder "src/params", e.g. imprint.js, that extracts valid url parameters from translations.js. When you go to a url, e.g. /en/about aka /ueber, Sveltekit checks if this is a valid route. /xyz would not work. There is one optional root paramter that defines the locale. If its undefined, the page is displayed in german. If its "en", the page is displayed in english. The locale route parameter determines the page content in two ways: 

1. Its given to a store (if its undefined, its set to "de") to make it easily available in +page.svelte files. In the Header and Footer component this store is used to call the translate function via a derived store that accesses the locale store (src/lib/stores/i18n.js), which extracts the translation from translations.js, to display navigation items in the desired language. 

2. In +layout.server.js and +page.server.js the locale parameter is used directly and is a query parameter for requesting content from the API, causing only content in the desired language to be retreived


The language toggle button writes to the locale store and sends an event to the root +layout.svelte. The function "handleLocaleChange" is called when this event is retreived and forwards the user to the equivalent of the current page in the selected language, while also handling possible slugs.

### CMS

The website gets its content from the API of a directus cloud project. This project contains a collection called Pages. This collection contains of a builder field that allows adding various components to a page including filling the components with content and also to define their order. All pages defined in the SvelteKit project correspond to one entry in pages collection. This is made possible by using a field that specifies the page key. Valid pages and page keys are defined in translations.js (see internationalization). Page keys are used in the root +layout.server.js to retreive the correct entry in the directus collection. The components exists in the form of entries in a list that is ordered with the sort field and then retreived in layout.svelte. There, a loop over the list items is declared and the components are rendered based on which type of component they are. A special type of component is the "custom section" that will define call the svelte "slot" tag if its part of the list. This allows adding components to the page that exist only once, e.g. a list of blog posts. The slot tag is filled with the contents of the +page.svelte file corresponding to the currently used route.

Other collections that are retreived from the CMS are so far blog posts, events, people etc. They are not called in +layout.server.js but have their own +page.server.js or +layout.server.js. This data is used if the list of components retreived from the cms contains a custom section. For example, in "/blog/+page.server.js", a list of blog posts is retreived from the collection Posts. 

### Slug pages

SvelteKit allows defining pages with dynamic content by using route paramters. If a user goes to a blog posts by using a link in the blog post overview, the slug route parameter is given to the query defined in "blog/\[slug]/+page.server.js". This retreives the blog post that corresponds to the slug. 

### Pdfs etc.

The route docs/\[slug] allows the retrieval of pdfs etc. and doesnt correspond to a page key. It just forwards the user to calling the directus API with the right paramters to retreive the desired document. 

### Special components and pages
- The HTML component makes use of the tailwind typography plugin (with the class "prose") by automatically applying predefined styles. All styles are customizable.
- The carousel component uses [this](https://github.com/vadimkorr/svelte-carousel) external component
- The page /community/correlaidx contains a map made with [maplibre](https://maplibre.org/) and [maptiler](https://www.maptiler.com/)
- 


