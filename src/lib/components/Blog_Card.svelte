<script>
    import Card from "./Card.svelte";

    export let i;
    export let image_url;
    export let href;
    export let title;
    export let teaser;
    export let tags;
    export let content_creators;
</script>

<Card {image_url} {i} {href}>
    <a {href}>
        <h3 class="text-lg font-bold text-base-content">
            {title}
        </h3>
    </a>

    <p class="pt-2 pb-4">
        {#each content_creators as person, i}
            {person.Content_Creators_id.person
                .name}{#if i < content_creators.length - 1}{", "} {/if}
        {/each}
    </p>

    <div class="flex gap-x-2 w-full">
        {#each tags as tag}
            <span
                class="text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"
                >{tag}</span
            >
        {/each}
    </div>
    <div class="py-4">
        <p
            class="leading-relaxed text-base-content line-clamp-3 overflow-hidden"
        >
            {teaser}
        </p>
    </div>
</Card>
