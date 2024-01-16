export const icalEventQuery = `
query Events {
  Events(sort: ["date"], filter: { local_chapters: { id : { _null: true }} }) {
    id
    date
    start_time
    end_time
    end_date
    title
    teaser
    registration_link
    target_group
    language
    type
    slug
    tags

  }
}
`;