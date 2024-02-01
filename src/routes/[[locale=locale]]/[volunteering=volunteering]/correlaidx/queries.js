export const localChapterQuery = `
query LocalChapters($language: String = "de-DE", $status: [String] = ["published"]) {
	Local_Chapters(filter: { status: { _in: $status } }) {
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
