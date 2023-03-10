<script>
    export let name;
    export let position;
    export let description;
    export let img;
    export let mastodon = "";
    export let website = "";
    export let twitter = "";
    export let linkedin = "";
    export let github = "";
    import Links from "$lib/components/Links.svelte";
    $: console.log(github)
</script>

<div class="rounded grid grid-cols-4 pb-6">
    {#if img}
        <div class="col-span-full xl:col-span-2  ">
            <div class="relative offset w-56 h-56 mx-auto">
                <img
                    class="w-56 h-56 border-4 border-neutral rounded"
                    src={img}
                    alt={name}
                />
            </div>
        </div>
    {/if}
    <div class="col-span-full xl:col-span-2 xl:pt-0 pt-5 px-4 text-neutral">
        <h2 class="text-2xl text-primary pb-3">{name}</h2>
        {#if position && description}
            <h3 class="text-lg pb-3">{position}</h3>
            <p class="pb-3">{description}</p>
        {/if}
        <Links {website} {mastodon} {twitter} {linkedin} {github} />
    </div>
</div>
