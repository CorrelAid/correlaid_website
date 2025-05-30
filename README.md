# CorrelAid Website

This repository contains the source code for the CorrelAid website at
[www.correlaid.org](www.correlaid.org). The source code mainly addresses the
technical functionality of the website, while the content is stored in a
headless CMS built with [Directus](https://directus.io/) and fetched from there.

The repository also has a CI/CD process set up, such that contributions to the
main branch will directly be reflected in the live website.

## How to Contribute

As described in the beginning, the repository is concerned with the design and
the technical functionality of the website. So anybody who wants to contribute
to that is in the right place. For anybody wanting to contribute content, please
look for the corresponding contact on the CorrelAid website and contact them.

There are mainly two ways to contribute, and both are very much welcome and
appreciated:

- First and foremost, feedback in the form of **issues** (bugs,
  suggestions, feature requests) and the discussion thereof is the foundation for
  anybody actually implementing anything.

- The second way to contribute is to **make improvements to the source code** (and
  related files) themselves. Such changes should always address an existing issue
  to make organization easier.

### Contribution process

The first goal of the contribution process should be to make a _successful_ pull
request to the `main` branch. While this sounds simple enough, there is a
little bit of setup involved in making a PR _successful_. Mainly the criteria
are:

- The PR should be clearly associated with an issue (link the issue in the PR)
  and should be coming from a branch that can be associated with that issue as well.
- There should be no merge conflicts.
- The PR should pass the continuous integration checks.

In order to meet these criteria we suggest the following contribution process.

1. Pick an issue that you want to contribute to, that is not assigned to anybody
   else.
2. Assign this issue to you/have it assigned to you (external contributors), to
   avoid multiple people
   working on the same topic at once unknowingly of one another.
3. Create a new branch for your work on that issue, by branching of the current
   state of the `main` branch. GitHub allows creating branches in the UI of an issue. See doc [here](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue)
4. Make sure you development environment is setup in accordance to the suggested
   [dev setup](#dev-setup)
5. Implement you changes
6. Check you changes in a local deployment of the site
7. Make sure that all the required quality assurance passes on you local
   machine. See [quality assurance tldr](#quality-assurance)
8. Commit and push your changes to github
9. Create a PR from you branch to `main`. At this stage all the QA checks in
   the CI should usually pass automatically if they were successful locally and
   everything is committed. Your branch is deployed to cloudflare and you can see your changes in a live preview version.
10. Merge the branch with main

It the PR to `main` is successfully merged, a [dynamic website](correalaid.pages.dev) is deployed that reflects the PRs changes. In addition, a [CD action](https://github.com/CorrelAid/correlaid_website/blob/main/.github/workflows/cd.yaml) is triggered. This will preform a static build of the
website and run sum additional tests against that build. See the [QA
section](#quality-assurance) for details on how to check this locally prior to a
PR.. If the tests suceed, a static version of the website is deployed to [corredlaid.org](correlaid.org)

## Dev Setup

1.  Install packages

        npm install

1.  Set up pre-commit hooks

        npm run init_pre_commit

1.  Run the website on a local webserver with live updates:

        npm run dev

For details about the projects quality assurance [see below](#quality-assurance).

### Secrets and local configuration changes

There is one possibly relevant secret for development which is a directus token
that, if present, should be placed in the `.env.local` file.

      echo "DIRECTUS_TOKEN=<your token>" > .env.local

The token is only relevant for processing project related data and blog posts, jobs, events, local chapters and projects that are set to preview in the CMS.
Dynamic local serving of the website should therefore work even without such a
token. It will however not be possible to create a static build without such a token.

Contributors that wish to make a static build or wish to contribute to project
related pages have the following options. If they have directus access, they can
create a static token for themselves inside of directus, but they need suitable
permissions for the token to be useful. Contributors without suitable
permissions or without directus access should contact the project team to either
get directus access, suitable permissions or a token.

To change the default configuration are of the website, developers
can add additional configurations to the `.env.local` file as well. This file will not be
committed and will therefore not interfere with anybody else's configurations or
with deployments. See the other (non-local) `.env` files for configurations that
you might want to overwrite. One possibility, for instance, might be the inclusion
of non-published job announcements that are only available for preview so far. For this
concrete example include `PUBLIC_PREVIEW='TRUE'`.

## Project explanation

SvelteKit is documented [here](https://kit.svelte.dev/docs/introduction)

Svelte is documented [here](https://svelte.dev/docs)

Only the implementations of the most important concepts are explained here in a general manner. Refer to the code itself for detailed explanations.

### Design

- This project uses [tailwindcss](https://tailwindcss.com/) including the typography, line clamp and aspect ratio plugins.
- Colours are defined in tailwind.config.js based on the [CorrelAid Design Guide](https://docs.correlaid.org/wiki/design-guide)
- Some custom styles, e.g. the gradient offset border, are defined in app.css
- Fonts are self hosted and located in static/fonts/. They are specified in app.css and tailwind.config.js

### Accessibility

- Use this tool to verify accessibility: https://www.deque.com/axe/devtools/
- Exceptions: - Elements must have sufficient color contrast -> CorrelAid green on white background: used text shadow to improve this

### Internationalization

The website currently supports two languages, German(default) and English. Most
translations come from the CMS, but some, such as those for the header and the footer,
comes from `src/lib/data/translations.js`.

#### Page Keys and locale

While`src/lib/data/translations.js` is a source for translations, `src/lib/data/pageKeys.js` contains all valid pages that exist once and are
not dynamically generated like blog posts. Its the source of truth for page
names and urls. The pages are assigned page keys to identify them independent
of language. It also defines valid urls in both languages. When the name of a
route folder contains a parameter, e.g. \[imprint=imprint\], there is a file in
the folder "src/params", e.g. imprint.js, that extracts valid url parameters
from pageKeys.js. When you go to a url, e.g. /en/about aka /ueber,
Sveltekit checks if this is a valid route. /xyz would not work. There is one
optional root parameter that defines the locale. If its undefined, the page is
displayed in German. If its "en", the page is displayed in English. The locale
route parameter determines the page content in two ways:

1. Its given to a store (if its undefined, it is set to "de") to make it easily
   available in +page.svelte files. In the Header and Footer component this
   store is used to call the translate function via a derived store that
   accesses the locale store (src/lib/stores/i18n.js), which extracts the
   translation from pageKeys.js, to display navigation items in the desired
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
- The page /volunteering/correlaidx contains a map made with [maplibre](https://maplibre.org/) and [maptiler](https://www.maptiler.com/)

### Data Validation

Data is retrieved from the CMS with GraphQL. Queries are defined in string form. Data validation happens server-side in server.js files.

## Production build

In line with standard svelte setups a production build can be created with

> npm run build

Due to the structure of our project the default build will not prerender any routes/pages. In order to change that behaviour
we provide the environment variable `PUBLIC_PRERENDER`, which is best set in a `.env` file. The options for `PUBLIC_PRERENDER` are as follows.

- `ALL`: Tries to prerender all routes and also requires prerendering for all routes. If any routes cannot be prerendered for
  technical reasons, the build will fail.
- `AUTO`: Tries to prerender all routes, but does not require routes to be prerendered. This will simply omit any routes from
  prerendering that cannot be prerendered.
- Missing or anything else: Does not require any prerendering which will lead to no prerendering in our site setup.

Static builds will require `PUBLIC_PRERENDER=ALL`. Even without making a static build, this option can therefore be used to check whether
any routes cannot be prerendered and hence, would prevent a static build.

### Static build

In order to make a static build, the environment variable `PUBLIC_ADAPTER=STATIC` has to be set. Static builds are only allowed if
`PUBLIC_PRERENDER=ALL`. The static build will also require a directus token `DIRECTUS_TOKEN=<your token>`.

### PUBLIC_ON_CMS_ERROR

We also provide a configuration option to control what happens on a CMS parsing
error. By default (`PUBLIC_ON_CMS_ERROR=''`) the parsing problem is logged and
the corresponding CMS entries ignored (if possible). Alternatively one can set
the configuration to `PUBLIC_ON_CMS_ERROR='FAIL'`. This cases the program to
fail in case any content from the CMS cannot be parsed.

It is recommended to use the `FAIL` configuration for static builds. That way
the static site cannot be rebuild unless all CMS content is parsed
successfully. That way any CMS configuration errors cannot propagate to a
static deployment via CD pipeline.

For dynamic deployments that have a live connection with the CMS, the default
setting is recommended, otherwise the page will return 500 http responses every
time there is an issue, which might not be desirable.

## Quality Assurance

> **_tldr:_**
>
> - pre-commit hooks should be setup to take care of formatting and linting automatically on commit
> - for unit testing run `npm run test`
> - for production end-2-end testing set env vars `PUBLIC_ADAPTER=STATIC`, `PUBLIC_PRERENDER=ALL` and `PUBLIC_ON_CMS_ERROR=FAIL` and run `npm run build-and-test`

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

Single test run: `npx vitest run <file name, e.g. rss>`

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

For arch, see [here](https://github.com/microsoft/playwright/issues/2621#issuecomment-2083083392) and cosider to do `playwright install --only-shell chromium firefox`

This will install the required browsers and system dependencies. Only afterwards
can playwright be used.

#### Usage

To run already configured playwright test we suggests the following procedure that
tests the static build which is used in production.

1.  Set the environment variables `ADAPTER='STATIC'` and `PRERENDER='ALL'`

2.  Build the static page

        npm run build

3.  Serve the static page on port 3000.

         npm run serve-static

    We recommend not to use `vite preview`/`npm run preview` for the static page, because
    sometimes it provides more functionality than the static page will
    actually have.

4.  Run the e2e tests. The tests don't actually care whether the page is static,
    but they need it to run on port 3000

         npm run e2e

This is the only playwright script shortcut defined currently in our project,
but playwright offers many other commands to help with the creation of test cases
and the analysis of failed test cases. Please refer to the
[official documentation](https://playwright.dev/docs/intro) for details.
Most notably `npx playwright test --ui` and `npx playwright codegen` are two very
helpful commands that leverage the interactivity of the playwright framework.

End to end test cases are stored in the `tests/` folder, so new tests should be
added there.

#### Alternative e2e testing with docker

Playwright doesnt work on Arch Linxu for example.
Run these commands after serving the page on 3000 (see above).

```
docker run -v $PWD:/tests -w /tests --rm -it mcr.microsoft.com/playwright:v1.33.0-focal /bin/bash
npm install
npx playwright install-deps
npx playwright test
```
