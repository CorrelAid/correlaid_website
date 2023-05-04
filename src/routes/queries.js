export const pageContentQuery = `
query ($page: String = "navbar.home", $language: String = "de-DE") {
	Pages(filter: { page_key: { _eq: $page } }) {
		builder {
			sort
			collection
			item {
				... on cta_group {
					ctas {
						ctas_id {
							button {
								color
								translations(
									filter: { languages_code: { code: { _eq: "de-DE" } } }
								) {
									text
									link
								}
							}

							translations(
								filter: { languages_code: { code: { _eq: "de-DE" } } }
							) {
								text
							}
						}
					}
				}
				... on ctas {
					button {
						color
						translations(
							filter: { languages_code: { code: { _eq: $language } } }
						) {
							text
							link
						}
					}
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						text
					}
				}

				... on carousel {
					carousel_elements {
						carousel_element_id {
							translations(
								filter: { languages_code: { code: { _eq: $language } } }
							) {
								title
							}
							hero {
								height
								gradient_only
								image {
									id
								}
								translations(
									filter: { languages_code: { code: { _eq: $language } } }
								) {
									text
								}
								buttons {
									buttons_id {
										color
										translations(
											filter: { languages_code: { code: { _eq: $language } } }
										) {
											text
											link
										}
									}
								}
							}
						}
					}
				}

				... on custom_sections {
					id
				}
				... on wysiwyg {
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						content
					}
				}

				... on contacts {
					hr
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						position
						description
					}
					person {
						name
						translations(
							filter: { languages_code: { code: { _eq: $language } } }
						) {
							pronouns
						}
						email
						image {
							id
						}
					}
				}

				... on quote_carousel {
					text_only
					quotes {
						quote_id {
							image {
								id
							}
							translations(
								filter: { languages_code: { code: { _eq: $language } } }
							) {
								subtitle
								text
							}
						}
					}
				}
				... on timelines {
					steps {
						timeline_steps_id {
							translations(
								filter: { languages_code: { code: { _eq: $language } } }
							) {
								text
							}
						}
					}
				}

				... on heros {
					height
					gradient_only
					image {
						id
					}
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						text
					}
					buttons {
						buttons_id {
							color
							translations(
								filter: { languages_code: { code: { _eq: $language } } }
							) {
								text
								link
							}
						}
					}
				}
				... on buttons {
					color
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						text
						link
					}
				}
				... on icons {
					icon_type
					translations(filter: { languages_code: { code: { _eq: "de-DE" } } }) {
						text
					}
				}
			}
		}
	}
}
`;