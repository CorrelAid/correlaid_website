<script>
    import Hero from "$lib/components/Hero.svelte";
    import Text from "$lib/components/Text.svelte";
    import Content from "../../lib/components/Content.svelte";
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.home";
    });

    /** @type {import('./$types').PageData} */
    export let data;

    const source = "# WIP";
</script>

<Content>
    <Text text={source} size={"base"} />
</Content>
