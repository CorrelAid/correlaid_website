export const projectOverviewQuery = `
query ProjectOverview($language: String = "de-DE", $status: [String] = ["published"]) {
	Projects(filter: { status: { _in: $status }  }) {
		status
		subpage
		project_id
		is_internal
		Podcast {
			language
			soundcloud_link
			title
		}
		Blog_Posts {
			Blog_Posts_id(filter: { status: { _in: $status } }) {
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
				sector
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					languages_code {
						code
					}
					name
				}
			}
		}
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			languages_code {
				code
			}
			title
			description
			summary
			type
			data
		}
		Local_Chapters {
			Local_Chapters_id (filter: { status: { _in: $status } }){
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
