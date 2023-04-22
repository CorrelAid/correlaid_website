<script>
    import Carousel from "svelte-carousel";
    import MediaQuery from "svelte-media-queries";
    import Html from "$lib/components/Html.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import { browser } from "$app/environment";
    import { gen_img_url } from "$lib/js/helpers";
    export let carousel_elements;

    let carousel; 

    function goTo(x) {
        carousel.goTo(x, { animated: true });
    }
    
</script>

{#if browser}
<!-- https://github.com/vadimkorr/svelte-carousel/issues/29 -->
{#key carousel_elements}
    <Carousel bind:this={carousel} arrows={false} dots={false}>
        {#each carousel_elements as element}
        <Hero
        image={element.carousel_element_id.hero.image}
        text={element.carousel_element_id.hero.translations[0].text}
        height={element.carousel_element_id.hero.height}
        gradient_only={element.carousel_element_id.hero.gradient_only}
        buttons={element.carousel_element_id.hero.buttons}
        
    />
          <!-- <div
                class="relative lg:aspect-w-16 lg:aspect-h-9 aspect-w-9 aspect-h-16"
            >
                <div class="h-full w-full">
                    <div
                        class="h-2/4 w-3/4 lg:w-2/4 z-10 top-2/4  left-1/4 lg:left-2/4 p-10 absolute"
                    >
                        <div class="py-4 bg-white h-full rounded">
                            <Html source={element.item.translations[0].text} />
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
                            class="h-full w-full rounded-t"
                        />
                    </MediaQuery>
                </div>
                <div
                    class="h-full w-full bg-gradient-to-r from-secondary/75 to-primary/75 rounded-t"
                />
            </div> -->
        {/each}
    </Carousel>
    {/key}
    <div
        class="flex justify-center items-center space-x-4 bg-neutral rounded-b"
    >
        {#each carousel_elements as element, i}
            <button
                class="button text-lg px-2 py-4 rounded text-white"
                on:click={() => {
                    goTo(i);
                }}>{element.carousel_element_id.translations[0].title}</button
            >
        {/each}
    </div>
{/if}
