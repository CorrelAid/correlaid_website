import * as yup from 'yup';
import {peopleSchema} from './schemaHelpers';

export const localChaptersSchema = yup.object({
  city: yup.string().required(),
  href: yup.string().required(),
});

export const contentCreatorsSchema = yup
  .array()
  .required()
  .min(1)
  .of(
    yup.object({
      name: yup.string().required(),
    }),
  );

export const blogPostsSchema = yup.object({
  langs: yup.array().required().min(1).of(yup.string()),
  pubDate: yup.string().required(),
  href: yup
    .string()
    .matches(/^(?!.*undefined).*$/, {excludeEmptyString: true})
    .required(),
  imageAlt: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  imageSrc: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: contentCreatorsSchema,
});

export const podcastEpisodesSchema = yup.object({
  langs: yup.array().required().min(1).of(yup.string()),
  pubDate: yup.string().required(),
  href: yup.string().url().required(),
  imageAlt: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  imageSrc: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: contentCreatorsSchema,
});

export const eventsSchema = yup.object({
  href: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  date: yup.date().required(),
  procDate: yup.string().required(),
  tags: yup.array().required().min(1).of(yup.string()),
  type: yup.string().required(),
  language: yup.string().required(),
  procLocalChapters: yup.array().of(localChaptersSchema),
  localChapterNames: yup.array().of(yup.string()),
  endDate: yup.string().nullable(),
});

export const projectsSchema = yup.object({
  title: yup.string().required(),
  dataTypes: yup.array().required().min(1).of(yup.string()),
  projectTypes: yup.array().required().min(1).of(yup.string()),
  teamSelection: yup.bool().required(),
  organizationSector: yup.string().nullable(),
  isInternal: yup.boolean().required(),
  endDate: yup.date().required(),
  organization: yup.string().required(),
  summary: yup.string().required(),
  procLocalChapters: yup.array().of(localChaptersSchema),
  localChapterNames: yup.array().of(yup.string()),
  href: yup.string().required(),
  organization: yup.string().required(),
  projectOutputs: yup.array().of(
    yup.object({
      url: yup.string().required(),
      outputType: yup.string().required(),
      outputNumber: yup.number().required(),
    }),
  ),
});

export const expertsSchema = peopleSchema.shape({
  email: yup.string().email(),
});

export const workshopsSchema = yup.object({
  title: yup.string().required(),
  tags: yup.array().required().min(1).of(yup.string()),
  teaser: yup.string().required(),
  targetAudiences: yup.array().required().min(1).of(yup.string().required()),
  procRespUnits: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object({
        name: yup.string().required(),
        href: yup.string().required(),
      }),
    ),
  respUnitNames: yup.array().required().min(1).of(yup.string().required()),
  language: yup.string().required(),
  href: yup.string().required(),
});

export const awardsSchema = yup.object({
  title: yup.string().required(),
  imageSrc: yup.string().required(),
  imageAlt: yup.string().required(),
  imageDesc: yup.string().nullable(),
  year: yup.number().required(),
});

export const administratorsSchema = peopleSchema;

export const partnersSchema = yup.object({
  name: yup.string().required(),
  imageSrc: yup.string().required(),
  description: yup.string().required(),
});

export const jobsSchema = yup.object({
  title: yup.string().required(),
  summary: yup.string().required(),
  location: yup.string().required(),
  language: yup
    .string()
    .required()
    .matches(/(german|english)/),
  deadline: yup.date().required(),
  procDeadline: yup.string().required(),
  salary: yup.string().required(),
  fte: yup.string().required(),
  jobType: yup.string().required(),
  tags: yup.array().of(yup.string()).required(),
  href: yup.string().required(),
});
