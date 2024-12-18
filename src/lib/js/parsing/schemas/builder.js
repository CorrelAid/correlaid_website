import * as yup from 'yup';
import {peopleSchema} from './schemaHelpers';

export const customSectionsSchema = yup.object({
  key: yup.string().required(),
});

export const buttonsSchema = yup.object({
  text: yup.string().required(),
  href: yup.string().required(),
  color: yup.string().required(),
  type: yup.string().required(),
});

export const herosSchema = yup.object({
  text: yup.string().required(),
  subText: yup.string().nullable(),
  height: yup.string().required(),
  gradientOnly: yup.boolean().required(),
  buttons: yup.array().of(buttonsSchema),
  imageSrc: yup.string().required(),
  imageDesc: yup.string().nullable(),
  imageAlt: yup.string().required(),
});

export const ctasSchema = yup.object({
  buttonLink: yup.string().required(),
  buttonColor: yup.string().required(),
  buttonText: yup.string().required(),
  text: yup.string().required(),
});

export const ctaGroupsSchema = yup.object({
  ctas: yup.array().required().min(1).of(ctasSchema),
});

export const wysiwygSchema = yup.object({
  source: yup.string().required().required(),
  options: yup.string().nullable(),
});

export const quoteSchema = yup.object({
  text: yup.string().required(),
  subtitle: yup.string().required(),
  imageSrc: yup.string().nullable(),
  imageDesc: yup.string().nullable(),
});

export const quoteCarouselsSchema = yup.object({
  quotes: yup.array().required().min(1).of(quoteSchema),
  textOnly: yup.boolean(),
});

export const contactsSchema = peopleSchema;

export const timelineSchema = yup.object({
  steps: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object({
        text: yup.string().required(),
        icon: yup.string().required(),
      }),
    ),
  color: yup.string().required(),
});

export const iconsSchema = yup.object({
  iconType: yup.string().required(),
  text: yup.string().required(),
});
