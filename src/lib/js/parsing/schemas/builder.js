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
