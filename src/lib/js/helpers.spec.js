import {getLastItem, getGroup} from './helpers';

describe('helper functions', () => {
  test('last uri element by getLastItem', () => {
    const exampleUri = '/one/two/three';
    expect(getLastItem(exampleUri)).equals('three');
  });

  test('last . seperated grou is extracted by getGroup', () => {
    const exampleString = 'navbar.home';
    expect(getGroup(exampleString)).equals('home');
  });
});
