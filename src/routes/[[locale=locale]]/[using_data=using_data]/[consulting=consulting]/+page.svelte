<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';
  import {parseEntries} from '$lib/js/parse_cms';

  onMount(() => {
    $page_key = 'navbar.using_data.consulting';
  });

  export let data;
  $: experts = parseEntries(data.experts, 'experts');
</script>

<div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
  {#each experts as person}
    <Person {...person} />
  {/each}
</div>
