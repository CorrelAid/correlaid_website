export const partnerQuery = `
query Partners($language: String = "de-DE") {
	Partner {
		name
		logo {
			id
		}
		link
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			description
		}
	}
}
`;
