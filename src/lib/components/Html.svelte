<script>
    export let source;
    export let options;
    export let width;
    let style = "";
    $: if (width == "text") {
        style = "max-width: 800px;";
    } else {
        style = "";
    }

    $: console.log(width);
</script>

<article
    class="prose max-w-none container mx-auto py-10 px-4 text-neutral prose-h1:text-3xl prose-h1:mb-5 
    prose-h2:mt-2 prose-h1:text-neutral prose-h2:text-neutral prose-img:aspect-w-16 prose-img:aspect-h-9 {options} "
    {style}
>
    {@html source}
</article>
