export const jobsOverviewQuery = `
query Jobs($status: [String] = ["published"]) {
	Jobs(filter: { status: { _in: $status }  }, sort: "deadline") {
        slug
		language
        deadline
        location
		FTE
		type
		salary
		tags
		translations {
			title
			summary
			languages_code {
				code
			}
		}
	}
}
`;
