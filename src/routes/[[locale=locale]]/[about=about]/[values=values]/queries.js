export const adminQuery = `
query Admins($language: String = "de-DE") {
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
			github
			twitter
			linkedin
			mastodon
			image {
				id
				description
			}
		}
	}
}
`;
