import * as yup from 'yup';

export const blogPostsSchema = yup.object({
  langs: yup.array().required().of(yup.string()),
  pubdate: yup.date().required(),
  slug: yup.string().required(),
  imageAlt: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  imageUrl: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
  contentCreators: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object({
        name: yup.string().required(),
      }),
    ),
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
  contentCreators: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object({
        name: yup.string().required(),
      }),
    ),
});

export const eventsSchema = yup.object().shape({
  slug: yup.string().required(),
  title: yup.string().required(),
  teaser: yup.string().required(),
  date: yup.date().required(),
  tags: yup.array().of(yup.string()),
  type: yup.string().required(),
  language: yup.string().required(),
  localChapters: yup.array().of(
    yup.object().shape({
      city: yup.string().required(),
      shortId: yup.string().required(),
    }),
  ),
  endDate: yup.date(),
});
