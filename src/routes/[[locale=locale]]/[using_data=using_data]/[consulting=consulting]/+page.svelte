<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $pageKey = 'navbar.using_data.consulting';
  });

  let {data} = $props();
  let experts = $derived(data.experts);
</script>

<div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
  {#each experts as person}
    <Person {...person} />
  {/each}
</div>
