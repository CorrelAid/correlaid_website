import {validateVars} from './directusFetch.js';

describe('variable validation', () => {
  test("Allowed variabled don't throw error", () => {
    const exampleVars = {
      page: 0,
      language: 1,
      slug: 2,
    };
    validateVars(exampleVars);
  });

  test('last . seperated grou is extracted by getGroup', () => {
    const exampleVars = {
      page: 0,
      unallowedVariableName: 1,
      slug: 2,
    };
    expect(() => validateVars(exampleVars)).toThrowError();
  });
});
