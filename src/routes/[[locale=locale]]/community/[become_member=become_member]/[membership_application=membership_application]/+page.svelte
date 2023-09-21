<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {createForm} from 'felte';
  import _ from 'lodash';
  import {generatePDF} from '$lib/js/pdf_generation.js';
  import {createSchema} from '$lib/js/form_validators.js';
  import {Turnstile} from 'svelte-turnstile';
  import {ValidationMessage, reporter} from '@felte/reporter-svelte';
  import * as yup from 'yup';

  onMount(() => {
    $page_key = 'navbar.community.become_member.membership_application';
  });

  export let data;
  $: membership_application = data.membership_application.data.fields;
  $: validationData = data.membership_application.data.validation;
  $: membership_application_uploader_url =
    data.membership_application_uploader_api_url;

  let turnstileError;
  let turnstileToken;
  let schema = yup.object({});

  $: schema = createSchema(validationData, membership_application);

  const {form} = createForm({
    validate: async (values) => {
      try {
        // await schema.validate(values, { abortEarly: false });
        return;
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
    extend: reporter,
    onSubmit: async (values) => {
      const dataURL = generatePDF(values);
      const pdfBlob = await (await fetch(dataURL)).blob();

      const formDataWithFile = new FormData();
      formDataWithFile.append('file', pdfBlob, 'foo.pdf');
      formDataWithFile.append('email', values.email);
      formDataWithFile.append('token', turnstileToken);

      try {
        const apiResponse = await fetch(membership_application_uploader_url, {
          method: 'POST',
          body: formDataWithFile,
        });

        if (apiResponse.ok) {
          // API request was successful
          const apiData = await apiResponse.text();
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

  function turnstileCallback(evnt) {
    turnstileToken = evnt.detail.token;
  }

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

{#if membership_application}
  <div
    class="z-1 offset-right z-1 relative top-0 rounded border border-neutral-25 bg-white p-4"
  >
    <form
      class="m-auto grid grid-cols-3 gap-5 px-4 pb-12 xl:w-2/4"
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
        <Turnstile
          formsField="turnstile"
          siteKey="0x4AAAAAAAD8yTOmVCP00Ur3"
          on:turnstile-callback={turnstileCallback}
        />
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
