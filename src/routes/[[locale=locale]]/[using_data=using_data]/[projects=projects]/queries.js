export const projectOverviewQuery = `
query ProjectOverview($language: String = "de-DE", $status: [String] = ["published"]) {
	Projects(filter: { status: { _in: ["published", "published_anon"] } }) {
		status
		subpage
		project_id
		is_internal
		Podcast {
			language
			soundcloud_link
			title
		}
		Posts {
			Posts_id(filter: { status: { _in: $status } }) {
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
