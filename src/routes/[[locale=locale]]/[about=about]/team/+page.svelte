<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import Person from '$lib/components/Person.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  onMount(() => {
    $page_key = 'navbar.about.team';
  });
  export let data;

  $: remote_office = parseEntries(data.remote_office, 'global_administrators');
  $: board = parseEntries(data.board, 'global_administrators');
  $: organizational_structure = data.organizational_structure;
</script>

<div class="mt-12">
  <Html
    source={organizational_structure.translations[0].remote_office}
    options={'pb-12  mx-auto'}
  />

  <div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
    {#each remote_office as person}
      <Person {...person} />
    {/each}
  </div>

  <Html
    source={organizational_structure.translations[0].board}
    options={'mx-auto pb-12'}
    width={'text'}
  />

  <div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
    {#each board as person}
      <Person {...person} />
    {/each}
  </div>
</div>
