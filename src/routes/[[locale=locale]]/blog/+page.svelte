<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t, locale } from "$lib/stores/i18n.js";

    onMount(() => {
        $page_key = "navbar.blog";
    });
    export let data;
    let posts = data.posts;

    const source = "# WIP";
</script>

<ul>
    {#each posts as post}
        <li>
            
                {post.attributes.title}: <a href="{`${$t("navbar.blog").url}/${post.attributes.slug}`}">link</a>
        </li>
    {/each}
</ul>
