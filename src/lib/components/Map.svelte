<script>
    import { page } from "$app/stores";
    import { get_locale } from "$lib/js/helpers";
    import { onMount, onDestroy } from "svelte";
    import { Map, Popup, AttributionControl } from "maplibre-gl";
    import { locale } from "$lib/stores/i18n";
    import "maplibre-gl/dist/maplibre-gl.css";

    let map;
    let mapContainer;


    export let geo_json;

    const external_svg =
        '<svg width=15 height=15 fill="#f04451" viewBox="0 0 1200 1200" stroke="#f04451" class="mr-1"> <g> <path d="m609.43 708.66c-21.516 10.852-30.133 37.121-19.281 58.586 8.2578 16.457 11.023 35.133 8.1992 53.043-2.7148 17.051-10.852 33.691-24.234 47.133l-2.0508 2.1719-186.44 186.37-0.10938 0.125-0.0625-0.125-0.125 0.1875-1.6289 1.7539c-16.457 15.492-37.852 23.258-59.254 23.258-22.121 0-44.305-8.3711-60.934-24.949l0.0625-0.0625-119.66-119.64-1.7422-1.6914c-15.492-16.395-23.332-37.848-23.332-59.191 0-22.184 8.3828-44.367 24.961-60.996l0.11328 0.0625 0.125-0.125 2.0508-2.1758 186.44-186.55 0.10938 0.0625c13.383-13.383 30.023-21.469 47.145-24.172 17.836-2.8398 36.527-0.125 52.984 8.1367 21.516 10.852 47.797 2.2227 58.648-19.234 10.852-21.516 2.1719-47.797-19.297-58.648-32.973-16.578-70.215-22-106.03-16.332-35.07 5.543-68.648 21.766-95.348 48.402l0.0625 0.125-0.0625 0.050781-186.38 186.44-2.1719 2.0508-0.17188 0.125 0.11328 0.0625-0.11328 0.10938c-33.699 33.766-50.637 78.305-50.637 122.61 0 43.34 16.219 86.797 48.402 120.25l2.2344 2.4688 0.17188 0.125 119.35 119.41 0.125 0.125 0.125-0.125 0.0625 0.125c33.812 33.75 78.289 50.625 122.6 50.625 43.34 0 86.809-16.145 120.31-48.391l2.418-2.2344 0.17187-0.125-0.10937-0.125 186.55-186.43 2.1719-2.0508c26.703-26.641 42.91-60.277 48.465-95.363 5.6523-35.738 0.17188-72.996-16.406-105.96-10.859-21.52-37.129-30.133-58.598-19.285z"/> <path d="m382.8 817.21c17.059 17.109 44.785 17.109 61.906 0l372.5-372.51c17.062-17.062 17.062-44.785 0-61.91-17.047-17.059-44.785-17.059-61.832 0l-372.57 372.58c-17.062 17.059-17.062 44.785 0 61.844z"/> <path d="m1168.6 324.45c0-43.344-16.207-86.809-48.402-120.31l-2.2227-2.418-119.66-119.65-0.0625 0.0625-0.10938-0.0625c-33.766-33.758-78.305-50.695-122.61-50.695-43.34 0-86.797 16.219-120.31 48.465l-2.4062 2.2344-0.18359 0.125 0.125 0.050781-186.57 186.5-2.1602 2.0508c-26.652 26.641-42.863 60.219-48.465 95.301-5.6641 35.801-0.18359 73.117 16.395 106.03 10.852 21.457 37.133 30.133 58.59 19.281 21.516-10.852 30.133-37.133 19.281-58.648-8.2461-16.395-11.023-35.082-8.1367-52.984 2.7148-17.121 10.789-33.75 24.172-47.133l2.0508-2.2344 186.44-186.32 0.125-0.125 0.0625 0.125 0.10938-0.16797 1.6289-1.75c16.453-15.492 37.91-23.27 59.254-23.27 22.184 0 44.367 8.3203 60.996 24.898l-0.11328 0.12109 119.64 119.65 1.7539 1.6289c15.48 16.457 23.32 37.848 23.32 59.254 0 22.184-8.3828 44.293-24.949 60.934l-0.125-0.0625-0.125 0.18359-2.0508 2.1719-186.43 186.49-0.125-0.0625c-13.32 13.383-30.023 21.516-47.145 24.234-17.836 2.8398-36.516 0.125-52.984-8.1992-21.453-10.852-47.738-2.2344-58.637 19.293-10.801 21.457-2.1719 47.738 19.281 58.652 32.973 16.504 70.277 21.996 106.03 16.332 35.082-5.543 68.711-21.766 95.348-48.402l-0.046875-0.125 0.046875-0.0625 186.38-186.43 2.1719-2.0508 0.1875-0.125-0.125-0.125 0.125-0.058594c33.691-33.746 50.629-78.301 50.629-122.59z"/> </g></svg>';

    onMount(async () => {
        const apiKey = "cYwZssWUHS4exn283ZO4";

        // initial map position and zoom
        const initialState = { lng: 5.5, lat: 49, zoom: 4.2 };

        map = new Map({
            container: mapContainer,
            // retreiving base map from maptiler
            style: `https://api.maptiler.com/maps/dataviz/style.json?key=${apiKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
            // restricting zoom values
            maxZoom: 11,
            minZoom: 4,
            // setting map boundaries
            maxBounds: [
                [-20, 32],
                [40, 65],
            ],
            attributionControl: false
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
                data: geo_json,
            });

            // first symbol layer contains chapter markers
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
                },
                firstSymbolId
            );
            // colouring countries
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

        // clickable markers
        map.on("click", "lcs", (e) => {
            const lcs = e.features[0];

            new Popup({ closeOnClick: true, offset: 10, closeButton: true })
                .setHTML(
                    `<div class="pt-2 px-2 pb-1 flex justify-center align-center">
                        ${external_svg}
                    <a class="font-bold text-tertiary hover:underline text-sm font-sans text-base" href="/${
                        get_locale($page.params) == "de" ? "" : "en"
                    }/community/correlaidx/${lcs.properties.city}">${
                        lcs.properties.name
                    }</a>
                    </div>`
                )

                .setLngLat(lcs.geometry.coordinates)
                .addTo(map);
        });

        map.addControl(new AttributionControl({compact: true}), 'top-right');

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on("mouseenter", "lcs", function () {
            map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "lcs", function () {
            map.getCanvas().style.cursor = "";
        });
    });
    onDestroy(() => {
        if (map) {
            map.remove();
        }
    });

    // reactive map language
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

<a href="https://www.maptiler.com" class="absolute left-4 top-2 z-10 "
    ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a
>
<div
    class="w-full border border-neutral-25 rounded map_height"
    bind:this={mapContainer}
/>

