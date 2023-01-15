<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t, locale } from "$lib/stores/i18n.js";

    onMount(() => {
        $page_key = "navbar.events";
    });
    export let data;
    let events = data.events;

    const source = "# WIP";
</script>

<ul>
    {#each events as event}
        <li>
            
                {event.attributes.title}: <a href="{`${$t("navbar.events").url}/${event.attributes.slug}`}">link</a>
        </li>
    {/each}
</ul>
