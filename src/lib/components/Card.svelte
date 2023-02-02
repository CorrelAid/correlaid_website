<script>
    export let image_url;
    export let i;
    export let href;
</script>

<article
    class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative"
    style={i == 0 ? "" : "min-height:450px"}
>
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
    />
    <div class="aspect-w-16 aspect-h-9">
        <a {href} class="">
            <img alt="Office" src={image_url} class="h-full w-full" />
        </a>
    </div>
    <div class="p-4 sm:p-6 ">
        <slot />
    </div>
</article>
