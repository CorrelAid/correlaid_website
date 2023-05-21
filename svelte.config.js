import 'dotenv/config';
import _ from 'lodash';
import adapter from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/kit/vite';
import translations from './src/lib/data/translations.js';
import {fetch} from 'undici';

const excl = [
  'misc.read_more',
  'access.close',
  'access.open',
  'access.next',
  'access.previous',
  'access.location',
  'access.online',
  'access.sign_up',
  'access.language',
  'access.date',
  'access.time',
];

const mainRoutes = {
  de: _.omit(translations['de'], excl),
  en: _.omit(translations['en'], excl),
};

const URL = 'https://cms.correlaid.org/graphql';

if (
  process.env.PUBLIC_ADAPTER === 'STATIC' &&
  process.env.PUBLIC_PRERENDER !== 'ALL'
) {
  throw Error('Env var ADAPTER=STATIC only allowed for PRERENDER=ALL');
}

function canBePrerendered(url) {
  return (
    url[0] === '/' &&
    url !== '/community/become-member/membership-application' &&
    url !== '/community/mitglied-werden/mitgliedsantrag'
  );
}

const queries = {
  blogs: `
  query BlogSlugs {
    Posts(sort: ["-pubdate"]) {
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
  query LcSlugs($language: String = "de-DE") {
	  Local_Chapters {
		  translations(filter: { languages_code: { code: { _eq: $language } } }) {
  			slug: city
  		}
  	}
  }
  `,
  events: `
  query EventSlugs {
    Events {
      slug
    }
  }
  `,
  projects: `
  query ProjectSlugs {
    Projects (filter : {subpage : {_eq:true}}){
      slug: project_id
    }
  }

  `,
};

console.log(
  'ADAPTER: ',
  process.env.PUBLIC_ADAPTER,
  ' PRERENDER: ',
  process.env.PUBLIC_PRERENDER,
);

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

  const response = await fetch(URL, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
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
  const postsResult = await queryCmsGraphQl(queries['blogs']);
  for (const post of postsResult['data']['Posts']) {
    addBlogRoutesWithLanguageFallback(routes, post['translations']);
  }
}

async function addLcRoutes(routes) {
  const germanResults = await queryCmsGraphQl(queries['lcs'], {
    language: 'de-DE',
  });
  for (const lc of germanResults['data']['Local_Chapters']) {
    for (const t of lc['translations']) {
      routes.push(`/community/correlaidx/${t.slug.toLowerCase()}`);
    }
  }
  const englishResults = await queryCmsGraphQl(queries['lcs'], {
    language: 'en-US',
  });
  for (const post of englishResults['data']['Local_Chapters']) {
    for (const t of post['translations']) {
      routes.push(`/en/community/correlaidx/${t.slug.toLowerCase()}`);
    }
  }
}

async function addProjectRoutes(routes) {
  const results = await queryCmsGraphQl(queries['projects']);
  for (const project of results['data']['Projects']) {
    routes.push(`/daten-nutzen/projekte/${project.slug}`);
    routes.push(`/en/using-data/projects/${project.slug}`);
  }
}

async function addEventRoutes(routes) {
  const results = await queryCmsGraphQl(queries['events']);
  for (const event of results['data']['Events']) {
    routes.push(`/veranstaltungen/${event.slug}`);
    routes.push(`/en/events/${event.slug}`);
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
    strict: true,
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
  },
  preprocess: vitePreprocess(),
};

export default config;
