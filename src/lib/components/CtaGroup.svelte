<script>
  import Cta from './CTA.svelte';
  let {ctas} = $props();
</script>

{#each ctas as cta}
  <Cta {...cta} />
{/each}
