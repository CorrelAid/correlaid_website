export const blogPostQuery = `
query BlogPostQuery($slug: String, $language: String = "de-DE") {
	Posts(filter: { translations: { slug: { _eq: $slug } } }) {
		pubdate
		title_image {
			id
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
		translations(filter: { slug: { _neq: null } }) {
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
