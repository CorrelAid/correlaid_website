import 'dotenv/config';
import _ from 'lodash';
import adapter from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/kit/vite';
import translations from './src/lib/data/translations.js';
import axios from 'axios';

const mainRoutes = {
  de: _.omit(translations['de'], ['misc.report', 'misc.output']),
  en: _.omit(translations['en'], ['misc.report', 'misc.output']),
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
    url !== '/community/become_member/membership_application' &&
    url !== '/community/mitglied_werden/mitgliedsantrag'
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

async function addBlogRoutes(routes) {
  const postsResult = await axios.post(URL, {
    query: queries['blogs'],
  });
  for (const post of postsResult.data['data']['Posts']) {
    addBlogRoutesWithLanguageFallback(routes, post['translations']);
  }
}

async function addLcRoutes(routes) {
  const germanResults = await axios.post(URL, {
    query: queries['lcs'],
    vars: {language: 'de-DE'},
  });
  for (const lc of germanResults.data['data']['Local_Chapters']) {
    for (const t of lc['translations']) {
      routes.push(`/community/correlaidx/${t.slug}`);
    }
  }
  const englishResults = await axios.post(URL, {
    query: queries['lcs'],
    vars: {language: 'en-US'},
  });
  for (const post of englishResults.data['data']['Local_Chapters']) {
    for (const t of post['translations']) {
      routes.push(`/en/community/correlaidx/${t.slug}`);
    }
  }
}

async function addProjectRoutes(routes) {
  const results = await axios.post(URL, {
    query: queries['projects'],
  });
  for (const project of results.data['data']['Projects']) {
    routes.push(`/daten_nutzen/projekte/${project.slug}`);
    routes.push(`/en/using_data/projects/${project.slug}`);
  }
}

async function addEventRoutes(routes) {
  const results = await axios.post(URL, {
    query: queries['events'],
  });
  for (const event of results.data['data']['Events']) {
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
} else {
  prerenderRoutes.push('*');
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter:
      process.env.PUBLIC_ADAPTER === 'STATIC'
        ? adapterStatic({
            pages: '.svelte-kit/cloudflare',
            assets: '.svelte-kit/cloudflare',
            fallback: null,
            precompress: false,
            strict: true,
          })
        : adapter({
            routes: {
              include: ['/*'],
              exclude: ['<all>'],
            },
          }),
    prerender: {
      entries: 
        process.env.PUBLIC_PRERENDER === 'ALL' ? prerenderRoutes : ['*'],
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
