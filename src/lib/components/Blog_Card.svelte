<script>
    import Card from "./Card.svelte";
    export let i;
    import { t, locale, locales } from "$lib/stores/i18n.js";
    export let image_url;
    export let href;
    export let title;
    export let teaser;
    export let tags;

   
</script>

<Card image_url={image_url} i = {i} href={href}>
    <a {href}>
        <h3 class="text-lg font-bold text-base-content">
            {title}
        </h3>
    </a>

    <div class="py-2 flex space-x-2 align-center w-40">
       
    </div>

    <div class="flex gap-x-2 w-full">
        {#each tags as tag}
            <span
                class="text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"
                >{tag}</span
            >
        {/each}
    </div>
    <div class="py-4">
    <p class="leading-relaxed text-base-content line-clamp-3 overflow-hidden">
        {teaser}
    </p>
</div>
</Card>
