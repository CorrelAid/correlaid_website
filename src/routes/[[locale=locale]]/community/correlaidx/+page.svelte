<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount, onDestroy } from "svelte";
    import { Map, Popup } from "maplibre-gl";
    import { t, locale, locales } from "$lib/stores/i18n.js";
    import lc_coords from "$lib/data/lc_coords.json";
    import "maplibre-gl/dist/maplibre-gl.css";

    onMount(() => {
        $page_key = "navbar.community";
    });

    let map;
    let mapContainer;

    onMount(async () => {
        const apiKey = "cYwZssWUHS4exn283ZO4";

        const initialState = { lng: 5.5, lat: 49, zoom: 4.2 };

        map = new Map({
            container: mapContainer,
            style: `https://api.maptiler.com/maps/stage-light/style.json?key=${apiKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
            maxZoom: 11,
            minZoom: 4,
            maxBounds: [
                [-20, 32],
                [40, 65],
            ],
        });
        map.on("load", function () {
            var layers = map.getStyle().layers;
            // Find the index of the first symbol layer in the map style
            var firstSymbolId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === "symbol") {
                    firstSymbolId = layers[i].id;
                    break;
                }
            }
            map.addSource("statesData", {
                type: "vector",
                url: `https://api.maptiler.com/tiles/countries/tiles.json?key=${apiKey}`,
            });
            map.addSource("lcs", {
                type: "geojson",
                data: lc_coords,
            });

            map.addLayer(
                {
                    id: "lcs",
                    type: "circle",
                    source: "lcs",
                    paint: {
                        "circle-radius": 10,
                        "circle-opacity": 0.7,
                        "circle-color": "#f04451",
                    },
                    layout: {
                        // "icon-image": "marker",
                        // get the year from the source's "year" property
                        // "text-field": ["get", "year"],
                        // "text-font": [
                        //     "Open Sans Semibold",
                        //     "Arial Unicode MS Bold",
                        // ],
                        // "text-offset": [0, 1.25],
                        // "text-anchor": "top",
                    },
                },
                firstSymbolId
            );

            map.addLayer({
                id: "countries",
                source: "statesData",
                type: "fill",
                "source-layer": "administrative",
                filter: [
                    "all",
                    ["==", "level", 0],
                    [
                        "any",
                        ["==", "name", "Germany"],
                        ["==", "name", "Switzerland"],
                        ["==", "name", "France"],
                        ["==", "name", "Netherlands"],
                        ["==", "name", "Austria"],
                    ],
                ],
                paint: {
                    "fill-color": "#df595b",
                    "fill-opacity": 0.2,
                },
            });
        });

        map.on("click", "lcs", (e) => {
            const lcs = e.features[0];

            new Popup()
                .setHTML(
                    `<b>${lcs.properties.year}</b>`
                )

                .setLngLat(lcs.geometry.coordinates)
                .addTo(map);
        });
    });
    onDestroy(() => {
        if (map) {
            map.remove();
        }
    });

   

    $: if (map) {
        if (map.isStyleLoaded()) {
            map.setLayoutProperty("continent", "text-field", [
                "get",
                "name:" + $locale,
            ]);
            map.setLayoutProperty("country", "text-field", [
                "get",
                "name:" + $locale,
            ]);
            map.setLayoutProperty("state", "text-field", [
                "get",
                "name:" + $locale,
            ]);
            map.setLayoutProperty("city", "text-field", [
                "get",
                "name:" + $locale,
            ]);
            map.setLayoutProperty("town", "text-field", [
                "get",
                "name:" + $locale,
            ]);
        }
    }
</script>

<div class="container mx-auto py-6">    
    <div class="border relative">
        <a href="https://www.maptiler.com" class="absolute left-4 bottom-4 z-10"
            ><img
                src="https://api.maptiler.com/resources/logo.svg"
                alt="MapTiler logo"
            /></a
        >
        <div class="w-full" id="map" bind:this={mapContainer} />
    </div>
</div>
<style>
    #map {
        height: 600px;
    }
</style>
