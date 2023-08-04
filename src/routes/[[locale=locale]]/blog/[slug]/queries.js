export const blogPostQuery = `
query BlogPostQuery(
	$slug: String
	$status: [String] = ["published"]
	$language: String = "de-DE"
) {
	Blog_Posts(
		filter: {
			_and: [
				{ translations: { slug: { _eq: $slug } } }
				{ status: { _in: $status } }
			]
		}
	) {
		publication_datetime
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
						description
						position
					}
					website
					twitter
					linkedin
					mastodon
					github
					image {
						id
						description
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
