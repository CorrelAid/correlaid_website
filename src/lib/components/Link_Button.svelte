<script>
    export let href;
    export let text;
    export let type = "";
    export let color;
    import ExternalLink from "../svg/External_Link.svelte";

    // dafuq
    $: if(color != "bg-secondary"){
        color = "bg-primary"
    }

    $: console.log(color);
</script>

<a
    class="rounded-md px-4 py-2  text-white shadow transition inline-flex items-center {String(color)}"
    {href}
>
    {text}
    {#if type == "external"}<ExternalLink height={20} width={20} />{/if}
</a>
