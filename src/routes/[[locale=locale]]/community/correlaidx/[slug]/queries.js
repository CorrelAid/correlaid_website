export const lcDetailsQuery = `
query LocalChapterDetails($slug: String, $language: String = "de-DE") {
	Events(
		filter: {
			local_chapters: {
				Local_Chapters_id: { translations: { city: { _eq: $slug } } }
			}
		}
	) {
		date
		title
		teaser
		registration_link
		target_group
		language
		type
		slug
		tags
	}
	Local_Chapters(filter: { translations: { city: { _eq: $slug } } }) {
		Projects {
			Projects_id {
				status
				project_id
				Organizations {
					Organizations_id {
						translations(
							filter: { languages_code: { code: { _eq: $language } } }
						) {
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
			}
		}
		location
		hero_image {
			id
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
					email
					twitter
					website
					linkedin
					mastodon
					github
					image {
						id
					}
				}
			}
		}
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			city
			description
		}
	}
}
`;
