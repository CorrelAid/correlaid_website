export const jobDetailQuery = `
query Jobs($language: String = "de-DE", $status: [String] = ["published"], $slug: String) {
	Jobs(
		filter: {
			_and: [{ status: { _in: $status } }, { slug: { _eq: $slug } }]
		}
		sort : ["deadline"]
	) {
		slug 
		deadline
		location
		salary
		FTE
		tags
		language
		type
		translations {
			title
			summary
			description
			languages_code {
				code
			}
		}
		colleagues {
			People_id {
				translations(
					filter: { languages_code: { code: { _eq: $language } } }
				) {
					pronouns
				}
				name
				email
				twitter
				website
				linkedin
				mastodon
				github
				image {
					id
				}
			}
		}
	}
}
`;
