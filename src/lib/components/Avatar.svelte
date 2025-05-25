<script>
  import PersonPlaceholder from '../svg/PersonPlaceholder.svelte';

  let {
    imageSrc = void 0,
    imageAlt,
    imageDesc = void 0,
    w = 'w-56',
    wM = 'md:w-56',
    showCredit = true,
  } = $props();
</script>

<div class="relative">
  <div class="offset relative {w} {wM} mx-auto mt-3 md:mx-4">
    {#if imageSrc}
      <img
        class="{w} {w} {wM}  rounded border-4 border-neutral"
        src={imageSrc}
        alt={imageAlt}
      />
    {:else}
      <div
        class="rounded border-4 border-neutral"
        aria-label="Person placeholder image"
        role="img"
      >
        <PersonPlaceholder {w} />
      </div>
    {/if}
  </div>
  {#if imageDesc && showCredit}
    <span class="mt-1 block px-4 text-xs md:px-4"> {imageDesc} </span>
  {/if}
</div>
