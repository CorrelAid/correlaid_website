<script>
    import { onMount } from "svelte";
    import mermaid from "mermaid";

    let diagram;
    const config = {
      startOnLoad: true,
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'cardinal' },
      securityLevel: 'loose',
    };

    mermaid.initialize({
            startOnLoad: false,

            theme: "forest",
            config
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
