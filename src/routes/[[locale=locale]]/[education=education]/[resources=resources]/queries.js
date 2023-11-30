export const workshopQuery = `
query Workshops($language: String = "de-DE") {
	Workshops {
		name
		language
		teaser
		tags
		resource_link
		responsible_unit
		target_audience
		local_chapters {
			Local_Chapters_id {
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
