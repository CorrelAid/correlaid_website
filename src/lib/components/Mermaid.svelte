<script>
    import { onMount } from "svelte";
    import mermaid from "mermaid";

    let diagram;
    mermaid.initialize({
            startOnLoad: false,

            theme: "forest",
        });

    onMount(() => {

        mermaid.init([ diagram ])
    });
</script>

<div class="mermaid mx-auto" bind:this={diagram}>
    <slot />
</div>

<style>

</style>
