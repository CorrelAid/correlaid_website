export const latestUpdatesQuery = `
query LatestUpdates($language: String = "de-DE") {
	Posts(sort: ["-pubdate"]) {
		pubdate
		title_image {
			id
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
			title
			text
			tags
			slug
			teaser
		}
	}
	Events(sort: ["-date"]) {
		id
		date
		start_time
		end_time
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

	Podcast_Episodes(sort: "-publication_datetime") {
		title
		soundcloud_link
		description
		language
		publication_datetime
		tags
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
	}
}
`;
