<script>
	import SvelteMarkdown from 'svelte-markdown'
	export let text;   
	export let size; 
</script>

<article class="prose prose-{size}">
	<SvelteMarkdown source={text} />
</article>





