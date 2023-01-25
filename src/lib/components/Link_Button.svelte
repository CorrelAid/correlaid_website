<script>
    import ExternalLink from "../svg/External_Link.svelte";
    export let href;
    export let text;
    export let type = null;
    export let color;
    $: console.log(color)
</script>
<a
					class="rounded-md bg-{color} px-4 py-2  text-white shadow transition inline-flex items-center"
					href={href}
				>
					{text} {#if type=="external"}<ExternalLink height={20} width={20} />{/if}
				</a>
