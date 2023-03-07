<script>
    export let title;
    export let organization;
    export let href;

</script>

<a
    class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative "
    href={href}
>
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
    />
    <div class="px-3 pt-4 pb-6">
        <h3 class="pb-3 line-clamp-3 text-xl">{title}</h3>
        <h4 class="text-lg">{organization.Projects_Organization_id.translations[0].name}</h4>
    </div>

</a>
