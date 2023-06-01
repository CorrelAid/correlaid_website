export const projectDetailsQuery = `
query Project($slug: String, $language: String = "de-DE") {
	Projects(filter: { project_id: { _eq: $slug } }) {
		Podcast {
			soundcloud_link
		}
		Posts {
			Posts_id {
				translations {
					languages_code {
						code
					}
					slug
				}
			}
		}
		Projects_Outputs {
			url
			output_type
		}
		People {
			People_id {
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
		}
		Local_Chapters {
			Local_Chapters_id{
                id
                translations(filter: { languages_code: { code: { _eq: $language } } }) {
                    city
                }
            }

			
		}
	}
}
`;
