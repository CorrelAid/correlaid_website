<script>
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  import International from '$lib/svg/International.svelte';
  export let langs;
  import {t} from '$lib/stores/i18n';
  const icon_h = 22;

  $: console.log(langs);
</script>

<div class="absolute right-0 top-0 z-20 p-2">
  {#if langs.length !== 2}
    {#each langs as lang}
      {#if lang == 'de-DE'}
        <span
          class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
          aria-hidden="true"
        >
          <De height={icon_h} width={icon_h} />
        </span>
        <span class="sr-only">{$t(`access.language_`).text} {lang}</span>
      {:else}
        <span
          class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
          aria-hidden="true"
        >
          <En height={icon_h} width={icon_h} />
        </span>
        <span class="sr-only">{$t(`access.language_`).text} {lang}</span>
      {/if}
    {/each}
  {:else}
    <span
      class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
      aria-hidden="true"
    >
      <International height={icon_h} width={icon_h} />
    </span>
    <span class="sr-only">Bilingual</span>
  {/if}
</div>
