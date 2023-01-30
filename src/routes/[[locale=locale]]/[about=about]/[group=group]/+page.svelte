<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { get_locale, find, getGroup } from "$lib/js/helpers";
    import { page } from "$app/stores";
    import { gen_img_url } from "$lib/js/helpers";
    import { t, locale } from "$lib/stores/i18n.js";
    import translations from "$lib/data/translations.js";

    export let data;
    let group_name;
    let group;

    onMount(() => {
        const page_keys = translations[`${get_locale($locale)}`];

        $page_key = find(page_keys, $page.url.pathname)[0];

        group_name = getGroup($page_key);
    });

    $: if (group_name) {
        group = data[group_name];
    }
</script>

{#if group}
    <div class="container mx-auto">
        {#each group as person}
            <img
                class="rounded-full w-20 shadow-lg"
                src={gen_img_url(
                    person.person.image.id,
                    "fit=cover&width=200&height=200&quality=80"
                )}
                alt={person.person.name}
            />
        {/each}
    </div>
{/if}
