<script>
	import SvelteMarkdown from 'svelte-markdown'
	export let text;   
	export let size; 
</script>

<article class="prose prose-{size} w-full max-w-none">
	<SvelteMarkdown source={text} />
</article>





