export function parsePersonLinks(person) {
  const links = {};
  for (const link of ['website', 'twitter', 'linkedin', 'mastodon', 'github']) {
    if (link in person && person[link] !== null) {
      links[link] = person[link];
    }
  }
  return links;
}
