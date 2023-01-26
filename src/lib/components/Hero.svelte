<script>
    import Html from "$lib/components/Html.svelte";
    import LinkButton from "./Link_Button.svelte";
    export let builder;
    export let image_id;
    import { header_height } from "$lib/stores/dims.js";
</script>

<section
    class="relative bg-cover bg-center bg-no-repeat"
    style="background-image: url({`https://6xdv3yb3.directus.app/assets/${image_id}`}); height: calc(100vh - {$header_height}px)"
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
                        {#each section.item.builder as buttons}
                            <LinkButton text={buttons.item.translations[0].text} href= {""} color={buttons.item.color}/>
                        {/each}
                    </div>
                    {:else if section.collection == "wysiwyg"}
                        <Html
                            source={section.item.translations[0].content}
                            options={"prose-h2:text-white prose-h2:text-4xl prose-p:text-white prose-p:text-lg"}
                        />
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</section>


