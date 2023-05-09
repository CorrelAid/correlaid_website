## Dev Setup

1.  Install packages

        npm install

1.  Create .env file with the cms url env variable

        echo "PUBLIC_API_URL=https://cms.correlaid.org" \nPUBLIC_PRERENDER="" \nPUBLIC_ADAPTER="" > .env

1.  Set up pre-commit hooks

        npm run init_pre_commit

1.  Run the website on a local webserver with live updates:

        npm run dev

For details about the projects quality assurance [see below](#quality-assurance).

## Git Policies

Merge with preview, then merge with master.

## Project explanation

SvelteKit is documented [here](https://kit.svelte.dev/docs/introduction)

Svelte is documented [here](https://svelte.dev/docs)

Only the implementations of most important concepts are explained here in a general manner. Refer to the code itself for detailed explanations.

### Design

- This project uses [tailwindcss](https://tailwindcss.com/) including the typography, line clamp and aspect ratio plugins.
- Colours are defined in tailwind.config.js based on the [CorrelAid Design Guide](https://docs.correlaid.org/wiki/design-guide)
- Some custom styles, e.g. the gradient offset border, are defined in app.css
- Fonts are self hosted and located in static/fonts/. They are specified in app.css and tailwind.config.js
- Icons: https://thenounproject.com/browse/creator/Iconathon1/icon-collections/?p=1

### Accessibility

- Use this tool to verify accessibility: https://www.deque.com/axe/devtools/
- Exceptions: - Elements must have sufficient color contrast -> CorrelAid green on white background: used text shadow to improve this
- CSS background images: http://www.davidmacd.com/blog/alternate-text-for-css-background-images.html

#### Standards

- Text should be justified: "text-justify"
- Links should have the following classes: "text-secondary font-normal drop-shadpw-sm"
- Links that are also titles should have the following classes: "text-xl font-semibold text-base-content transition hover:text-primary" (exception: partners)
- Titles that are no links should have following classes: "text-2xl text-primary drop-shadow-sm"

### Internationalization

The website currently supports two languages, German(default) and English. Most
translations come from the CMS, but the content of the header and the footer
comes from "src/lib/data/translations.js". Apart from being a source for
translations, this file also contains all valid pages that exist once and are
not dynamically generated like blog posts. Its the source of truth for page
names and urls. The pages are assigned page keys to identify them independent
of language. It also defines valid urls in both languages. When the name of a
route folder contains a parameter, e.g. \[imprint=imprint\], there is a file in
the folder "src/params", e.g. imprint.js, that extracts valid url parameters
from translations.js. When you go to a url, e.g. /en/about aka /ueber,
Sveltekit checks if this is a valid route. /xyz would not work. There is one
optional root parameter that defines the locale. If its undefined, the page is
displayed in German. If its "en", the page is displayed in English. The locale
route parameter determines the page content in two ways:

1. Its given to a store (if its undefined, its set to "de") to make it easily
   available in +page.svelte files. In the Header and Footer component this
   store is used to call the translate function via a derived store that
   accesses the locale store (src/lib/stores/i18n.js), which extracts the
   translation from translations.js, to display navigation items in the desired
   language.

2. In +layout.server.js and +page.server.js the locale parameter is used
   directly and is a query parameter for requesting content from the API,
   causing only content in the desired language to be retrieved

The language toggle button writes to the locale store and sends an event to the
root +layout.svelte. The function "handleLocaleChange" is called when this
event is retrieved and forwards the user to the equivalent of the current page
in the selected language, while also handling possible slugs.

### CMS

The website gets its content from the API of a directus cloud project. This
project contains a collection called Pages. This collection contains a
builder field that allows adding various components to a page including filling
the components with content and also to define their order. All pages defined
in the SvelteKit project correspond to one entry in pages collection. This is
made possible by using a field that specifies the page key. Valid pages and
page keys are defined in translations.js (see internationalization). Page keys
are used in the root +layout.server.js to retrieve the correct entry in the
directus collection. The components exists in the form of entries in a list
that is ordered with the sort field and then retrieved in layout.svelte. There,
a loop over the list items is declared and the components are rendered based on
which type of component they are. A special type of component is the "custom
section". It calls the svelte "slot" tag. This allows adding components to the page that exist only once, e.g. a list of
blog posts. The slot tag is filled with the contents of the +page.svelte file
corresponding to the currently used route.

Other collections that are retrieved from the CMS are so far blog posts,
events, people etc. They are not called in +layout.server.js but have their own
+page.server.js or +layout.server.js. This data is used if the list of
components retrieved from the cms contains a custom section. For example, in
"/blog/+page.server.js", a list of blog posts is retrieved from the collection
Posts.

### Slug pages

SvelteKit allows defining pages with dynamic content by using route parameters.
If a user goes to a blog posts by using a link in the blog post overview, the
slug route parameter is given to the query defined in
"blog/\[slug]/+page.server.js". This retrieves the blog post that corresponds
to the slug.

### Special components and pages

- The HTML component makes use of the tailwind typography plugin (with the class
  "prose") by automatically applying predefined styles. All styles are customizable.
- The carousel component uses [this](https://github.com/vadimkorr/svelte-carousel) external component
- The page /community/correlaidx contains a map made with [maplibre](https://maplibre.org/) and [maptiler](https://www.maptiler.com/)

## Production build

In line with standard svelte setups a production build can be created with

> npm run build

Due to the structure of our project the default build will not prerender any routes/pages. In order to change that behaviour
we provide the environment variable `PRERENDER`, which is best set in a `.env` file. The options for `PRERENDER` are as follows.

- `ALL`: Tries to prerender all routes and also requires prerendering for all routes. If any routes cannot be prerendered for
  technical reasons, the build will fail.
- `AUTO`: Tries to prerender all routes, but does not require routes to be prerendered. This will simply omit any routes from
  prerendering that cannot be prerendered.
- Missing or anything else: Does not require any prerendering which will lead to no prerendering in our site setup.

Static builds will require `PRERENDER=ALL`. Even without making a static build, this option can therefore be used to check whether
any routes cannot be prerendered and hence, would prevent a static build.

### Static build

In order to make a static build, the environment variable `ADAPTER=STATIC` has to be set. Static builds are only allowed if
`PRERENDER=ALL`.

## Quality Assurance

This section contains information about the employed quality assurance(QA)
standards and tools. These tools are intended to help developers with writing
good code but also expect the commits to adhere to certain standards. Some
of these standards are enforced automatically and some require occasional
manual adjustments.

Overall QA relies on three components:

1. formatting with prettier
1. linting with eslint
1. unit testing using multiple tools
1. end to end testing using playwright

These three components can be executed manually by the respective following commands

1. `npm run format`
1. `npm run lint`
1. `npm run test`
1. `npm run e2e`

When a PR is submitted CI will essentially run format, lint and test commands to ensure
that these three QA components are fine. End to end testing is only run on demand currently.

If the development setup is done as described [above](#dev-setup), pre-commit
hooks are set up, which will then run formatting and linting on every commit.
Formatting will be updated automatically and linting might sometimes require
manual adjustments. Testing is not included in pre-commit hooks in order to
allow the upload of work-in-progress to branches, even if it fails tests.

### Test setup details

Our tests aim to help developers identify newly introduces bugs that break
existing logic, but currently there is no requirement on implementing tests.
This is in order to keep the entry threshold to contribute to this project low for
developers. In concrete terms that means that there is no hard-coded percentage
of test coverage that PRs have to fulfill. The rest of this section explains
details of the test setup for those interested in contributing test cases.

The test setup for web frameworks and JavaScript is far from standardized. In
particular the test setup for svelte is still less standardized than that for
other frameworks. We therefore review exactly which tools are used to enable
testing.

The main libraries used for testing are

1. vitest
1. @testing-library/svelte
1. @testing-library/jest-dom

In terms of file placement, the tests in our project are kept next to the files
that they test and test files end in `.spec.js`.

#### vitest

vitest is the vite specific testing framework and currently seems to have the easiest
support for transpiling svelte components and SvelteKit dependencies in the background.
For instance references to `$lib`. As the testing framework provides commands for
the basic test setup, such as standard `describe`, `test` and `expect` commands.

#### @testing-library/svelte

This library is at the core of rendering svelte components, and programmatically
identifying content in the components and interacting with it. It is essentially the
interface between svelte and the core functionality of
[testing-library](https://testing-library.com/docs/queries/about)

#### @testing-library/jest-dom

[This library](https://github.com/testing-library/jest-dom#tobeinthedocument)
is crucial for providing dom specific assert statements that can then
be run on components/content that is obtained with the help of @testin-library/svelte
functionality together with the core API of testing-library.

### End to End testing

End to end testing is a good way to make systematic checks of the entire website.
This is currently not integrated in automated workflows, because it has a lot of
dependencies and because it requires a live internet connection to the CMS (unlike
unit tests which work without internet connection and when the CMS is offline).

#### Installation

In order to setup playwright run (possibly with `sudo`) in addition to the initial
[dev setup](#dev-setup)

        npx playwright install --with-deps

This will install the required browsers and system dependencies. Only afterwards
can playwright be used.

#### Usage

To run already configured playwright test

1.  Start a local dev server on port 5173 (default)

        npm run dev

1.  Run the e2e tests

        npm run e2e

This is the only playwright script shortcut defined currently in our project,
but playwright offers many other commands to help with the creation of test cases
and the analysis of failed test cases. Please refer to the
[official documentation](https://playwright.dev/docs/intro) for details.
Most notably `npx playwright test --ui` and `npx playwright codegen` are two very
helpful commands that leverage the interactivity of the playwright framework.

End to end test cases are stored in the `tests/` folder, so new tests should be
added there.
