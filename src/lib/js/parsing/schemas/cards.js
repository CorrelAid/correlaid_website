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
  langs: yup.array().required().of(yup.string()),
  pubdate: yup.date().required(),
  slug: yup.string().required(),
  imageAlt: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  imageUrl: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: contentCreatorsCards,
});

export const podcastEpisodesSchema = yup.object({
  langs: yup.array().of(yup.string()),
  pubdate: yup.date().required(),
  slug: yup.string().required(),
  imageAlt: yup.string().nullable(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  imageUrl: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: contentCreatorsCards,
});

export const eventsSchema = yup.object({
  slug: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  date: yup.date().required(),
  tags: yup.array().required().min(1).of(yup.string()),
  type: yup.string().required(),
  language: yup.string().required(),
  localChapters: localChaptersCards,
  endDate: yup.date(),
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
