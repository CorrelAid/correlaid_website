export const eventDetailQuery = `
query EventDetails($slug: String = "ringvorlesung-sose23", $language: String = "de-DE") {
	Events(filter: { slug: { _eq: $slug } }) {
		id
		date
		start_time
		end_time
		registration_link
		target_group
		language
		description
		teaser
		type
		online
		title
		location
		tags
		local_chapters {
			Local_Chapters_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
