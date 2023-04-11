<script>
    export let title;
    export let subtitle;
    export let href = "";

</script>

{#if href != ""}
<a
    class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative "
    href={href}
>
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
    />
    <div class="px-3 pt-4 pb-6">
        <h3 class="pb-3 line-clamp-3 text-xl font-medium">{title}</h3>
        <h4 class="text-md line-clamp-4">{subtitle}</h4>
    </div>

</a>
{:else}
<div
    class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative "
    href={href}
>
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
    />
    <div class="px-3 pt-4 pb-6">
        <h3 class="pb-3 line-clamp-3 text-xl font-medium">{title}</h3>
        <h4 class="text-md">{subtitle}</h4>
    </div>

</div>
{/if}
