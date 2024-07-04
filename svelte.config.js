import adapter from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/kit/vite';
import pageKeys from './src/lib/data/pageKeys.js';
import {fetch} from 'undici';

import path from 'node:path';
import dotenv from 'dotenv';

// Mimic vites loading order using the dotenv default overwrite = false
// This means preexisting env vars have highest priority followed by
// env specific vars general env vars
// .local versions of the variables always overwrite their non-local
// counterpart
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
});
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
dotenv.config({path: path.resolve(process.cwd(), '.env')});

const mainRoutes = {
  de: pageKeys['de'],
  en: pageKeys['en'],
};

const URL = `${process.env.PUBLIC_API_URL}/graphql`;

function getAllowedStatus() {
  const allowedStatus = ['published', 'published_anon'];
  if (process.env.PUBLIC_PREVIEW === 'TRUE') {
    allowedStatus.push('preview');
    allowedStatus.push('preview_anon');
  }
  return allowedStatus;
}

if (
  process.env.PUBLIC_ADAPTER === 'STATIC' &&
  process.env.PUBLIC_PRERENDER !== 'ALL'
) {
  throw Error('Env var ADAPTER=STATIC only allowed for PRERENDER=ALL');
}

function canBePrerendered(url) {
  return (
    url[0] === '/' &&
    url !== '/volunteering/become-member' &&
    url !== '/mitmachen/mitglied-werden'
  );
}

const queries = {
  blogs: `
  query BlogSlugs($status: [String] = ["published"]) {
    Blog_Posts(sort: ["-publication_datetime"], filter: {status: { _in: $status }}) {
      translations(filter:{slug:{_neq:null}}) {
        languages_code {
          code
        }
        slug
      }
    }
  }
  `,
  lcs: `
  query LcSlugs {
	  Local_Chapters {
      slug: short_id
  	}
  }
  `,
  events: `
  query EventSlugs($status: [String] = ["published"]) {
    Events (filter : {status: {_in: $status}}){
      slug
    }
  }
  `,
  projects: `
  query ProjectSlugs($status: [String] = ["published"]) {
    Projects (filter : {status: {_in: $status}}) {
      slug: project_id
    }
  }

  `,
  jobs: `
  query Jobs($status: [String] = ["published"]) {
    Jobs(filter: { status: { _in: $status }  }) {
      slug
    }
  }
  `,
};

function addBlogRoutesWithLanguageFallback(routes, translations) {
  for (const t of translations) {
    routes.push(`/blog/${t.slug}`);
    routes.push(`/en/blog/${t.slug}`);
  }
}

async function queryCmsGraphQl(query, vars) {
  const payload = {query: query};

  if (typeof vars !== 'undefined') {
    payload['variables'] = vars;
  }

  const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

  const headers = {'Content-Type': 'application/json'};

  if (
    DIRECTUS_TOKEN !== undefined &&
    DIRECTUS_TOKEN !== '' &&
    DIRECTUS_TOKEN !== null
  ) {
    headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;
  }

  const response = await fetch(URL, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (!response.ok) {
    throw new Error(
      `unexpected cms response ${response.statusText} for query ${
        query.split(/\r?\n/)[0]
      }`,
    );
  }

  const data = await response.json();

  if ('errors' in data) {
    throw new Error(`Cms errors ${data.errors}`);
  }

  return data;
}

async function addBlogRoutes(routes) {
  const postsResult = await queryCmsGraphQl(queries['blogs'], {
    status: getAllowedStatus(),
  });
  for (const post of postsResult['data']['Blog_Posts']) {
    addBlogRoutesWithLanguageFallback(routes, post['translations']);
  }
}

async function addLcRoutes(routes) {
  const germanResults = await queryCmsGraphQl(queries['lcs']);
  for (const lc of germanResults['data']['Local_Chapters']) {
    routes.push(`/mitmachen/correlaidx/${lc.slug.toLowerCase()}`);
    routes.push(`/mitmachen/correlaidx/${lc.slug.toLowerCase()}/calendar.ics`);
  }
  const englishResults = await queryCmsGraphQl(queries['lcs']);
  for (const lc of englishResults['data']['Local_Chapters']) {
    routes.push(`/en/volunteering/correlaidx/${lc.slug.toLowerCase()}`);
    routes.push(
      `/en/volunteering/correlaidx/${lc.slug.toLowerCase()}/calendar.ics`,
    );
  }
}

async function addProjectRoutes(routes) {
  const results = await queryCmsGraphQl(queries['projects']);
  for (const project of results['data']['Projects']) {
    routes.push(`/daten-nutzen/projektdatenbank/${project.slug}`);
    routes.push(`/en/using-data/project-database/${project.slug}`);
  }
}

async function addEventRoutes(routes) {
  const results = await queryCmsGraphQl(queries['events']);
  for (const event of results['data']['Events']) {
    routes.push(`/veranstaltungen/${event.slug}`);
    routes.push(`/en/events/${event.slug}`);
  }
}

async function addJobRoutes(routes) {
  const results = await queryCmsGraphQl(queries['jobs'], {
    status: getAllowedStatus(),
  });
  for (const job of results['data']['Jobs']) {
    routes.push(`/jobs/${job.slug}`);
    routes.push(`/en/jobs/${job.slug}`);
  }
}

const prerenderRoutes = [];

if (process.env.PUBLIC_PRERENDER === 'ALL') {
  for (const routeName in mainRoutes['de']) {
    if (
      typeof routeName === 'string' &&
      canBePrerendered(mainRoutes.de[routeName].url)
    ) {
      prerenderRoutes.push(mainRoutes.de[routeName].url);
    }
  }

  for (const routeName in mainRoutes['en']) {
    if (
      typeof routeName === 'string' &&
      canBePrerendered(mainRoutes.en[routeName].url)
    ) {
      prerenderRoutes.push(mainRoutes.en[routeName].url);
    }
  }

  await addBlogRoutes(prerenderRoutes);
  await addLcRoutes(prerenderRoutes);
  await addProjectRoutes(prerenderRoutes);
  await addEventRoutes(prerenderRoutes);
  await addJobRoutes(prerenderRoutes);
  prerenderRoutes.push('/404/');
  prerenderRoutes.push('/en/404/');
} else {
  prerenderRoutes.push('*');
}

let configuredAdapter;

if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  const staticBuildDir = process.env.BUILD_DIR || '.svelte-kit/cloudflare';

  configuredAdapter = adapterStatic({
    pages: staticBuildDir,
    assets: staticBuildDir,
    fallback: null,
    precompress: false,
    strict: false,
  });
} else {
  configuredAdapter = adapter({
    routes: {
      include: ['/*'],
      exclude: ['<all>'],
    },
  });
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: configuredAdapter,
    prerender: {entries: prerenderRoutes},
    serviceWorker: {
      register: false,
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
