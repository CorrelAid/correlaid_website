<script>
	export let source;
    import SvelteMarkdown from 'svelte-markdown'
</script>

<article class="prose">
	<SvelteMarkdown {source} />
</article>

<style>
</style>