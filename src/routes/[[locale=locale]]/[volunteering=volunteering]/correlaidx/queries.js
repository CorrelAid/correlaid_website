export const localChapterQuery = `
query LocalChapters($language: String = "de-DE") {
	Local_Chapters {
		location
		founded
		short_id
		translations(filter: { languages_code: { code: { _eq: $language } } }) {
			city
			description
		}
	}
}
`;
