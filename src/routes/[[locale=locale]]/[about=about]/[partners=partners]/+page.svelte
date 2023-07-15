<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Partner from '$lib/components/Partner.svelte';

  onMount(() => {
    $page_key = 'navbar.about.partners';
  });

  export let data;
  $: partners = data.partners;
</script>

<div class="mt-12">
  <div class="container mx-auto flex flex-col space-y-8">
    {#each partners as partner}
      <Partner {...partner} />
    {/each}
  </div>
</div>
