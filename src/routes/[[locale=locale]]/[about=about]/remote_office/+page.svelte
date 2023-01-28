<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import Text from "$lib/components/Text.svelte";
    import { gen_img_url } from "$lib/js/helpers";

    onMount(() => {
        $page_key = "navbar.about.org_struct.remote_office";
    });

    export let data;
    let global_administrators;
    $: global_administrators = data.global_administrators;
    $: console.log(global_administrators);
</script>
<div class="container mx-auto">
{#each global_administrators as person}
    
        <img
        class="rounded-full w-20 shadow-lg"
            src={gen_img_url(person.person.image.id,"fit=cover&width=200&height=200&quality=80")}
            alt={person.person.name}
        />
    
{/each}
</div>