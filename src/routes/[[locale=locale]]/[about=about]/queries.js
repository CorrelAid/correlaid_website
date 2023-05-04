export const awardQuery = `
query Awards{
	Awards(sort: ["-year"]) {
		image {
			id
		}
		year
		translations {
			title
			image_alt
		}
	}
}
`;
