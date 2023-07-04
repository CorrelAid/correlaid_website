export function timeSplitEntries(entries, dateGetter) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function byDate(a, b) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  }

  const futureEntries = entries
    .filter((entry) => dateGetter(entry) >= today)
    .sort(byDate);
  const pastEntries = entries
    .filter((entry) => dateGetter(entry) < today)
    .sort(byDate)
    .reverse();

  return {
    past: pastEntries,
    future: futureEntries,
  };
}
