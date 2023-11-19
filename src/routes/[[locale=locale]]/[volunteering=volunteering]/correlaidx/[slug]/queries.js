export const lcDetailsQuery = `
query LocalChapterDetails($slug: String, $language: String = "de-DE", $status: [String] = ["published"]) {
	Events(sort: ["date"], 
		filter: {
			local_chapters: {
				Local_Chapters_id: { short_id: { _eq: $slug } } 
			},
            date: {_gte: "$NOW"}
		}
	) {
		date
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
			Local_Chapters_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
	Local_Chapters(filter: { short_id: { _eq: $slug }  }) {
		Projects(
			filter: { Projects_id :{status: { _in: ["published", "published_anon"] } }}
		) {
			Projects_id{
				status
				is_internal
				subpage
				project_id
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
					Local_Chapters_id{
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
					twitter
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
