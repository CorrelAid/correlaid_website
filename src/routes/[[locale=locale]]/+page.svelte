<script>
    import Hero from "$lib/components/Hero.svelte";
    import Text from "$lib/components/Text.svelte";
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.home";
    });

    /** @type {import('./$types').PageData} */
    export let data;

    const source = "# WIP";
</script>

<div class="container mx-auto">
    <Text {source} size={"base"} />
</div>
