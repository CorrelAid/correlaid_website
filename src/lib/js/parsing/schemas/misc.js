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
