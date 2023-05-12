<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  import Pagination from '$lib/components/pagination/Pagination.svelte';

  const number_of_items = 120;
  const items_per_page = 5;

  onMount(() => {
    $page_key = 'navbar.podcast';
  });

  function changePage(page) {
    console.log(page);
  }

  export let data;

  $: podcast_episodes = parseEntries(data.podcast_episodes, 'podcast_episodes');
</script>

<div class="container mx-auto space-y-4 pb-8">
  <Pagination {number_of_items} {items_per_page} on:navigate={changePage} />
  <div class="space-y-8">
    {#each podcast_episodes as episode}
      <BlogCard {...episode} />
    {/each}
  </div>
</div>
