<script>
    import Facebook from "$lib/svg/Facebook.svelte";
    import Instagram from "../svg/Instagram.svelte";
    import Twitter from "../svg/Twitter.svelte";
    import Youtube from "../svg/Youtube.svelte";
    import Github from "../svg/Github.svelte";
    import Linkedin from "../svg/Linkedin.svelte";
    import Mastodon from "../svg/Mastodon.svelte";
    import ExternalLink from "../svg/External_Link.svelte";
    export let name;
    export let position;
    export let description;
    export let img;
    export let mastodon = "";
    export let website = "";
    export let twitter = "";
    export let linkedin = "";
    export let github = "";

    const social_media_height = 25;
</script>

<div class="rounded grid grid-cols-4">
    <div class="col-span-full xl:col-span-2  ">
        <div class="relative offset w-56 h-56 mx-auto">
            <img
                class="w-56 h-56 border-4 border-neutral rounded"
                src={img}
                alt={name}
            />
        </div>
    </div>
    <div class="col-span-full xl:col-span-2 xl:pt-0 pt-5 px-4 text-neutral">
        <h2 class="text-2xl text-primary">{name}</h2>
        <h3 class="text-lg pt-2 pb-3">{position}</h3>
        <p>{description}</p>

        <div class="flex gap-x-2 mt-4">
            {#if website != ""}<a href={website} class=""
                    ><ExternalLink width={social_media_height} height={social_media_height} /></a
                >{/if}
            {#if twitter != ""}<a href={twitter} class=""
                    ><Twitter
                        width={social_media_height}
                        height={social_media_height}
                    /></a
                >{/if}
            {#if mastodon != ""}<a href={mastodon} class=""
                    ><Mastodon
                        width={social_media_height}
                        height={social_media_height}
                    /></a
                >{/if}
            {#if linkedin != ""}<a href={linkedin} class=""
                    ><Linkedin
                        width={social_media_height}
                        height={social_media_height}
                    /></a
                >{/if}
                {#if github != ""}<a href={github} class=""
                ><Github
                    width={social_media_height}
                    height={social_media_height}
                /></a
            >{/if}
        </div>
    </div>
</div>


