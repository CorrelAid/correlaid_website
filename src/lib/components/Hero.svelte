<script>
    import LinkButton from "./Link_Button.svelte";
    import { header_height } from "$lib/stores/dims";
    import { gen_img_url } from "$lib/js/helpers";
    export let builder;
    export let image_id;
    
</script>

<section
    class="relative bg-cover bg-center bg-no-repeat"
    style="background-image: url({`${gen_img_url(image_id)}`}); height: calc(100vh - {$header_height}px)"
>
    <div
        class="absolute inset-0 bg-gradient-to-r from-secondary/75 to-primary/75"
    />

    <div
        class="absolute m-auto w-screen-sm left-0 top-1/4 xl:top-2/4 xl:left-1/4"
    >
        <div class="">
            {#if builder}
                {#each builder as section}
                    {#if section.collection == "button_groups"}
                        <div class="fix space-x-2 px-4">
                            {#each section.item.builder as button}
                                <LinkButton
                                    text={button.item.translations[0].text}
                                    href={""}
                                    color={`bg-${button.item.color}`}
                                />
                            {/each}
                        </div>
                    {:else if section.collection == "text_fields"}
                        <h2 class="px-4 pb-8 font-bold text-4xl text-white tracking-wide">{section.item.translations[0].text}</h2>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</section>
