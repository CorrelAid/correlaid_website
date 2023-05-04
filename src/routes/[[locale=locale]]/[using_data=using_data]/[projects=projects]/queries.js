export const projectOverviewQuery = `
query ProjectOverview($language: String = "de-DE") {
	Projects {
		status
		project_id
		Organizations {
			Organizations_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					languages_code {
						code
					}
					name
				}
			}
		}
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			title
			description
			summary
		}
		Local_Chapters {
			id
		}
	}
}
`;
