<script>
  import PersonPlaceholder from '../svg/PersonPlaceholder.svelte';
  export let imageSrc = void 0;
  export let imageAlt;
  export let imageDesc = void 0;
  export let w = 56;
</script>

<div class="relative">
  <div class="offset relative w-{w} mx-auto mt-3 md:mx-4">
    {#if imageSrc}
      <img
        class="h-56 w-56 rounded border-4 border-neutral"
        src={imageSrc}
        alt={imageAlt}
      />
    {:else}
      <div
        class="rounded border-4 border-neutral"
        aria-label="Person placeholder image"
        role="img"
      >
        <PersonPlaceholder width={200} height={200} />
      </div>
    {/if}
  </div>
  {#if imageDesc}
    <span class="mt-1 block px-4 text-xs md:px-4"> {imageDesc} </span>
  {/if}
</div>
