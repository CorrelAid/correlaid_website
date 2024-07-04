import * as yup from 'yup';
import {localChaptersSchema} from './cards.js';
import {peopleSchema, peopleLinksSchema} from './schemaHelpers.js';

export const eventSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  teaser: yup.string().required(),
  date: yup.string().required(),
  language: yup.string().required(),
  localChapters: yup.array().of(localChaptersSchema),
  endDate: yup.string().nullable(),
  startTime: yup.string(),
  endTime: yup.string(),
  registrationLink: yup.string().nullable(),
  location: yup.string().nullable(),
  target_group: yup.string(),
  tags: yup.array().required().min(1).of(yup.string()),
  online: yup.boolean().required(),
});

export const blogPostSchema = yup.object({
  title: yup.string().required(),
  text: yup.string().required(),
  imageSrc: yup.string().required(),
  imageAlt: yup.string().required(),
  teaser: yup.string().required(),
  pubDate: yup.string().required(),
  contentCreators: yup
    .array()
    .required()
    .min(1)
    .of(
      peopleSchema.shape({
        position: yup.string(),
        email: yup.string().nullable(),
      }),
    ),
  imageDesc: yup.string().nullable(),
  languages: yup.array().required().min(1).of(yup.string()),
});

export const projectSchema = yup.object({
  title: yup.string().required(),
  dataTypes: yup.array().required().min(1).of(yup.string()),
  projectTypes: yup.array().required().min(1).of(yup.string()),
  isInternal: yup.boolean().required(),
  organization: yup.string().required(),
  summary: yup.string().required(),
  description: yup.string(),
  procLocalChapters: yup.array().of(localChaptersSchema),
  localChapterNames: yup.array().of(yup.string()),
  organization: yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
    })
    .required(),
  projectContacts: yup
    .array()
    .required()
    .of(
      yup.object({
        email: yup.string(),
        links: peopleLinksSchema,
        name: yup.string().required(),
      }),
    ),
  projectOutputs: yup.array().of(
    yup.object({
      url: yup.string().required(),
      outputType: yup.string().required(),
      outputNumber: yup.number().required(),
    }),
  ),
});

export const jobSchema = yup.object({
  title: yup.string().required(),
  summary: yup.string().required(),
  location: yup.string().required(),
  language: yup
    .string()
    .required()
    .matches(/(german|english)/),
  procDeadline: yup.string().required(),
  salary: yup.string().required(),
  fte: yup.string().required(),
  jobType: yup.string().required(),
  tags: yup.array().of(yup.string()).required(),
  href: yup.string().required(),
  description: yup.string().required(),
});
