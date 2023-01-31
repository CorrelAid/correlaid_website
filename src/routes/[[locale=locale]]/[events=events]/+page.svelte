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

    $:console.log(events)
</script>

<div class="container mx-auto px-4">
    <div class="gap-6 grid xl:grid-flow-row-dense xl:grid-cols-6 xl:grid-rows-5">
        {#each events as event, i}
            {#if i == 0}
            <div class="col-span-full xl:col-span-4 xl:row-span-2">
                <CalendarCard
                    href={$t("navbar.events").url +
                        "/" +
                        event.translations[0].slug}
                    title={event.translations[0].title}
                    teaser={event.translations[0].teaser}
                    image_url={gen_img_url(event.translations[0].title_image.id, "fit=cover&width=1000&height=800&quality=100")}
                    date={event.date}
                    tags={event.translations[0].tags}
                />
            </div>
            {:else}
            <div class="col-span-full xl:col-span-2">
                <CalendarCard
                    href={$t("navbar.events").url +
                        "/" +
                        event.translations[0].slug}
                    title={event.translations[0].title}
                    teaser={event.translations[0].teaser}
                    image_url={gen_img_url(event.translations[0].title_image.id, "fit=cover&width=1000&height=500&quality=100")}
                    date={event.date}
                    tags={event.translations[0].tags}
                />
            </div>
            {/if}
        {/each}
    </div>
</div>
