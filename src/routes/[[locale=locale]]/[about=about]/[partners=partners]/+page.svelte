<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import Partner from '$lib/components/Partner.svelte';

  onMount(() => {
    $pageKey = 'navbar.about.partners';
  });

  let {data} = $props();
  let currentPartners = $derived(data.currentPartners);
  let formerPartners = $derived(data.formerPartners);
</script>

<div class="mt-12">
  <div class="container mx-auto flex flex-col space-y-8">
    {#each currentPartners as partner}
      <Partner {...partner} />
    {/each}
  </div>
  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold">
    {$t('misc.formerPartners').text}
  </h2>
  <div class="container mx-auto flex flex-col space-y-8">
    {#each formerPartners as partner}
      <Partner {...partner} />
    {/each}
  </div>
</div>
