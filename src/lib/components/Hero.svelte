<script>
    import LinkButton from "./Link_Button.svelte";
    import { header_height } from "$lib/stores/dims";
    import { gen_img_url } from "$lib/js/helpers";
    export let image;
    export let gradient_only;
    export let height;
    export let text;
    export let buttons;
    import _ from "lodash";

    let image_id;
    $: if (image != null) {
        image_id = image.id;
    }
    $: console.log(buttons);
</script>

<section
    class="relative bg-cover bg-center bg-no-repeat"
    style="{gradient_only != true
        ? `background-image: url(${gen_img_url(image_id)});`
        : ''}
    {height == 'full'
        ? `height: calc(100vh - ${$header_height}px)`
        : `height: calc((100vh - ${$header_height}px)/2)`}"
>
    <div
        class="absolute inset-0 bg-gradient-to-r from-secondary/75 to-primary/75"
    />

    <div
        class="absolute m-auto w-screen-sm left-0 top-1/4 xl:top-2/4 xl:left-1/4"
    >
        <div class="">
            <h2 class="px-4 pb-8 font-bold text-4xl text-white tracking-wide ">
                {text}
            </h2>
            <div class="fix space-x-2 px-4">
                {#each buttons as button}
                    <LinkButton
                        text={button.buttons_id.translations[0].text}
                        href={""}
                        color={`bg-${button.buttons_id.color}`}
                    />
                {/each}
            </div>
        </div>
    </div>
</section>
