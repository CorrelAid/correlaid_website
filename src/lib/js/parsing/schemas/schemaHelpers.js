import * as yup from 'yup';

export const peopleLinksSchema = yup.object({
  website: yup.string().nullable(),
  linkedin: yup.string().nullable(),
  mastodon: yup.string().nullable(),
  github: yup.string().nullable(),
});

export const peopleSchema = yup.object({
  name: yup.string().required(),
  position: yup.string().required(),
  description: yup.string().required(),
  imageAlt: yup.string(),
  imageSrc: yup.string(),
  imageDesc: yup.string().nullable(),
  pronouns: yup.string().nullable(),
  email: yup.string().required(),
  links: peopleLinksSchema,
});
