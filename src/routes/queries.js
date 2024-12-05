export const builderQuery = `
query ($page: String = "navbar.home", $language: String = "de-DE") {
	Pages(filter: { page_key: { _eq: $page } }) {
		builder {
			sort
			collection
			item {
				... on cta_groups {
                    ctas {
						ctas_id {
							button {
								color
								type
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
					}
				}
				... on ctas {
					button {
						color
						type
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

				... on custom_sections {
					key
				}
				... on wysiwyg {
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						content
					}
				}

				... on contacts {
					email
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
							description
						}
					}
				}

				... on quote_carousels {
					text_only
					quotes {
						quotes_id {
							image {
								id
								description
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
					color
					steps {
						timeline_steps_id {
							icon
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
						description
					}
					translations(
						filter: { languages_code: { code: { _eq: $language } } }
					) {
						text
						sub_text
						image_alt
					}
					buttons {
						buttons_id {
							color
							type
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
					translations(filter: { languages_code: { code: { _eq: $language } } }) {
						text
					}
				}
			}
		}
	}
}


`;
