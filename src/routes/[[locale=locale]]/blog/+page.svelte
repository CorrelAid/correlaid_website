<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t, locale } from "$lib/stores/i18n.js";
    import Content from "$lib/components/Content.svelte";

    onMount(() => {
        $page_key = "navbar.blog";
    });

    /** @type {import('./$types').PageData} */
    export let data;

    let posts;
    $: posts = data.posts;
</script>

<Content>
    <h2 class="text-3xl pb-6 tracking-wide font-light">
        {$t("navbar.blog").text}
    </h2>

    <div class="grid grid-cols-3 gap-4">
        {#each posts as post, i}
            <article
                class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative"
            >
                <span
                    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary"
                />
                <img
                    alt="Office"
                    src="https://6xdv3yb3.directus.app/assets/{post
                        .translations[0].title_image.id}"
                    class="h-34 w-full object-cover"
                />

                <div class="p-4 sm:p-6">
                    <a
                        href={`${$t("navbar.blog").url}/${
                            post.translations[0].slug
                        }`}
                    >
                        <h3 class="text-lg font-medium text-base-content">
                            {post.translations[0].title}
                        </h3>
                    </a>

                    <p
                        class="mt-2 text-sm leading-relaxed text-base-content line-clamp-3"
                    >
                        {post.translations[0].teaser}
                    </p>

                    <a
                        href={`${$t("navbar.blog").url}/${
                            post.translations[0].slug
                        }`}
                        class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-base-content"
                    >
                        Find out more

                        <span
                            aria-hidden="true"
                            class="block transition group-hover:translate-x-0.5"
                        >
                            &rarr;
                        </span>
                    </a>
                </div>
            </article>
        {/each}
    </div></Content
>
