<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import Html from "$lib/components/Html.svelte";
    import Content from "$lib/components/Content.svelte";

    onMount(() => {
        $page_key = "footer.imprint";
    });

    export let data;

    let page;
    $: page = data.page

    const source = "# WIP";
</script>

<Content>
    <Html source={page} />
</Content>
