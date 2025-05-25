<script>
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  import International from '$lib/svg/International.svelte';
  import {t} from '$lib/stores/i18n';
  let {langs} = $props();
  const iconSize = 22;
</script>

{#if langs.length !== 2}
  {#each langs as lang}
    {#if lang == 'de-DE'}
      <span
        class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
        aria-hidden="true"
      >
        <De height={iconSize} width={iconSize} />
      </span>
      <span class="sr-only">{$t(`access.language_`).text} {lang}</span>
    {:else}
      <span
        class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
        aria-hidden="true"
      >
        <En height={iconSize} width={iconSize} />
      </span>
      <span class="sr-only">{$t(`access.language_`).text} {lang}</span>
    {/if}
  {/each}
{:else}
  <span
    class="inline-block rounded-full bg-white p-1 shadow-none md:p-0"
    aria-hidden="true"
  >
    <International height={iconSize} width={iconSize} />
  </span>
  <span class="sr-only">Bilingual</span>
{/if}
