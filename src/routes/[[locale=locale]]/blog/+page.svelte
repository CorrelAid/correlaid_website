<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import { t } from "$lib/stores/i18n";
    import { gen_img_url } from "$lib/js/helpers";
    import BlogCard from "$lib/components/Blog_Card.svelte";

    onMount(() => {
        $page_key = "navbar.blog";
    });

    /** @type {import('./$types').PageData} */
    export let data;

    let posts;
    $: posts = data.posts;
</script>

<div class="container mx-auto px-4 pb-8">
    <div class="gap-6 grid xl:grid-cols-3">
        {#each posts as post, i}
            <div class={i == 0 ? "col-span-full" : "col-span-1"}>
                {#if post.translations[0].title_image}
                <BlogCard
                    {i}
                    href={$t("navbar.blog").url +
                        "/" +
                        post.translations[0].slug}
                    title={post.translations[0].title}
                    teaser={post.translations[0].teaser}
                    tags={post.translations[0].tags}
                    image_url={gen_img_url(
                        post.translations[0].title_image.id,
                        "fit=inside&width=1200&height=675&format=png"
                    )}
                    content_creators={post.content_creators}
                />
                {:else}
                <BlogCard
                    {i}
                    href={$t("navbar.blog").url +
                        "/" +
                        post.translations[0].slug}
                    title={post.translations[0].title}
                    teaser={post.translations[0].teaser}
                    tags={post.translations[0].tags}
                    image_url={null}
                    content_creators={post.content_creators}
                />
                {/if}
            </div>
        {/each}
    </div>
</div>
