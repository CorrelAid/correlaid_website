<script>
    import Card from "./Card.svelte";
    import Calendar from "$lib/svg/Calendar.svelte";
    import { t, locale, locales } from "$lib/stores/i18n.js";
    export let image_url;
    export let href;
    export let title;
    export let teaser;
    export let date;
    export let tags;

    const options = {
        month: "numeric",
        day: "numeric",
    };

    $: console.log(tags);

    $: date = new Date(Date.parse(date));
</script>

<Card {image_url}>
    <a {href}>
        <h3 class="text-lg font-bold text-base-content">
            {title}
        </h3>
    </a>

    <div class="py-2 flex space-x-2 align-center w-40">
        <Calendar height={25} width={25} />
        <span class="text-md">{date.toLocaleString($locale, options)}</span>
    </div>

    <div class="flex gap-x-2 w-full">
        {#each tags as tag}
            <span
                class="text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"
                >{tag}</span
            >
        {/each}
    </div>

    <p class="mt-2 text-sm leading-relaxed text-base-content line-clamp-3">
        {teaser}
    </p>
</Card>
