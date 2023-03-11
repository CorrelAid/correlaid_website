<script>
    import { page } from "$app/stores";
    import { get_locale } from "$lib/js/helpers";
    import { page_key } from "$lib/stores/page_key";
    import { onMount, onDestroy } from "svelte";
    import Location from "$lib/svg/Location.svelte";
    import List from "$lib/svg/List.svelte";
    import Box from "$lib/components/Box.svelte";
    import Map_comp from "$lib/components/Map.svelte";
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

<div class=" relative px-2 flex items-center justify-center">
    <TabWrapper>
        <TabContentItem id={1} {activeTabValue}>
            <Map_comp {geo_json} />
        </TabContentItem>
        <TabContentItem id={2} {activeTabValue}>
            <div
                class="map_height border border-neutral-25 rounded overflow-y-scroll"
            >
                <div class="grid grid-cols-2 gap-7 p-7 mb-16">
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
        </TabContentItem>
    </TabWrapper>
    <TabHead>
        <TabHeadItem id={1} {activeTabValue} on:click={handleClick(1)}
            ><div class="flex items-center justify-center">
                <Location width={20} height={20} />
            </div></TabHeadItem
        >
        <TabHeadItem id={2} {activeTabValue} on:click={handleClick(2)}
            ><div class="flex items-center justify-center">
                <List width={20} height={20} />
            </div></TabHeadItem
        >
    </TabHead>
</div>
