<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import Filter from '../../../lib/components/Filter.svelte';

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
  let filteredData;
  $: podcast_episodes = data.podcast_episodes;

  $: selects = [
    {
      title: $t('filter.language').text,
      searchable: false,
      multiple: true,
      param: 'langs',
    },
  ];

  const searchOptions = [
    {searchProperty: 'title', multiple: false},
    {searchProperty: 'teaser', multiple: false},
  ];
</script>

<Pagination {number_of_items} {items_per_page} on:navigate={changePage} />
<Filter
  orig_data={podcast_episodes}
  bind:filteredData
  {selects}
  {searchOptions}
/>
<div class="container mx-auto mt-8 px-4 pb-8">
  <div class="space-y-8">
    {#if filteredData}
      {#each filteredData as episode}
        <BlogCard {...episode} external={true} />
      {/each}
    {/if}
  </div>
</div>
