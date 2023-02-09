<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.data4good.nonprofits";
    });

    const source = "# WIP";
</script>
