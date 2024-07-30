export const blogQuery = `
query BlogQuery(
	$language: String = "de-DE"
	$status: [String] = ["published"]
) {
	Blog_Posts(sort: "-publication_datetime", filter: {_and: [{status: {_in: $status}}, {translations: {languages_code: {code: {_eq: $language}}}}]}) {
		publication_datetime
		title_image {
			id
			description
		}
		content_creators {
			Content_Creators_id {
				person {
					name
				}
			}
		}
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			title
			text
			slug
			teaser
		}
	}
}
`;
