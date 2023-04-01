<script>
    export let source;
    export let options = "";
</script>

<!-- see app.css for more prose adjustments -->
<article
    class="prose max-w-none text_width px-4 text-neutral prose-h1:text-3xl  prose-h1:text-neutral prose-h2:text-neutral {options}"
   
>
    {@html source}
</article>
