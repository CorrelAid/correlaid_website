export const jobsOverviewQuery = `
query Jobs {
	Jobs(filter: { status: { _eq: "published" }  }) {
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
