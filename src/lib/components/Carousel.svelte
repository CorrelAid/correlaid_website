<script>
    import Carousel from "svelte-carousel";
    import { browser } from "$app/environment";
    import { gen_img_url } from "$lib/js/helpers";
    import Html from "$lib/components/Html.svelte";
    export let data;

    let carousel; // for calling methods of the carousel instance

    const handleNextClick = () => {
        carousel.goToNext();
    };

    console.log(data);
</script>

{#if browser}
    <Carousel bind:this={carousel}>
        {#each data as element}
            <div class="aspect-w-16 aspect-h-9 relative">
                <div class=" h-2/4 w-2/4 z-10 absolute top-2/4 left-2/4 p-4">
                    <div class="py-4 bg-white h-full rounded">
                        <Html source={element.item.translations[0].text} />
                    </div>
                </div>
                <div class="absolute h-full w-full">
                    <img
                        alt="Office"
                        src={gen_img_url(
                            element.item.image.id,
                            "fit=cover&width=1280&height=720&quality=100"
                        )}
                        class="h-full w-full"
                    />
                </div>
            </div>
        {/each}
    </Carousel>
{/if}
