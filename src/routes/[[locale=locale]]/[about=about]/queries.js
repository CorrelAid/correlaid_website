export const awardQuery = `
query Awards($language: String = "de-DE"){
	Awards(sort: ["-year"]) {
		image {
			id
			description
		}
		year
		translations(
		filter: { languages_code: { code: { _eq: $language } } }
	) {
			title
			image_alt
		}
	}
}
`;
