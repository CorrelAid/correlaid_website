<script>
    import Calendar from "$lib/svg/Calendar.svelte";
    import { locale } from "$lib/stores/i18n.js";
    export let image_url;
    export let href;
    export let title;
    export let teaser;
    export let date;
    export let tags;

    const options = {
        month: "long",
        day: "numeric",
    };

    $: console.log(tags);

    $: date = new Date(Date.parse(date));
</script>

<div class="w-full border rounded relative offset" style="">
    <div class="w-full h-full p-4 bg-white relative top-0 z-1 grid grid-cols-4">
        <div class="col-span-full xl:col-span-3 ">
            <div class=" flex space-x-2 align-center w-40 pb-2">
                <span class="text-lg font-light"
                    >{date.toLocaleString($locale, options)}</span
                >
                
                
            </div>
            <a {href}>
                <h3 class="text-xl font-bold text-base-content pb-4">
                    {title}
                </h3>
            </a>

            <div class="flex gap-x-2 w-full pb-4">
                {#each tags as tag}
                    <span
                        class="text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"
                        >{tag}</span
                    >
                {/each}
            </div>

            <p
                class="text-base-content line-clamp-3 xl:pr-4 pb-4 xl:pb-0"
            >
                {teaser}
            </p>
        </div>
        <div class="aspect-w-16 aspect-h-9 xl:col-span-1 col-span-full">
            <img alt="Office" src={image_url} class="h-full rounded" />
        </div>
    </div>
</div>

<style>
    .offset::after {
        content: "";
        border-radius: 4px;
        border-right: 7px solid transparent;
        background: linear-gradient(to top, #3863a2, #96c342) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        top: 0px;
        bottom: 0px;
        right: -7px;
        position: absolute;
        opacity: 1;
        width: calc(100% - 4px);
        opacity: 0.8;
    }
</style>
