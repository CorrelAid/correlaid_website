<script>
    export let name;
    export let position = "";
    export let description;
    export let img;
    export let mastodon = "";
    export let website = "";
    export let twitter = "";
    export let linkedin = "";
    export let github = "";
    export let email = "";
    export let is_partner = false;
    import Avatar from "$lib/components/Avatar.svelte";
    import Links from "$lib/components/Links.svelte";

    $: console.log(description);
</script>

<div class="rounded grid grid-cols-4 pb-6 gap-x-12 pt-8">
    {#if img}
        <div class="col-span-full xl:col-span-1  ">
            {#if is_partner === true}
            <div class="relative mx-auto w-56 h-36 flex items-center justify-center" >
                <img class="" src={img} alt={name} />
            </div>
            {:else}
                <Avatar src={img} alt={name} />
            {/if}
        </div>
    {/if}
    <div class="col-span-full xl:col-span-3 xl:pt-0 pt-5 px-4 text-neutral">
        <h2 class="text-2xl text-primary pb-3">{name}</h2>
        {#if position != ""}
            <h3 class="text-lg pb-3">{position}</h3>
        {/if}
        {#if description != ""}
            <p class="pb-3">{description}</p>
        {/if}
        {#if email != ""}
            <p><a class="text-secondary" href="mailto:{email}">{email}</a></p>
        {/if}

        <Links {website} {mastodon} {twitter} {linkedin} {github} />
    </div>
</div>
