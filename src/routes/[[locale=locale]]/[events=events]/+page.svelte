<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t } from "$lib/stores/i18n.js";
    import { gen_img_url } from "$lib/js/helpers";
    import CalendarCard from "../../../lib/components/Calendar_Card.svelte";

    onMount(() => {
        $page_key = "navbar.events";
    });

    /** @type {import('./$types').PageData} */
    export let data;
    let events;
    $: events = data.events;
</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
    {#each events as event, i}
        <CalendarCard
            href={$t("navbar.events").url + "/" + event.id}
            title={event.translations[0].title}
            teaser={event.translations[0].teaser}
            image_url={gen_img_url(
                event.translations[0].title_image.id,
                "fit=inside&width=1200&height=675&format=png"
            )}
            date={event.date}
            tags={event.translations[0].tags}
        />
    {/each}
</div>
