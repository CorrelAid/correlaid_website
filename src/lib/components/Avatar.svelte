<script>
  import PersonPlaceholder from '../svg/Person_Placeholder.svelte';
  export let src;
  export let alt;
  export let w = 56;
</script>

<div class="offset relative w-{w} mx-auto">
  {#if src}
    <img class="h-56 w-56 rounded border-4 border-neutral" {src} {alt} />
  {:else}
    <div class="rounded border-4 border-neutral">
      <PersonPlaceholder width={200} height={200} />
    </div>
  {/if}
</div>
