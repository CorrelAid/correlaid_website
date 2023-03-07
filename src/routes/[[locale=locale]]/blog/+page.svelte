<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import { t } from "$lib/stores/i18n";
    import { gen_img_url } from "$lib/js/helpers";
    import BlogCard from "$lib/components/Blog_Card.svelte";
    import { get_lang } from "$lib/js/helpers";
    import _ from "lodash";
    import { page } from "$app/stores";

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
                    {#if post.translations.title_image}
                        <BlogCard
                            {i}
                            langs={post.langs}
                            href={$t("navbar.blog").url +
                                "/" +
                                post.translations.slug}
                            title={post.translations.title}
                            teaser={post.translations.teaser}
                            tags={post.translations.tags}
                            image_url={gen_img_url(
                                post.translations.title_image.id,
                                "fit=inside&width=1200&height=675&format=png"
                            )}
                            content_creators={post.content_creators}
                        />
                    {:else}
                    <BlogCard
                            {i}
                            langs={post.langs}
                            href={$t("navbar.blog").url +
                                "/" +
                                post.translations.slug}
                            title={post.translations.title}
                            teaser={post.translations.teaser}
                            tags={post.translations.tags}
                            image_url={null}
                            content_creators={post.content_creators}
                        />
                    {/if}
                </div>
        {/each}
    </div>
</div>
