export const partnerQuery = `
query Partners($language: String = "de-DE") {
	Partners(sort: ["sort"]) {
		name
		logo {
			id
		}
		type
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			description
		}
	}
}
`;
