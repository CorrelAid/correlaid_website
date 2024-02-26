import {projects} from './cards.js';

describe('project card parsing and anonymization', () => {
  const anonProject = {
    status: 'published_anon',
    subpage: false,
    project_id: 'Some project id',
    end_date: '2022-01-01T00:00:00.000Z',
    is_internal: false,
    Podcast: null,
    Blog_Posts: [],
    Projects_Outputs: [],
    Organizations: [
      {
        Organizations_id: {
          translations: [
            {
              languages_code: {
                code: 'de-DE',
              },
              name: 'Non-public organization name',
            },
          ],
        },
      },
    ],
    translations: [
      {
        title: 'Public project title',
        languages_code: {
          code: 'de-DE',
        },
        description: '',
        summary: null,
      },
    ],
    Local_Chapters: [],
  };

  const publishedProject = {
    status: 'published',
    subpage: false,
    end_date: '2022-01-01T00:00:00.000Z',
    project_id: 'Another project id',
    is_internal: false,
    Podcast: null,
    Blog_Posts: [],
    Projects_Outputs: [],
    Organizations: [
      {
        Organizations_id: {
          translations: [
            {
              languages_code: {
                code: 'de-DE',
              },
              name: 'Public organization name',
            },
          ],
        },
      },
    ],
    translations: [
      {
        languages_code: {
          code: 'de-DE',
        },
        title: 'Another public project title',
        description: '',
        summary: null,
      },
    ],
    Local_Chapters: [],
  };

  const internalProject = {
    status: 'published',
    subpage: false,
    project_id: 'Internal project id',
    is_internal: true,
    end_date: '2022-01-01T00:00:00.000Z',
    Podcast: null,
    Blog_Posts: [],
    Projects_Outputs: [],
    Organizations: [],
    translations: [
      {
        languages_code: {
          code: 'de-DE',
        },
        title: 'Internal project title',
        description: '',
        summary: null,
      },
    ],
    Local_Chapters: [],
  };

  const params = {
    locale: 'de',
  };

  test('parse anonymous', () => {
    const parsedProjectCard = projects(anonProject, params);

    expect(parsedProjectCard.organization).toEqual('Anonyme Organisation');
    expect(parsedProjectCard.title).toEqual('Public project title');
    expect(parsedProjectCard.subpage).toEqual(false);
  });

  test('parse published', () => {
    const parsedProjectCard = projects(publishedProject, params);

    expect(parsedProjectCard.organization).toEqual('Public organization name');
    expect(parsedProjectCard.title).toEqual('Another public project title');
    expect(parsedProjectCard.subpage).toEqual(false);
  });

  test('parse anonymous with subpage', () => {
    const anonProjectWithSubpage = {...anonProject, subpage: true};
    const parsedProjectCard = projects(anonProjectWithSubpage, params);

    expect(parsedProjectCard.organization).toEqual('Anonyme Organisation');
    expect(parsedProjectCard.title).toEqual('Public project title');
    expect(parsedProjectCard.subpage).toEqual(true);
    expect(parsedProjectCard.projectId).toEqual('Some project id');
  });

  test('parse internal project', () => {
    const parsedProjectCard = projects(internalProject, params);
    expect(parsedProjectCard.organization).toEqual('Internes Projekt');
    expect(parsedProjectCard.isInternal).toBeTruthy();
  });
});
