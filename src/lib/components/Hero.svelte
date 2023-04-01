<script>
    import LinkButton from "./Link_Button.svelte";
    import { header_height } from "$lib/stores/dims";
    import { gen_img_url } from "$lib/js/helpers";
    export let image;
    export let gradient_only;
    export let height;
    export let text;
    export let buttons = [];
    export let correlaidx = false
    import _ from "lodash";

    let image_id;
    $: if (image != null) {
        image_id = image.id;
    }

    $:console.log(buttons)

</script>

<section
    class="relative bg-cover bg-center bg-no-repeat w-screen"
    style="{gradient_only != true
        ? `background-image: url(${gen_img_url(image_id)});`
        : ''}
    {height == 'full'
        ? `height: calc(100vh - ${$header_height}px)`
        : `height: calc((100vh - ${$header_height}px)/2)`}"
>
    <div
        class="absolute inset-0 bg-gradient-to-r {correlaidx == false ? "from-secondary/75 to-primary/75" : "from-tertiary/75 to-secondary/75"}"
    />
        <div class="absolute w-full bottom-2/4">
    <div
        class="text_width"
    >
        <div class="">
            <h2 class="mx-4 font-bold text-4xl text-white tracking-wide ">
                {text}
            </h2>
            {#if buttons != []}
            <div class="fix space-x-2 px-4 mt-8">
                {#each buttons as button}
                    <LinkButton
                        text={button.buttons_id.translations[0].text}
                        href={button.buttons_id.translations[0].link}
                        color={`bg-${button.buttons_id.color}`}
                    />
                {/each}
            </div>
            {/if}
        </div>
    </div>
</div>
</section>
