<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t } from "$lib/stores/i18n.js";
    import Content from "$lib/components/Content.svelte";
    import Card from "$lib/components/Card.svelte";

    onMount(() => {
        $page_key = "navbar.events";
    });

    /** @type {import('./$types').PageData} */
    export let data;
    let events;
    $: events = data.events;
</script>

<ul />
<div class="container mx-auto">    <div class="grid grid-cols-3 gap-4">
    {#each events as event}
        <Card
            href={$t("navbar.events").url + "/" + event.translations[0].slug}
            title={event.translations[0].title}
            teaser={event.translations[0].teaser}
            image_url={"https://6xdv3yb3.directus.app/assets/" +
            event.translations[0].title_image.id}
        />
    {/each}
</div>
</div>