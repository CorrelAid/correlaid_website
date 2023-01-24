<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t, locale } from "$lib/stores/i18n.js";
    import Content from "$lib/components/Content.svelte";
    import Card from "$lib/components/Card.svelte";

    onMount(() => {
        $page_key = "navbar.blog";
    });

    /** @type {import('./$types').PageData} */
    export let data;

    let posts;
    $: posts = data.posts;
</script>

<div class="container mx-auto">    <div class="grid grid-cols-3 gap-4">
        {#each posts as post, i}
            <Card
                href={$t("navbar.blog").url + "/" + post.translations[0].slug}
                title={post.translations[0].title}
                teaser={post.translations[0].teaser}
                image_url={"https://6xdv3yb3.directus.app/assets/" +
                    post.translations[0].title_image.id}
            />
        {/each}
    </div></Content
>
