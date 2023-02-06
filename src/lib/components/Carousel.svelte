<script>
    import Carousel from "svelte-carousel";
    import MediaQuery from "svelte-media-queries";
    import { browser } from "$app/environment";
    import { gen_img_url } from "$lib/js/helpers";
    import Html from "$lib/components/Html.svelte";
    import { header_height } from "$lib/stores/dims.js";
    export let data;

    let carousel; // for calling methods of the carousel instance

    const handleNextClick = () => {
        carousel.goToNext();
    };

    function goTo(x) {
        carousel.goTo(x, { animated: true });
    }
</script>

{#if browser}
    <div class="lg:aspect-w-16 lg:aspect-h-9 aspect-w-9 aspect-h-16">
        <Carousel bind:this={carousel} arrows={false}>
            {#each data as element}
                <div class="relative h-5/6">
                    <div class="h-full w-full">
                        <div
                            class="h-2/4 w-3/4 lg:w-2/4 z-10 top-2/4  left-1/4 lg:left-2/4 p-4 absolute"
                        >
                            <div class="py-4 bg-white h-full rounded">
                                <Html
                                    source={element.item.translations[0].text}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="absolute h-full w-full">
                        <MediaQuery
                            query={[
                                "(min-width: 640px)",
                                "(min-width: 768px)",
                                "(min-width: 1024px)",
                                "(min-width: 1280px)",
                            ]}
                            let:matches
                        >
                            {@const [sm, md, lg, xl] = matches}

                            <img
                                alt="Office"
                                src={lg
                                    ? gen_img_url(
                                          element.item.image.id,
                                          "fit=cover&width=1280&height=720&quality=100"
                                      )
                                    : gen_img_url(
                                          element.item.image.id,
                                          "fit=cover&width=720&height=1280&quality=100"
                                      )}
                                class="h-full w-full"
                            />
                        </MediaQuery>
                    </div>
                </div>
            {/each}
        </Carousel>
        {#each data as element, i}
            <button
                class="button px-4"
                on:click={() => {
                    goTo(i);
                }}>Go</button
            >
        {/each}
    </div>
{/if}
