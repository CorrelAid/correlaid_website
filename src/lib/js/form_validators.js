import * as yup from 'yup';
import _ from 'lodash';

export function createSchema(validationData, membership_application) {
  const requiredString = yup.string().required(validationData.required);
  const optionalString = yup.string();
  const requiredEmail = yup
    .string()
    .email(validationData.email)
    .required(validationData.required);
  const requiredMisc = yup.mixed().required(validationData.required);
  const requiredDate = yup
    .date(validationData.date)
    .typeError(validationData.date)
    .required(validationData.required);
  const requiredNumber = yup
    .number(validationData.number)
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required(validationData.required)
    .positive(validationData.positive)
    .integer(validationData.integer);

  const contribution_amount_sponsor =
    _.find(membership_application[1].fields, ['name', 'membership_type'])
      .value === 'sponsor'
      ? requiredNumber
      : yup.mixed();

  const contribution_amount_participating =
    _.find(membership_application[1].fields, ['name', 'membership_type'])
      .value === 'participating'
      ? requiredMisc
      : yup.mixed();

  const turnstile = yup.mixed().required(validationData.required);

  const schema = yup.object({
    name: requiredString,
    surname: requiredString,
    street: requiredString,
    house_number: requiredString,
    house_number_ext: optionalString,
    postcode: requiredNumber,
    city: requiredString,
    email: requiredEmail,
    birthdate: requiredDate,
    phone: requiredNumber,
    contribution_amount_sponsor,
    contribution_amount_participating,
    membership_type: requiredMisc,
    iban: requiredString,
    bic: requiredString,
    signature_sepa: requiredString,
    signature_data: requiredString,
    signature_membership: requiredString,
    turnstile,
  });

  return schema;
}
