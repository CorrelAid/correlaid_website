import {getLastItem, getGroup, genDate} from './helpers';

describe('helper functions', () => {
  test('last uri element by getLastItem', () => {
    const exampleUri = '/one/two/three';
    expect(getLastItem(exampleUri)).equals('three');
  });

  test('last . seperated grou is extracted by getGroup', () => {
    const exampleString = 'navbar.home';
    expect(getGroup(exampleString)).equals('home');
  });

  test('genDate', () => {
    const date = '2023-04-28T00:20:00';

    expect(genDate(date, 'de', true)).toBe('28. April 2023');
    expect(genDate(date, 'en', true)).toBe('April 28, 2023');
    expect(genDate(date, 'de', false)).toBe('28. April');
    expect(genDate(date, 'en', false)).toBe('April 28');

    const date2 = '2023-05-01T00:00:00';

    expect(genDate(date2, 'de', true)).toBe('1. Mai 2023');
    expect(genDate(date2, 'en', true)).toBe('May 1, 2023');
    expect(genDate(date2, 'de', false)).toBe('1. Mai');
    expect(genDate(date2, 'en', false)).toBe('May 1');
  });
});
