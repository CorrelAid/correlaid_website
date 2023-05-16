export const blogQuery = `
query BlogQuery($language: String = "de-DE") {
	Posts(sort: "-pubdate") {
		pubdate
		title_image {
			id
			description
		}
		content_creators {
			Content_Creators_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					description
				}
				person {
					name
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						pronouns
					}
					website
					twitter
					linkedin
					mastodon
					github
					image {
						id
					}
				}
			}
		}
		translations {
			languages_code {
				code
			}
			title
			text
			image_alt
			slug
			teaser
		}
	}
}
`;
