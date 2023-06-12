import {projects} from './cards.js';

describe('project card parsing and anonymization', () => {
  const anonProject = {
    status: 'published_anon',
    subpage: false,
    project_id: 'Some project id',
    Podcast: null,
    Posts: [],
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
        description: '',
        summary: null,
      },
    ],
    Local_Chapters: [],
  };

  const publishedProject = {
    status: 'published',
    subpage: false,
    project_id: 'Another project id',
    Podcast: null,
    Posts: [],
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
        title: 'Another public project title',
        description: '',
        summary: null,
      },
    ],
    Local_Chapters: [],
  };

  test('parse anonymous', () => {
    const parsedProjectCard = projects(anonProject);

    expect(parsedProjectCard.organization).toBeUndefined();
    expect(parsedProjectCard.title).toEqual('Public project title');
    expect(parsedProjectCard.subpage).toEqual(false);
  });

  test('parse published', () => {
    const parsedProjectCard = projects(publishedProject);

    expect(parsedProjectCard.organization).toEqual('Public organization name');
    expect(parsedProjectCard.title).toEqual('Another public project title');
    expect(parsedProjectCard.subpage).toEqual(false);
  });

  test('parse anonymous with subpage', () => {
    const anonProjectWithSubpage = {...anonProject, subpage: true};
    const parsedProjectCard = projects(anonProjectWithSubpage);

    expect(parsedProjectCard.organization).toBeUndefined();
    expect(parsedProjectCard.title).toEqual('Public project title');
    expect(parsedProjectCard.subpage).toEqual(true);
    expect(parsedProjectCard.project_id).toEqual('Some project id');
  });
});
