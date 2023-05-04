export const projectDetailsQuery = `
query Project($slug: String, $language: String = "de-DE") {
	Projects(filter: { project_id: { _eq: $slug } }) {
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
			id
		}
	}
}
`;
