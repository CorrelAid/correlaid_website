export const workshopQuery = `
query Workshops($language: String = "de-DE") {
	Workshops {
		name
		language
		teaser
		resource_link
		responsible_unit
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
