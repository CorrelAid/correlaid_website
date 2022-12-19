<script>
    import SvelteMarkdown from "svelte-markdown";
    const source = "# Header \n ## Header";
</script>

<article class="prose">
    <SvelteMarkdown {source} />
</article>
