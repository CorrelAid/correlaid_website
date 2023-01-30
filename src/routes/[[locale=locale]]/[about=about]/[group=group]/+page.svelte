<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import Text from "$lib/components/Text.svelte";
    import { page } from "$app/stores";
    import { gen_img_url } from "$lib/js/helpers";

    onMount(() => {
        $page_key = `navbar.about.${$page.params.group}`;
    });

    export let data;
    let group;
    $: group = data[$page.params.group];

</script>


<div class="container mx-auto">
{#each group as person}
    
        <img
        class="rounded-full w-20 shadow-lg"
            src={gen_img_url(person.person.image.id,"fit=cover&width=200&height=200&quality=80")}
            alt={person.person.name}
        />
    
{/each}
</div>
