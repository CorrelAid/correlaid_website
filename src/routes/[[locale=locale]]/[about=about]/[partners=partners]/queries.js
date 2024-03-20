export const partnerQuery = `
query Partners($language: String = "de-DE") {
	Partners(sort: ["sort"]) {
		name
		logo {
			id
		}
		type
		link
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			description
		}
	}
}
`;
