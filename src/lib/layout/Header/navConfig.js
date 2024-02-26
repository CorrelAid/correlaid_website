export const topNav = [
  'navbar.events',
  'navbar.blog',
  'navbar.podcast',
  'navbar.newsletter',
];
export const botNav = [
  {
    key: 'navbar.using_data',
    category: 'using_data',
    children: [
      'navbar.using_data.projects',
      'navbar.using_data.project_database',
      'navbar.using_data.consulting',
      'navbar.using_data.hackathons',
    ],
  },
  {
    key: 'navbar.education',
    category: 'education',
    children: [
      'navbar.education.learning_r',
      'navbar.education.course_data',
      'navbar.education.mentoring',
      'navbar.education.tidy_tuesday',
      'navbar.education.resources',
    ],
  },
  {
    key: 'navbar.volunteering',
    category: 'volunteering',
    children: [
      'navbar.volunteering.correlaidx',
      'navbar.volunteering.volunteer_teams',
      // "navbar.volunteering.volunteer_journeys",
      'navbar.volunteering.become_member',
      'navbar.volunteering.founding_lc',
    ],
  },
  {
    key: 'navbar.about',
    category: 'about',
    children: [
      'navbar.about.team',
      'navbar.about.values',
      'navbar.about.partners',
    ],
  },
];
