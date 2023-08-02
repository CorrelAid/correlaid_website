<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $page_key = 'navbar.about.values';
  });

  export let data;

  $: ethics_commission = data.ethics_commission;
</script>

<div class="container mx-auto flex flex-col gap-y-8 px-4">
  {#each ethics_commission as person}
    <Person {...person} />
  {/each}
</div>
