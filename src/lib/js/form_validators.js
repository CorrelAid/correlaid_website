import * as yup from 'yup';
import _ from 'lodash';

const MAX_FILE_SIZE = 1000000; // 1mb

let requiredString;
let optionalString;
let requiredEmail;
let requiredMisc;
let requiredDoc;
let requiredNumber;
let requiredAgreement;

const validFileExtensions = {document: ['pdf']};
function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

export function createSchema(validationData, membership_application) {
  requiredString = yup.string().required(validationData.required);
  optionalString = yup.string();
  requiredEmail = yup
    .string()
    .email(validationData.email)
    .required(validationData.required);
  requiredMisc = yup.mixed().required(validationData.required);
  requiredDoc = yup
    .mixed()
    .required(validationData.required)
    .test('is-valid-type', validationData.doc_type, (value) =>
      isValidFileType(value && value.name.toLowerCase(), 'document'),
    )
    .test(
      'is-valid-size',
      validationData.doc_size,
      (value) => value && value.size <= MAX_FILE_SIZE,
    );
  requiredNumber = yup
    .number(validationData.number)
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required(validationData.required)
    .positive(validationData.positive)
    .integer(validationData.integer);

  requiredAgreement = yup
    .boolean()
    .oneOf([true], validationData.agree)
    .required(validationData.required);

  const schema = yup.object({
    name: requiredString,
    surname: requiredString,
    street: requiredString,
    house_number: requiredString,
    house_number_ext: optionalString,
    postcode: requiredNumber,
    city: requiredString,
    email: requiredEmail,
    // these fields are only required when the corresponding radio button was selected
    contribution_amount_sponsor:
      _.find(membership_application, ['name', 'membership_type']).value ===
      'sponsor'
        ? requiredNumber
        : yup.mixed(),
    contribution_amount_participating:
      _.find(membership_application, ['name', 'membership_type']).value ===
      'participating'
        ? requiredMisc
        : yup.mixed(),
    //
    agreement: requiredAgreement,
    membership_type: requiredMisc,
    iban: requiredString,
    bic: requiredString,
    sepa: requiredDoc,
    application_form: requiredDoc,
    turnstile: yup.mixed(),
  });

  console.log(schema);

  return schema;
}
