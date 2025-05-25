<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $pageKey = 'navbar.about.values';
  });

  let {data} = $props();

  let ethicsCommission = $derived(data.ethicsCommission);
</script>

<div class="container mx-auto flex flex-col gap-y-8 px-4">
  {#each ethicsCommission as person}
    <Person {...person} />
  {/each}
</div>
