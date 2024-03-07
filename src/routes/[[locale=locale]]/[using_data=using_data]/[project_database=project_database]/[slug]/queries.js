export const projectDetailsQuery = `
query Project(
	$slug: String
	$language: String = "de-DE"
	$status: [String] = ["published"]
) {
	Projects(
		filter: {
			_and: [{ project_id: { _eq: $slug } }, { status: { _in: $status }  }]
		}
	) {
		status
		is_internal
		Podcast {
			soundcloud_link
		}
		Blog_Posts {
			Blog_Posts_id(filter: { status: { _in: $status } }) {
				translations {
					languages_code {
						code
					}
					slug
				}
			}
		}
		Projects_Outputs(filter: { is_public: { _eq: true } }) {
			url
			output_type
		}
		People {
			person_id {
				name
				translations {
					languages_code {
						code
					}
					pronouns
				}
				website
				twitter
				linkedin
				mastodon
				github
				image {
					id
				}
			}
		}
		Organizations {
			Organizations_id {
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					languages_code {
						code
					}
					name
					description
				}
			}
		}

		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			title
			description
			summary
			type
			data
		}
		Local_Chapters {
			Local_Chapters_id {
				id
				short_id
				translations(filter: { languages_code: { code: { _eq: $language } } }) {
					city
				}
			}
		}
	}
}
`;
