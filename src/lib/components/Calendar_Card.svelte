<script>
    import { locale } from "$lib/stores/i18n.js";
    import { gen_date } from "$lib/js/helpers.js";
    export let image_url;
    export let href;
    export let title;
    export let teaser;
    export let date;
    export let tags;
    let proc_date;
    $: proc_date = gen_date(date, $locale);
</script>

<div class="w-full  relative offset-right" style="">
    <div class="w-full border border-neutral-25 rounded h-full p-4 bg-white relative top-0 z-1 grid grid-cols-4">
        <div class="col-span-full xl:col-span-3 ">
            <div class=" flex space-x-2 align-center w-40 pb-2">
                <span class="text-xl font-light">{proc_date}</span>
            </div>

            <div class="pb-4">
                <a
                    {href}
                    class="text-xl font-bold text-base-content hover:text-primary transition"
                >
                    {title}
                </a>
            </div>

            <div class="flex gap-x-2 w-full pb-4">
                {#each tags as tag}
                    <span
                        class="text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"
                        >{tag}</span
                    >
                {/each}
            </div>

            <p class="text-base-content line-clamp-3 xl:pr-4 mb-4 xl:pb-0">
                {teaser}
            </p>
        </div>
        <a {href} class="aspect-w-16 aspect-h-9 xl:col-span-1 col-span-full">
            <img alt="Office" src={image_url} class="h-full rounded" />
        </a>
    </div>
</div>

