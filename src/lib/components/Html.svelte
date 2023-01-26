<script>
    export let source;
    export let options;
    export let width;
    let style = ""
    if (width == "text"){
        style="max-width: 700px;"
    }
    
</script>

<article class="prose max-w-none mx-auto py-6 px-4 {options} " style={style}>
    {@html source}
</article>
