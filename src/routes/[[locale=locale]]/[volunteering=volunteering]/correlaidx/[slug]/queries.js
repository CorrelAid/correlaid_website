export const lcDetailsQuery = `
query LocalChapterDetails($slug: String, $language: String = "de-DE", $status: [String] = ["published"]) {
	Events(sort: ["date"], 
		filter: { _and: [{
			
		
			local_chapters: {
				Local_Chapters_id: { short_id: { _eq: $slug } } 
			}},
            {date: {_gte: "$NOW"}}, { status: { _in: $status } }]
		}
	) {
		date
		end_date
		title
		teaser
		id
		registration_link
		target_group
		language
		type
		slug
		tags
		local_chapters {
			Local_Chapters_id {
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
	Local_Chapters(filter: {_and: [{ status: { _in: $status } }, { short_id: { _eq: $slug }  } ]}) {
		Projects(
			filter: { Projects_id :{ status: { _in: $status } }}
		) {
			Projects_id{
				end_date
				project_status
				application_link
				status
				is_internal
				end_date
				end_date_predicted
				project_id
				data_types
				project_types
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
				Projects_Outputs {
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
					teaser
				}
				Local_Chapters {
					Local_Chapters_id{
						short_id
						translations(filter: { languages_code: { code: { _eq: $language }}}){
							city
						}
					}
					
				}
			}
		}
		location
		hero_image {
			id
			description
		}
		founded
		lc_email
		short_id
		local_administrators {
			Local_Administrators_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					position
					description
				}

				person {
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						pronouns
					}
					name
										website
					linkedin
					mastodon
					github
					image {
						id
						description
					}
				}
			}
		}
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			city
			description
			hero_image_alt
			how_to_get_in_touch
		}
	}
}
`;
