<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import WorkshopCard from '$lib/components/WorkshopCard.svelte';

  onMount(() => {
    $page_key = 'navbar.education.resources';
  });

  export let data;
  $: workshops = data.workshops;
</script>

<div class="space-y-6 px-4">
  {#each workshops as workshop}
    <WorkshopCard {...workshop} />
  {/each}
</div>
