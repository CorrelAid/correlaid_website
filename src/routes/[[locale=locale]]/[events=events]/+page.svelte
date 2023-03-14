<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import { t } from "$lib/stores/i18n";
    import { gen_img_url } from "$lib/js/helpers";
    import Events_Card from "../../../lib/components/Events_Card.svelte";

    onMount(() => {
        $page_key = "navbar.events";
    });

    /** @type {import('./$types').PageData} */
    export let data;
    let events;
    $: events = data.events;
</script>

<div class="space-y-5">
    {#each events as event, i}
        <Events_Card
            href={$t("navbar.events").url + "/" + event.slug}
            title={event.title}
            teaser={event.teaser}
            image_url={gen_img_url(
                event.title_image.id,
                "fit=inside&width=1200&height=675&format=png"
            )}
            date={event.date}
            tags={event.tags}
        />
    {/each}
</div>
