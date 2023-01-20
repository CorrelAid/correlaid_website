<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount, onDestroy } from "svelte";
    import { Map } from "maplibre-gl";
    import germany from '$lib/assets/geojson/germany.json';
    import Content from "$lib/components/Content.svelte";
    import "maplibre-gl/dist/maplibre-gl.css";

    onMount(() => {
        $page_key = "navbar.community.local_chapters";
    });

    let map;
    let mapContainer;

    const vizData = {
        "40":{"name":"Austria","population":8932664},
        "250":{"name":"France","population":67439599},
        "276":{"name":"Germany","population":83155031},
        "528":{"name":"Netherlands","population":17475415},
        "756":{"name":"Switzerland","population":8667088}
      };

    $: console.log(germany)

    onMount(async () => {
        const apiKey = "cYwZssWUHS4exn283ZO4";

        const initialState = { lng: 10, lat: 49, zoom: 4 };

        map = new Map({
            container: mapContainer,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });
        map.on("load", function () {
            map.addSource("maine", {
                type: "geojson",
                data: germany
            });

            map.addLayer({
                id: "maine",
                type: "fill",
                source: "maine",
                layout: {},
                paint: {
                    "fill-color": "#088",
                    "fill-opacity": 0.8,
                },
            });
        });
    });
    onDestroy(() => {
        if (map) {
            map.remove();
        }
    });
</script>

<Content>
    <h1 class="text-2xl py-5">Local Chapters</h1>
    <div class="border relative">
        <a href="https://www.maptiler.com" class="absolute left-4 bottom-4 z-10"
            ><img
                src="https://api.maptiler.com/resources/logo.svg"
                alt="MapTiler logo"
            /></a
        >
        <div class="w-full" id="map" bind:this={mapContainer} />
    </div>
</Content>

<style>
    #map {
        height: 500px;
    }
</style>
