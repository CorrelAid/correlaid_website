<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Partner from '$lib/components/Partner.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  onMount(() => {
    $page_key = 'navbar.about.partners';
  });

  export let data;
  $: partners = parseEntries(data.partners, 'partners');
</script>

<div class="mt-12">
  <div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
    {#each partners as partner}
      <Partner {...partner} />
    {/each}
  </div>
</div>
