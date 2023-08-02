export const expertsQuery = `
query Experts($language: String = "de-DE") {
	Experts {
		person {
			translations(filter: { languages_code: { code: { _eq: $language } } }) {
				pronouns
			}
			name
			website
			twitter
			linkedin
			mastodon
			github
			image {
				id
				description
			}
		}
		translations {
			area_of_expertise
			description
		}
	}
}
`;
