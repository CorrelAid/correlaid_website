<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import LinkButton from "$lib/components/Link_Button.svelte";
    import Html from "$lib/components/Html.svelte";

    onMount(() => {
        $page_key = "navbar.newsletter";
    });

    export let data;
    let newsletter_overview;
    $: newsletter_overview = data.newsletter_overview;
</script>

<div class="grid grid-cols-2 gap-8 px-4 container mx-auto pb-10">
    <div
        class="lg:col-span-1 col-span-full border border-neutral-25 rounded p-4 z-1 relative offset-right bg-white top-0 z-1"
    >
        <div class="mb-8 line-clamp-5">
            <Html
                source={newsletter_overview.translations[0].nonprofits_text}
            />
        </div>
        <div class="flex pb-10">
            <span class="mx-auto">
                <LinkButton
                    href={newsletter_overview.translations[0].nonprofits_link}
                    text={newsletter_overview.translations[0].nonprofits_button}
                    type={"external"}
                    color={"bg-primary"}
                />
            </span>
        </div>
    </div>
    <div
        class="lg:col-span-1 col-span-full border border-neutral-25 rounded p-4 z-1 relative offset-right bg-white top-0 z-1"
    >
        <div class="mb-8 line-clamp-5">
            <Html
                source={newsletter_overview.translations[0].volunteers_text}
            />
        </div>
        <div class="flex pb-10">
            <span class="mx-auto">
                <LinkButton
                    href={newsletter_overview.translations[0].volunteers_link}
                    text={newsletter_overview.translations[0].volunteers_button}
                    type={"external"}
                    color={"bg-secondary"}
                />
            </span>
        </div>
    </div>
</div>

<style>
</style>
