export const latestUpdatesQuery = `
query LatestUpdates(
	$language: String = "de-DE"
	$status: [String] = ["published"]
) {
	Blog_Posts(sort: ["-publication_datetime"], filter: { status: { _in: $status } }, limit: 4) {
		publication_datetime
		title_image {
			id
			description
		}
		content_creators {
			Content_Creators_id {
				person {
					name
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						pronouns
					}
				}
			}
		}

		translations {
			languages_code {
				code
			}
			image_alt
			title
			slug
			teaser
		}
	}
	Events(sort: ["date"], filter: {_and: [{date: {_gte: "$NOW"}}, { status: { _in: $status } }]}, limit: 4) {
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
			Local_Chapters_id(filter: { status: { _in: $status } }){
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
    Projects(filter:  {_and: [{ status: { _in: $status }}, {project_status: { _eq: "team_selection" }}]  }, limit: 4) {
		status
		project_id
		is_internal
		end_date_predicted
		end_date
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
			title
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
