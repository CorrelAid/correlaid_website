export function unpack_events(event, date, part = false) {
  // deep copy
  const obj = JSON.parse(JSON.stringify(event));
  obj.date = date.date;
  obj.start_time = date.start_time;
  obj.end_time = date.end_time;
  if (part != false) {
    obj.title = event.title + `- Part ${part}`;
  }

  return obj;
}
