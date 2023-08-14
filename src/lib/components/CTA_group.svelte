<script>
  import Cta from './CTA.svelte';
  export let ctas;
</script>

{#each ctas as cta}
  <Cta {...cta} />
{/each}
