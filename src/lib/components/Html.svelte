<script>
    export let source;
    export let options = "";

    const typography = "prose-h1:text-3xl  prose-h1:text-neutral prose-h2:text-neutral prose-p:font-normal"
</script>

<!-- see app.css for more prose adjustments -->
<article
    class="prose max-w-none text_width px-4 text-neutral {typography} {options}"
   
>
    {@html source}
</article>
