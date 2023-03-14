<script>
    export let source;
    export let options = "";
    export let width;
</script>

<!-- see app.css for more prose adjustments -->
<article
    class="prose max-w-none container mx-auto px-4 text-neutral prose-h1:text-3xl  prose-h1:text-neutral prose-h2:text-neutral {options} {width == "text" ? "text_width" : ""}"
   
>
    {@html source}
</article>
