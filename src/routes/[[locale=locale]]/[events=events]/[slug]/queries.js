export const eventDetailQuery = `
query EventDetails($slug: String = "ringvorlesung-sose23", $language: String = "de-DE", $status: [String] = ["published"]) {
	Events(filter: {_and: [{ slug: { _eq: $slug } }, { status: { _in: $status } }]}) {
		id
		date
		start_time
		end_time
		end_date
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
			Local_Chapters_id (filter: { status: { _in: $status } }) {
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
