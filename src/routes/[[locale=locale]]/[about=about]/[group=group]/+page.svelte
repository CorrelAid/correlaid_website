<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { get_locale, find, getGroup } from "$lib/js/helpers";
    import { page } from "$app/stores";
    import { gen_img_url } from "$lib/js/helpers";
    import translations from "$lib/data/translations.js";
    import Person from "$lib/components/Person.svelte";

    export let data;
    let group_name;
    let group;

    onMount(() => {
        const page_keys = translations[`${get_locale($page.params)}`];

        $page_key = find(page_keys, $page.url.pathname)[0];

        
    });
    $: group_name = getGroup($page_key);
    $: if (group_name) {
        group = data[group_name];
    }
    
</script>

{#if group}
    <div class="container mx-auto flex flex-col gap-y-3 py-8 space-y-8">
        {#each group as person}
            <Person
                name={person.person.name}
                img={gen_img_url(
                    person.person.image.id,
                    "fit=cover&width=200&height=200&quality=80"
                )}
                position={person.translations[0].position}
                description={person.translations[0].description}
            />
        {/each}
    </div>
{/if}
