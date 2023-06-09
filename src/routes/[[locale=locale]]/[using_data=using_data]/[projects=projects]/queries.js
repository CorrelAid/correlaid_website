export const projectOverviewQuery = `
query ProjectOverview($language: String = "de-DE") {
	Projects(filter: { status: { _eq: "published" } }) {
		status
		subpage
		project_id
		Podcast {
			language
			soundcloud_link
			title
		}
		Posts {
			Posts_id {
				id
				translations {
					languages_code {
						code
					}
					title
					slug
				}
			}
		}
		Projects_Outputs(filter: { is_public: { _eq: true } }) {
			url
			output_type
		}
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
			Local_Chapters_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
