import * as yup from 'yup';

export const peopleSchema = yup.object({
  name: yup.string().required(),
  position: yup.string().required(),
  description: yup.string().required(),
  img: yup.string().required(),
  imageDesc: yup.string().nullable(),
  pronouns: yup.string().nullable(),
  email: yup.string().required(),
});
