export const icalEventQuery = `
query Events {
  Events(limit: -1, sort: ["date"], filter: {_and: [{date: {_gte: "$NOW"}}]}) {
    id
    date
    start_time
    end_time
    end_date
    title
    teaser
    target_group
    language
    type
    slug
    tags
    location
    online
  }
}
`;
