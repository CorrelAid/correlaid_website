export const adminsAndOpsStructQuery = `
query AdminsAndOpsStructure($language: String = "de-DE") {
	Global_Administrators(sort: ["sort"]) {
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			position
			description
		}
		group
		person {
			translations(filter: { languages_code: { code: { _eq: $language } } }) {
				pronouns
			}
			email
			name
			website
			twitter
			linkedin
			github
			mastodon
			image {
				id
				description
			}
		}
	}

}
`;
