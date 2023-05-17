<script>
  import PersonPlaceholder from '../svg/Person_Placeholder.svelte';
  export let src = void 0;
  export let alt;
  export let image_desc = void 0;
  export let w = 56;
</script>

<div class="relative">
  <div class="offset relative w-{w} mx-auto mt-3 md:mx-4">
    {#if src}
      <img class="h-56 w-56 rounded border-4 border-neutral" {src} {alt} />
    {:else}
      <div class="rounded border-4 border-neutral">
        <PersonPlaceholder width={200} height={200} />
      </div>
    {/if}
  </div>
  {#if image_desc}
    <span class="mt-1 block px-4 text-xs md:px-4"> {image_desc} </span>
  {/if}
</div>
