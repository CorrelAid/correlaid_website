<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import { createForm } from "felte";
    import { _ } from "lodash";
    import { reporter, ValidationMessage } from "@felte/reporter-svelte";
    import * as yup from "yup";

    onMount(() => {
        $page_key = "navbar.community.become_member.membership_application";
    });

    export let data;
    let membership_application;
    let validation;
    $: membership_application = data.membership_application.object.fields;
    $: validation = data.membership_application.object.validation;

    const MAX_FILE_SIZE = 1000000; //1mb

    const validFileExtensions = { document: ["pdf"] };
    function isValidFileType(fileName, fileType) {
        return (
            fileName &&
            validFileExtensions[fileType].indexOf(fileName.split(".").pop()) >
                -1
        );
    }

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
            .test("is-valid-type", validation.doc_type, (value) =>
                isValidFileType(value && value.name.toLowerCase(), "document")
            )
            .test(
                "is-valid-size",
                validation.doc_size,
                (value) => value && value.size <= MAX_FILE_SIZE
            );
        requiredNumber = yup
            .number(validation.number)
            .transform((value) =>
                isNaN(value) || value === null || value === undefined
                    ? 0
                    : value
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
        contribution_amount_sponsor: _.find(membership_application, ["name", "membership_type"])
                    .value === "sponsor" ? requiredNumber : yup.mixed(),
        contribution_amount_participating: _.find(membership_application, ["name", "membership_type"])
                    .value === "participating" ? requiredMisc : yup.mixed(),
        // 
        agreement: requiredAgreement,
        membership_type: requiredMisc,
        iban: requiredString,
        bic: requiredString,
        sepa: requiredDoc,
        application_form: requiredDoc,
    });

    const { form } = createForm({
        validate: async (values) => {
            try {
                await schema.validate(values, { abortEarly: false });
            } catch (err) {
                const errors = err.inner.reduce(
                    (res, value) => ({
                        [value.path]: value.message,
                        ...res,
                    }),
                    {}
                );
                console.log(errors)
                return errors;
            }
        },
        extend: reporter,
    });

    // conditionally show the amount fields (based on selected membership type)
    function handle_hide(name) {
        if (
            (name === "contribution_amount_participating" &
                _.find(membership_application, ["name", "membership_type"])
                    .value === "sponsor") ||
            (name === "contribution_amount_sponsor" &
                _.find(membership_application, ["name", "membership_type"])
                    .value === "participating")
        ) {
            return false;
        } else {
            return true;
        }
    }
</script>

{#if membership_application && !_.isEmpty(validation)}
    <div
        class="border border-neutral-25 rounded p-4 z-1 relative offset-right bg-white top-0 z-1"
    >
        <form
            class="flex flex-col xl:w-2/4 m-auto px-4 pb-12"
            use:form
            method="post"
        >
            {#each membership_application as field, i}
                {#if handle_hide(field.name)}
                    <div class="flex flex-col">
                        {#if field.type === "checkbox"}
                            <label
                                for={field.name}
                                class="font-semibold mt-4 mb-2"
                                >{field.mandatory === true
                                    ? "* "
                                    : ""}{field.label}</label
                            >
                            <input
                                type="checkbox"
                                name={field.name}
                                id={field.name}
                                bind:checked={field.value}
                            />
                        {:else if field.type === "radio_group"}
                            <h3 class="font-semibold mt-4 mb-2">
                                {field.mandatory === true
                                    ? "* "
                                    : ""}{field.label}
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
                            <label
                                for={field.name}
                                class="font-semibold mt-4 mb-2"
                                >{field.mandatory === true
                                    ? "* "
                                    : ""}{field.label}</label
                            >
                            <input
                                class="}"
                                type={field.type}
                                name={field.name}
                                id={field.name}
                            />
                        {/if}
                        <ValidationMessage
                            for={field.name}
                            let:messages={message}
                        >
                            {#if message != null}
                                <div
                                    class="my-2 text-sm text-red-500"
                                    role="alert"
                                >
                                    <span class="font-medium">{message}</span>
                                </div>
                            {/if}
                        </ValidationMessage>
                    </div>
                {/if}
            {/each}

            <button
                type="submit"
                class="rounded-md px-4 py-2 mt-12 text-white shadow transition bg-secondary w-24"
                >Submit</button
            >
        </form>
    </div>
{/if}
