<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {createForm} from 'felte';
  import {_} from 'lodash';

  import {generatePDF} from '$lib/js/pdf_generation.js';

  import {Turnstile} from 'svelte-turnstile';
  import {ValidationMessage} from '@felte/reporter-svelte';
  import * as yup from 'yup';

  onMount(() => {
    $page_key = 'navbar.community.become_member.membership_application';
  });

  export let data;
  let membership_application;
  let validation;
  $: membership_application = data.membership_application.data.fields;
  $: validation = data.membership_application.data.validation;
  $: membership_application_uploader_url =
    data.membership_application_uploader_url;

  const MAX_FILE_SIZE = 1000000; // 1mb

  const validFileExtensions = {document: ['pdf']};
  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
    );
  }

  let turnstileError;

  let requiredString;
  let optionalString;
  let requiredEmail;
  let requiredMisc;
  let requiredDoc;
  let requiredNumber;
  let requiredAgreement;
  let schema = yup.object({});

  // creating reusable validation functions in a reactive way (changes when data loads)
  $: if (validation) {
    requiredString = yup.string().required(validation.required);
    optionalString = yup.string();
    requiredEmail = yup
      .string()
      .email(validation.email)
      .required(validation.required);
    requiredMisc = yup.mixed().required(validation.required);
    requiredDoc = yup
      .mixed()
      .required(validation.required)
      .test('is-valid-type', validation.doc_type, (value) =>
        isValidFileType(value && value.name.toLowerCase(), 'document'),
      )
      .test(
        'is-valid-size',
        validation.doc_size,
        (value) => value && value.size <= MAX_FILE_SIZE,
      );
    requiredNumber = yup
      .number(validation.number)
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value,
      )
      .required(validation.required)
      .positive(validation.positive)
      .integer(validation.integer);

    requiredAgreement = yup
      .boolean()
      .oneOf([true], validation.agree)
      .required(validation.required);
  }

  $: schema = yup.object({
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

  const {form} = createForm({
    validate: async (values) => {
      try {
        await schema.validate(values, {abortEarly: false});
      } catch (err) {
        const errors = err.inner.reduce(
          (res, value) => ({
            [value.path]: value.message,
            ...res,
          }),
          {},
        );
        return errors;
      }
    },
    async onSuccess(response) {
      const formData = form.getValues(); // Get the form data

      const dataURL = generatePDF(formData);
      const pdfBlob = await (await fetch(dataURL)).blob();

      const formDataWithFile = new FormData();
      formDataWithFile.append('file', pdfBlob, 'foo.pdf');
      formDataWithFile.append('name', formData.name);
      formDataWithFile.append('email', formData.email);
      formDataWithFile.append('token', formData.token);

      try {
        const apiResponse = await fetch(membership_application_uploader_url, {
          method: 'POST',
          body: formDataWithFile,
        });

        if (apiResponse.ok) {
          // API request was successful
          const apiData = await apiResponse.json();
          console.log(apiData);
          // Handle any further logic or UI updates
        } else {
          // API request failed
          console.log('API request failed');
          // Handle the error scenario
        }
      } catch (error) {
        console.error('An error occurred during the API request:', error);
        // Handle the error scenario
      }
    },
  });

  // conditionally show the amount fields (based on selected membership type)
  function handle_hide(name) {
    if (
      (name === 'contribution_amount_participating') &
        (_.find(membership_application, ['name', 'membership_type']).value ===
          'sponsor') ||
      (name === 'contribution_amount_sponsor') &
        (_.find(membership_application, ['name', 'membership_type']).value ===
          'participating')
    ) {
      return false;
    } else {
      return true;
    }
  }
</script>

{#if membership_application && !_.isEmpty(validation)}
  <div
    class="z-1 offset-right z-1 relative top-0 rounded border border-neutral-25 bg-white p-4"
  >
    <form
      class="m-auto flex flex-col px-4 pb-12 xl:w-2/4"
      use:form
      method="post"
    >
      {#each membership_application as field, i}
        {#if handle_hide(field.name)}
          <div class="flex flex-col">
            {#if field.type === 'checkbox'}
              <label for={field.name} class="mb-2 mt-4 font-semibold"
                >{field.mandatory === true ? '* ' : ''}{field.label}</label
              >
              <input
                type="checkbox"
                name={field.name}
                id={field.name}
                bind:checked={field.value}
              />
            {:else if field.type === 'radio_group'}
              <h3 class="mb-2 mt-4 font-semibold">
                {field.mandatory === true ? '* ' : ''}{field.label}
              </h3>
              {#each field.options as option}
                <label>
                  <input
                    type="radio"
                    bind:group={field.value}
                    name={field.name}
                    value={option.value}
                  />
                  {option.label}
                </label>
              {/each}
            {:else}
              <label for={field.name} class="mb-2 mt-4 font-semibold"
                >{field.mandatory === true ? '* ' : ''}{field.label}</label
              >
              <input
                class="}"
                type={field.type}
                name={field.name}
                id={field.name}
              />
            {/if}
            <ValidationMessage for={field.name} let:messages={message}>
              {#if message != null}
                <div class="my-2 text-sm text-red-500" role="alert">
                  <span class="font-medium">{message}</span>
                </div>
              {/if}
            </ValidationMessage>
          </div>
        {/if}
      {/each}
      <div class="mt-4">
        <Turnstile formsField="turnstile" siteKey="0x4AAAAAAAD8yTOmVCP00Ur3" />
        {#if turnstileError}
          <span class="my-2 text-sm text-red-500">{turnstileError}</span>
        {/if}
      </div>
      <button
        type="submit"
        class="mt-12 w-24 rounded-md bg-secondary px-4 py-2 text-white shadow transition"
        >Submit</button
      >
    </form>
  </div>
{/if}
