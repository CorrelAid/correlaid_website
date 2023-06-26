export const jobDetailQuery = `
query Jobs($language: String = "de-DE", $slug: String) {
	Jobs(
		filter: {
			_and: [{ status: { _eq: "published" } }, { slug: { _eq: $slug } }]
		}
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
