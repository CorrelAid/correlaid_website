export const icalLcEvents = `
query icalLcEvents($slug: String, $language: String = "de-DE") {
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
		id
	}
	Local_Chapters(filter: { short_id: { _eq: $slug }  }) {
		lc_email	
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			city
		}
	}
}
`;
