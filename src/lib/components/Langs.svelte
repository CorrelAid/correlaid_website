<script>
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  import International from '$lib/svg/International.svelte';
  export let langs;
  const icon_h = 22;
</script>

<div class="absolute top-0 right-0 p-4">
  {#if langs.length !== 2}
    {#each langs as lang}
      {#if lang == 'de-DE'}
        <span
          class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
          role="img"
          aria-label="Verfügbar auf deutsch"
        >
          <De height={icon_h} width={icon_h} />
        </span>
      {:else}
        <span
          class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
          role="img"
          aria-label="Available in english"
        >
          <En height={icon_h} width={icon_h} />
        </span>
      {/if}
    {/each}
  {:else}
    <span
      class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
      role="img"
      aria-label="Bilingual"
    >
      <International height={icon_h} width={icon_h} />
    </span>
  {/if}
</div>
