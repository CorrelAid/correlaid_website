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

  let submited = false;

  let turnstileToken;
  let SubmitError;
  let schema = yup.object({});

  $: schema = createSchema(validationData, membership_application);

  const {form} = createForm({
    validate: async (values) => {
      values.turnstile = turnstileToken;
      try {
        await schema.validate(values, {abortEarly: false});
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
      const dataURL = generatePDF(values, membership_application);
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
          submited = true;
        } else {
          // API request failed
          console.log('API request failed');
          SubmitError =
            'Error ' + apiResponse.status + ': ' + apiResponse.statusText;
          ('');
        }
      } catch (error) {
        console.error('An error occurred during the API request:', error);
        SubmitError = error;
      }
    },
  });

  function turnstileCallback(evnt) {
    turnstileToken = evnt.detail.token;
  }

  // conditionally show the amount fields (based on selected membership type)
  function handle_hide(name) {
    const membershipTypeValue = _.find(membership_application[1].fields, [
      'name',
      'membership_type',
    ]).value;

    if (name === 'contribution_amount_participating') {
      return membershipTypeValue === 'participating';
    }

    if (name === 'contribution_amount_sponsor') {
      return membershipTypeValue === 'sponsor';
    }

    return true;
  }
</script>

{#if membership_application && !submited}
  <form class="relative m-auto px-4 pb-12" use:form method="post">
    {#each membership_application as group, i}
      <div
        class="offset-right relative mb-12 border-y border-l px-4 py-8 lg:px-8"
      >
        <div class="mt-4 pb-0">
          <h2 class="pb-3 text-2xl font-bold">{group.title}</h2>
          <p class="pb-3">{group.description}</p>
        </div>
        <div class="gap-5 lg:grid lg:grid-cols-2">
          {#each group.fields as field}
            {#if handle_hide(field.name)}
              <div
                class="flex flex-col {field.width === 'half'
                  ? 'lg:col-span-1'
                  : 'lg:col-span-2'}"
              >
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
                    class={field.name.includes('signature') === true
                      ? 'font-signature text-3xl'
                      : 'font-sans'}
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
        </div>
      </div>
    {/each}
    <div class="col-span-2 my-4">
      <Turnstile
        formsField="turnstile"
        siteKey="0x4AAAAAAAD8yTOmVCP00Ur3"
        on:turnstile-callback={turnstileCallback}
      />
      {#if !turnstileToken}
        <span class="my-2 text-sm text-red-500"
          >Turnstile Validierung fehlgeschlagen. Bist du ein Mensch?</span
        >
      {/if}
    </div>
    <div class="col-span-2 my-4">
      <button
        type="submit"
        class="mt-5 w-44 rounded-md bg-secondary px-4 py-2 text-white shadow transition"
        >Absenden</button
      >
      {#if SubmitError}
        <span class="my-2 block text-sm text-red-500">{SubmitError}</span>
      {/if}
    </div>
  </form>
{:else}
  <div class="offset-right relative mb-12 border-y border-l px-4 py-8 lg:px-8">
    <p class="text-xl">
      Herzlichen Glückwunsch, du hast den Mitgliedsantrag abgeschickt!
    </p>
  </div>
{/if}
