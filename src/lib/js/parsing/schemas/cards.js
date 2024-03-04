import * as yup from 'yup';

export const localChaptersCards = yup.array().of(
  yup.object({
    city: yup.string().required(),
    shortId: yup.string().required(),
  }),
);

export const contentCreatorsCards = yup
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
  imageUrl: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: contentCreatorsCards,
});

export const podcastEpisodesSchema = yup.object({
  langs: yup.array().required().min(1).of(yup.string()),
  pubDate: yup.string().required(),
  href: yup.string().url().required(),
  imageAlt: yup.string().nullable(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  imageUrl: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: contentCreatorsCards,
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
  localChapters: localChaptersCards,
  endDate: yup.string().nullable(),
});

export const projectsSchema = yup.object({
  title: yup.string().required(),
  dataTypes: yup.array().required().min(1).of(yup.string()),
  projectTypes: yup.array().required().min(1).of(yup.string()),
  isInternal: yup.boolean().required(),
  organization: yup.string().required(),
  summary: yup.string().required(),
  localChapters: localChaptersCards,
  href: yup.string().nullable(),
  endDate: yup.date().required(),
  organization: yup.string().required(),
  projectOutputs: yup.array().of(
    yup.object({
      url: yup.string().required(),
      outputType: yup.string().required(),
      outputNumber: yup.number().required(),
    }),
  ),
});
