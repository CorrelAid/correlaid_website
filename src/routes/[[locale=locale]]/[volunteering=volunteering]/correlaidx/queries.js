export const localChapterQuery = `
query LocalChapters($language: String = "de-DE") {
	Local_Chapters {
		location
		founded
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			city
			description
		}
	}
}
`;
