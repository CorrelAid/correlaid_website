<script>
    import { page } from "$app/stores";
    import { get_locale } from "$lib/js/helpers";
    import { page_key } from "$lib/stores/page_key";
    import { onMount, onDestroy } from "svelte";
    import Location from "$lib/svg/Location.svelte";
    import List from "$lib/svg/List.svelte";
    import Box from "$lib/components/Box.svelte";
    import Map from "$lib/components/Map.svelte";
    import "maplibre-gl/dist/maplibre-gl.css";

    import {
        TabWrapper,
        TabHead,
        TabHeadItem,
        TabContentItem,
    } from "$lib/components/tabs";

    onMount(() => {
        $page_key = "navbar.community.correlaidx";
    });

    let activeTabValue = 1;
    const handleClick = (tabValue) => () => {
        activeTabValue = tabValue;
    };

    export let data;

    let geo_json;
    $: geo_json = data.geo_json;
    let local_chapters;
    $: local_chapters = data.local_chapters;
</script>

<div class="px-2 ">
    <div class="">
        <div class="grid grid-cols-2 gap-7 px-7 mb-16">
            {#each local_chapters as local_chapter}
                <a
                    href={`${
                        get_locale($page.params) == "de" ? "" : "/en"
                    }/community/correlaidx/${
                        local_chapter.translations[0].city
                    }`}
                >
                    <Box type={"correlaidx"}>
                        <h2>{local_chapter.translations[0].city}</h2>
                    </Box>
                </a>
            {/each}
        </div>
    </div>
    <div class="mt-12 relative hidden xl:block">
    <Map {geo_json} />
</div>
</div>
