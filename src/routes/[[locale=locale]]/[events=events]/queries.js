export const eventQuery = `
query Events($language: String = "de-DE", $status: [String] = ["published"]) {
	Events(sort: ["date"], filter: { status: { _in: $status } }) {
		id
		date
		start_time
		end_time
		end_date
		title
		teaser
		registration_link
		target_group
		language
		type
		slug
		tags
		local_chapters {
			Local_Chapters_id(filter: { status: { _in: $status } }) {
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
