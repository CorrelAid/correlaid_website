export const latestUpdatesQuery = `
query LatestUpdates(
	$language: String = "de-DE"
	$status: [String] = ["published"]
) {
	Blog_Posts(sort: ["-publication_datetime"], filter: { status: { _in: $status } }) {
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
	Events(sort: ["date"], filter: {date: {_gte: "$NOW"}}) {
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
			Local_Chapters_id {
				short_id
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
    image {
			id
			description
		}
		image_alt
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
