export const jobDetailQuery = `
query Jobs($status: [String] = ["published"], $slug: String) {
	Jobs(
		filter: {
			_and: [{ status: { _in: $status } }, { slug: { _eq: $slug } }]
		}
		sort : ["deadline"]
	) {
		slug 
		deadline
		location
		salary
		FTE
		tags
		language
		type
		translations {
			title
			summary
			description
			languages_code {
				code
			}
		}
	}
}
`;
