import {filterStringSearch, filterByMultiple} from './filter';

describe('filters', () => {
  const objects = [
    {
      slug: 'girls-day-23',
      title: "Girls' Day: Dein Einstieg in die Datenwissenschaft",
      teaser:
        'Data Science klingt irgendwie abgefahren, zu sehr nach Mathe und Statistik und sehr weit weg? Das ist es nicht und muss es nicht sein! Wäre es zum Beispiel nicht praktisch, Deine Taschengeldeinnahmen und Ausgaben grafisch darstellen können? Und das können wir mit Data Science!',
      date: '2023-04-27T00:00:00.000Z',
      tags: ['Data Literacy', 'Feminism'],
      type: 'talk',
      language: 'de-DE',
      correlaidx: ['Konstanz'],
    },
    {
      slug: 'correlaidx-austria-workshop-3',
      title: 'Visualisation of Global Fishing Watch Data I ',
      teaser:
        'We invite you to free workshops around data visualization and modeling.',
      date: '2023-05-23T00:00:00.000Z',
      tags: ['Data Visualization'],
      type: 'workshop',
      language: 'en-US',
      correlaidx: ['Österreich'],
    },
  ];

  test('filter by search term', () => {
    const searchTerm = 'Fishing';
    const searchOptions = [
      {searchProperty: 'title', multiple: false},
      {searchProperty: 'tags', multiple: true},
      {searchProperty: 'teaser', multiple: false},
    ];

    const filteredObjects = filterStringSearch(
      searchTerm,
      searchOptions,
      objects,
    );

    expect(filteredObjects).toEqual([
      {
        slug: 'correlaidx-austria-workshop-3',
        title: 'Visualisation of Global Fishing Watch Data I ',
        teaser:
          'We invite you to free workshops around data visualization and modeling.',
        date: '2023-05-23T00:00:00.000Z',
        tags: ['Data Visualization'],
        type: 'workshop',
        language: 'en-US',
        correlaidx: ['Österreich'],
      },
    ]);
  });

  test('filter  by multiple items', () => {
    const filterValues = ['österreich'];
    const property = 'correlaidx';

    const filteredData = filterByMultiple(objects, filterValues, property);

    expect(filteredData).toEqual([
      {
        slug: 'correlaidx-austria-workshop-3',
        title: 'Visualisation of Global Fishing Watch Data I ',
        teaser:
          'We invite you to free workshops around data visualization and modeling.',
        date: '2023-05-23T00:00:00.000Z',
        tags: ['Data Visualization'],
        type: 'workshop',
        language: 'en-US',
        correlaidx: ['Österreich'],
      },
    ]);
  });
});
