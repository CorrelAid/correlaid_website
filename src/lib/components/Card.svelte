<script>
    export let image_url;
</script>

<article
    class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative h-full"
>
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary"
    />
    <img
        alt="Office"
        src={image_url}
        class="w-full object-cover"

    />

    <div class="p-4 sm:p-6">
        <slot />
        
    </div>
</article>

<style>
    img {
        height: 50%;
        width: 100%;
    }
</style>
