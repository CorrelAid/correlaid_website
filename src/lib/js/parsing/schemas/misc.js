import * as yup from 'yup';
import {peopleSchema} from './schemaHelpers.js';
import {eventsSchema, projectsSchema} from './cards.js';
import {herosSchema} from './builder.js';

export const localChaptersMapSchema = yup.object({
  type: yup.string().required(),
  features: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object({
        type: yup.string().required(),
        geometry: yup.object(),
        properties: yup.object({
          founded: yup.number().required(),
          name: yup.string().required(),
          href: yup.string().required(),
        }),
      }),
    ),
});

export const localChapterPageSchema = yup.object({
  localAdministrators: yup.array().of(peopleSchema),
  events: yup.array().of(eventsSchema),
  projects: yup.array().of(projectsSchema),
  hero: herosSchema,
  description: yup.string().nullable(),
  iconText: yup.string().nullable(),
});

export const icalSchema = yup.array().of(
  yup.object({
    id: yup.string().uuid().required(),
    start: yup.date().required(),
    end: yup.date().required(),
    category: yup.string().required(),
    summary: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().nullable(),
    organizer: yup.string().required(),
    url: yup.string().url().required(),
  }),
);

export const rssSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(300, 'Title must be at most 300 characters long'),
  author: yup
    .string()
    .required('Author is required')
    .max(100, 'Author name must be at most 100 characters long'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  link: yup
    .string()
    .required('Link is required')
    .url('Link must be a valid URL'),
  language: yup.string().required('language is required'),
  pubDate: yup.string().required('pubDate is required'),
});
