<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import { createForm } from "felte";
    import { _ } from "lodash";
    import { page } from "$app/stores";

    onMount(() => {
        $page_key = "navbar.community.become_member.membership_application";
    });

    export let data;
    let membership_application;
    $: membership_application = data.membership_application.object;

    // $: console.log(membership_application);

    // https://github.com/carstenlebek/svelte-email

    const { form } = createForm();
    //     {
    //     onSubmit(values, context) {

    //         return values;
    //     },
    //     async onSuccess(response, context) {
    //         console.log(response);

    //         const data = new FormData(response)

    //         await fetch($page.url.pathname, {
    //             method: "POST",
    //             body: data,
    //         });
    //     },
    //     onError(err, context) {
    //         // Do something with the error thrown from `onSubmit`.
    //     },
    // });

    function handle_hide(name) {
        if (name === "contribution_amount_participating") {
            if (
                _.find(membership_application, ["name", "membership_type"])
                    .value === "participating"
            ) {
                return "";
            } else {
                return "hidden";
            }
        } else if (name === "contribution_amount_sponsor") {
            console.log("hu");
            if (
                _.find(membership_application, ["name", "membership_type"])
                    .value === "sponsor"
            ) {
                return "";
            } else {
                return "hidden";
            }
        } else if ((name === "iban") | (name === "bic") | (name === "sepa")) {
            if (
                (_.find(membership_application, ["name", "membership_type"])
                    .value ===
                    "participating") |
                (_.find(membership_application, ["name", "membership_type"])
                    .value ===
                    "sponsor")
            ) {
                return "";
            } else {
                return "hidden";
            }
        } else {
            return "";
        }
    }
</script>

{#if membership_application}
    <div
        class="border border-neutral-25 rounded p-4 z-1 relative offset-right bg-white top-0 z-1"
    >
        <form
            class="flex flex-col xl:w-2/4 m-auto px-4 pb-12"
            use:form
            method="post"
        >
            {#each membership_application as field, i}
                <div class="{handle_hide(field.name)} flex flex-col">
                    {#if field.type === "checkbox"}
                        <label for={field.name} class="font-semibold mt-4 mb-2"
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
                            {field.mandatory === true ? "* " : ""}{field.label}
                        </h3>
                        {#each field.options as option}
                            <label>
                                <input
                                    type="radio"
                                    bind:group={field.value}
                                    name={field.value}
                                    value={option.value}
                                />
                                {option.label}
                            </label>
                        {/each}
                    {:else}
                        <label for={field.name} class="font-semibold mt-4 mb-2"
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
                </div>
            {/each}

            <button
                type="submit"
                class="rounded-md px-4 py-2 mt-12 text-white shadow transition bg-secondary w-24"
                >Submit</button
            >
        </form>
    </div>
{/if}
