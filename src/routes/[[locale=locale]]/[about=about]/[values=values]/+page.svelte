<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  onMount(() => {
    $page_key = 'navbar.about.values';
  });

  export let data;

  const ethics_commission = parseEntries(
    data.ethics_commission,
    'global_administrators',
  );
</script>

<div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
  {#each ethics_commission as person}
    <Person {...person} />
  {/each}
</div>
