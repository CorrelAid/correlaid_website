import {unpack_events} from './data_processing.js';

describe('unpacking should make hard copies', () => {
  const date = {
    date: '2022-01-01',
    start_time: '09:00',
    end_time: '17:00',
  };

  const eventObject = {
    title: 'test event',
    eventInfo: 'initial info',
  };

  test('part processing', () => {
    const unpackedEvent = unpack_events(eventObject, date, true);
    unpackedEvent.eventInfo = 'updated info';
    expect(eventObject.eventInfo).equals('initial info');
    expect(unpackedEvent.date).equals(date.date);
    expect(unpackedEvent.start_time).equals(date.start_time);
    expect(unpackedEvent.end_time).equals(date.end_time);
    expect(unpackedEvent.title).equals(eventObject.title + '- Part true');
  });

  test('full processing', () => {
    const unpackedEvent = unpack_events(eventObject, date, false);
    unpackedEvent.eventInfo = 'updated info';
    expect(eventObject.eventInfo).equals('initial info');
    expect(unpackedEvent.date).equals(date.date);
    expect(unpackedEvent.start_time).equals(date.start_time);
    expect(unpackedEvent.end_time).equals(date.end_time);
    expect(unpackedEvent.title).equals(eventObject.title);
  });
});
