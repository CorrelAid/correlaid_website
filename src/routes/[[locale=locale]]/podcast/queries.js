export const podcastQuery = `
query PodcastQuery($language: String = "de-DE") {
	Podcast_Episodes(sort: "-publication_datetime") {
		title
		soundcloud_link
		description
		language
		publication_datetime
		tags
    image {
			id
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
