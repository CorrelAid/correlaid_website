export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["192.png","512.png","apple-touch-icon.png","favicon.ico","fonts/roboto/roboto-v30-latin-300.woff","fonts/roboto/roboto-v30-latin-300.woff2","fonts/roboto/roboto-v30-latin-300italic.woff","fonts/roboto/roboto-v30-latin-300italic.woff2","fonts/roboto/roboto-v30-latin-700.woff","fonts/roboto/roboto-v30-latin-700.woff2","fonts/roboto/roboto-v30-latin-700italic.woff","fonts/roboto/roboto-v30-latin-700italic.woff2","fonts/roboto/roboto-v30-latin-italic.woff","fonts/roboto/roboto-v30-latin-italic.woff2","fonts/roboto/roboto-v30-latin-regular.woff","fonts/roboto/roboto-v30-latin-regular.woff2","icon.svg","manifest.webmanifest"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-1a8d1e61.js","imports":["_app/immutable/start-1a8d1e61.js","_app/immutable/chunks/index-22943c7f.js","_app/immutable/chunks/singletons-3e8f4859.js","_app/immutable/chunks/index-4edf398b.js","_app/immutable/chunks/helpers-042677df.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js'),
			() => import('./nodes/16.js'),
			() => import('./nodes/17.js'),
			() => import('./nodes/18.js'),
			() => import('./nodes/19.js'),
			() => import('./nodes/20.js'),
			() => import('./nodes/21.js'),
			() => import('./nodes/22.js'),
			() => import('./nodes/23.js'),
			() => import('./nodes/24.js'),
			() => import('./nodes/25.js'),
			() => import('./nodes/26.js'),
			() => import('./nodes/27.js'),
			() => import('./nodes/28.js')
		],
		routes: [
			{
				id: "/[[locale=locale]]/blog",
				pattern: /^(?:\/([^/]+))?\/blog\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 17 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/blog/[slug]",
				pattern: /^(?:\/([^/]+))?\/blog\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 18 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/coc",
				pattern: /^(?:\/([^/]+))?\/coc\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 19 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community",
				pattern: /^(?:\/([^/]+))?\/community\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 20 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/correlaidx",
				pattern: /^(?:\/([^/]+))?\/community\/correlaidx\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 22 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/volunteer_journeys",
				pattern: /^(?:\/([^/]+))?\/community\/volunteer_journeys\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 23 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/[founding_lc=founding_lc]",
				pattern: /^(?:\/([^/]+))?\/community\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"founding_lc","matcher":"founding_lc","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 21 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/data4good",
				pattern: /^(?:\/([^/]+))?\/data4good\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 24 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/data4good/nonprofits",
				pattern: /^(?:\/([^/]+))?\/data4good\/nonprofits\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 26 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/data4good/[projects=projects]",
				pattern: /^(?:\/([^/]+))?\/data4good\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"projects","matcher":"projects","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 25 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/newsletter",
				pattern: /^(?:\/([^/]+))?\/newsletter\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 27 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/podcast",
				pattern: /^(?:\/([^/]+))?\/podcast\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 28 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[imprint=imprint]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"imprint","matcher":"imprint","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 16 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[events=events]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"events","matcher":"events","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 14 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[contact=contact]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"contact","matcher":"contact","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[about=about]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"about","matcher":"about","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/knowledge_pool",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/knowledge_pool\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/mentoring",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/mentoring\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/tidy_tuesday",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/tidy_tuesday\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/workshops",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/workshops\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[events=events]/[slug=integer]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"events","matcher":"events","optional":false,"rest":false,"chained":false},{"name":"slug","matcher":"integer","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 15 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/[learning_r=learning_r]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false},{"name":"learning_r","matcher":"learning_r","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/[experts=experts]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false},{"name":"experts","matcher":"experts","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[about=about]/[group=group]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"about","matcher":"about","optional":false,"rest":false,"chained":false},{"name":"group","matcher":"group","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[docs=docs]/[slug]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"docs","matcher":"docs","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/__locale_locale__/_docs_docs_/_slug_/_server.js')
			},
			{
				id: "/[[locale=locale]]",
				pattern: /^(?:\/([^/]+))?\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: locale } = await import ('./entries/matchers/locale.js')
			const { match: founding_lc } = await import ('./entries/matchers/founding_lc.js')
			const { match: projects } = await import ('./entries/matchers/projects.js')
			const { match: imprint } = await import ('./entries/matchers/imprint.js')
			const { match: events } = await import ('./entries/matchers/events.js')
			const { match: education } = await import ('./entries/matchers/education.js')
			const { match: docs } = await import ('./entries/matchers/docs.js')
			const { match: contact } = await import ('./entries/matchers/contact.js')
			const { match: about } = await import ('./entries/matchers/about.js')
			const { match: integer } = await import ('./entries/matchers/integer.js')
			const { match: learning_r } = await import ('./entries/matchers/learning_r.js')
			const { match: experts } = await import ('./entries/matchers/experts.js')
			const { match: group } = await import ('./entries/matchers/group.js')
			return { locale, founding_lc, projects, imprint, events, education, docs, contact, about, integer, learning_r, experts, group };
		}
	}
};
