<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import Partner from '$lib/components/Partner.svelte';

  onMount(() => {
    $page_key = 'navbar.about.partners';
  });

  export let data;
  $: partners = data.partners;
  $: financial_supporters = data.financial_supporters;
</script>

<div class="mt-12">
  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold">{$t('misc.partners').text}</h2>
  <div class="container mx-auto flex flex-col space-y-8">
    {#each partners as partner}
      <Partner {...partner} />
    {/each}
  </div>
  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold">
    {$t('misc.financial_supporters').text}
  </h2>
  <div class="container mx-auto flex flex-col space-y-8">
    {#each financial_supporters as partner}
      <Partner {...partner} />
    {/each}
  </div>
</div>
