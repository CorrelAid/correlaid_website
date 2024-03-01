import * as yup from 'yup';

export const buttonsSchema = yup.object({
  text: yup.string(),
  href: yup.string(),
  color: yup.string(),
});

export const herosSchema = yup.object({
  text: yup.string(),
  height: yup.string(),
  gradientOnly: yup.boolean(),
  buttons: yup.array().of(buttonsSchema),
  image: yup.string(),
  imageDesc: yup.string().nullable(),
  imageAlt: yup.string(),
});

export const ctasSchema = yup.object({
  buttonLink: yup.string(),
  buttonColor: yup.string(),
  buttonText: yup.string(),
  text: yup.string(),
});

export const ctaGroupsSchema = yup.object({
  ctas: yup.array().of(ctasSchema),
});

export const wysiwygSchema = yup.object({
  source: yup.string().required(),
  options: yup.string(),
});

export const quoteSchema = yup.object({
  text: yup.string(),
  subtitle: yup.string(),
  image: yup.string(),
  imageDesc: yup.string(),
});

export const quoteCarouselsSchema = yup.object({
  quotes: yup.array().of(quoteSchema),
  textOnly: yup.boolean(),
});

export const contactsSchema = yup.object({
  name: yup.string(),
  position: yup.string(),
  description: yup.string(),
  img: yup.string(),
  imageDesc: yup.string().nullable(),
  pronouns: yup.string().nullable(),
  email: yup.string(),
});

export const timelineSchema = yup.object({
  steps: yup.array().of(
    yup.object({
      text: yup.string(),
      icon: yup.string(),
    }),
  ),
  color: yup.string(),
});

export const iconsSchema = yup.object({
  iconType: yup.string().required(),
  text: yup.string().required(),
});
