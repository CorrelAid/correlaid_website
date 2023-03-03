export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["192.png","512.png","apple-touch-icon.png","favicon.ico","fonts/roboto/roboto-v30-latin-300.woff","fonts/roboto/roboto-v30-latin-300.woff2","fonts/roboto/roboto-v30-latin-300italic.woff","fonts/roboto/roboto-v30-latin-300italic.woff2","fonts/roboto/roboto-v30-latin-700.woff","fonts/roboto/roboto-v30-latin-700.woff2","fonts/roboto/roboto-v30-latin-700italic.woff","fonts/roboto/roboto-v30-latin-700italic.woff2","fonts/roboto/roboto-v30-latin-italic.woff","fonts/roboto/roboto-v30-latin-italic.woff2","fonts/roboto/roboto-v30-latin-regular.woff","fonts/roboto/roboto-v30-latin-regular.woff2","icon.svg","manifest.webmanifest"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-d4c5f8cb.js","imports":["_app/immutable/start-d4c5f8cb.js","_app/immutable/chunks/index-4dab16f7.js","_app/immutable/chunks/singletons-834836a6.js","_app/immutable/chunks/helpers-ef738f4a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js'),
			() => import('../output/server/nodes/11.js'),
			() => import('../output/server/nodes/12.js'),
			() => import('../output/server/nodes/13.js'),
			() => import('../output/server/nodes/14.js'),
			() => import('../output/server/nodes/15.js'),
			() => import('../output/server/nodes/16.js'),
			() => import('../output/server/nodes/17.js'),
			() => import('../output/server/nodes/18.js'),
			() => import('../output/server/nodes/19.js'),
			() => import('../output/server/nodes/20.js'),
			() => import('../output/server/nodes/21.js'),
			() => import('../output/server/nodes/22.js'),
			() => import('../output/server/nodes/23.js'),
			() => import('../output/server/nodes/24.js'),
			() => import('../output/server/nodes/25.js'),
			() => import('../output/server/nodes/26.js'),
			() => import('../output/server/nodes/27.js'),
			() => import('../output/server/nodes/28.js'),
			() => import('../output/server/nodes/29.js')
		],
		routes: [
			{
				id: "/[[locale=locale]]/blog",
				pattern: /^(?:\/([^/]+))?\/blog\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 18 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/blog/[slug]",
				pattern: /^(?:\/([^/]+))?\/blog\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 19 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/coc",
				pattern: /^(?:\/([^/]+))?\/coc\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 20 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community",
				pattern: /^(?:\/([^/]+))?\/community\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 21 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/correlaidx",
				pattern: /^(?:\/([^/]+))?\/community\/correlaidx\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 24 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/correlaidx/[slug]",
				pattern: /^(?:\/([^/]+))?\/community\/correlaidx\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 25 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/volunteer_journeys",
				pattern: /^(?:\/([^/]+))?\/community\/volunteer_journeys\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 26 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/[founding_lc=founding_lc]",
				pattern: /^(?:\/([^/]+))?\/community\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"founding_lc","matcher":"founding_lc","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 23 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/community/[become_member=become_member]",
				pattern: /^(?:\/([^/]+))?\/community\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"become_member","matcher":"become_member","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 22 },
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
				id: "/[[locale=locale]]/team",
				pattern: /^(?:\/([^/]+))?\/team\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 29 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[projects_consulting=projects_consulting]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"projects_consulting","matcher":"projects_consulting","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 14 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[imprint=imprint]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"imprint","matcher":"imprint","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[events=events]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"events","matcher":"events","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[contact=contact]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"contact","matcher":"contact","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[about=about]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"about","matcher":"about","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/mentoring",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/mentoring\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/oer",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/oer\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/tidy_tuesday",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/tidy_tuesday\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/workshops",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/workshops\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[projects_consulting=projects_consulting]/[projects=projects]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"projects_consulting","matcher":"projects_consulting","optional":false,"rest":false,"chained":false},{"name":"projects","matcher":"projects","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 17 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[projects_consulting=projects_consulting]/[hackathons=hackathons]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"projects_consulting","matcher":"projects_consulting","optional":false,"rest":false,"chained":false},{"name":"hackathons","matcher":"hackathons","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 16 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[projects_consulting=projects_consulting]/[consulting=consulting]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"projects_consulting","matcher":"projects_consulting","optional":false,"rest":false,"chained":false},{"name":"consulting","matcher":"consulting","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 15 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[education=education]/[learning_r=learning_r]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"education","matcher":"education","optional":false,"rest":false,"chained":false},{"name":"learning_r","matcher":"learning_r","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[events=events]/[slug]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"events","matcher":"events","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/[[locale=locale]]/[docs=docs]/[slug]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true},{"name":"docs","matcher":"docs","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/__locale_locale__/_docs_docs_/_slug_/_server.js')
			},
			{
				id: "/[[locale=locale]]",
				pattern: /^(?:\/([^/]+))?\/?$/,
				params: [{"name":"locale","matcher":"locale","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: locale } = await import ('../output/server/entries/matchers/locale.js')
			const { match: founding_lc } = await import ('../output/server/entries/matchers/founding_lc.js')
			const { match: become_member } = await import ('../output/server/entries/matchers/become_member.js')
			const { match: projects_consulting } = await import ('../output/server/entries/matchers/projects_consulting.js')
			const { match: imprint } = await import ('../output/server/entries/matchers/imprint.js')
			const { match: events } = await import ('../output/server/entries/matchers/events.js')
			const { match: education } = await import ('../output/server/entries/matchers/education.js')
			const { match: contact } = await import ('../output/server/entries/matchers/contact.js')
			const { match: about } = await import ('../output/server/entries/matchers/about.js')
			const { match: projects } = await import ('../output/server/entries/matchers/projects.js')
			const { match: hackathons } = await import ('../output/server/entries/matchers/hackathons.js')
			const { match: consulting } = await import ('../output/server/entries/matchers/consulting.js')
			const { match: learning_r } = await import ('../output/server/entries/matchers/learning_r.js')
			const { match: docs } = await import ('../output/server/entries/matchers/docs.js')
			return { locale, founding_lc, become_member, projects_consulting, imprint, events, education, contact, about, projects, hackathons, consulting, learning_r, docs };
		}
	}
};
