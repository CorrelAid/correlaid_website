<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import Filter from '../../../lib/components/Filter.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  onMount(() => {
    $pageKey = 'navbar.podcast';
  });

  export let data;
  let filteredData;
  let trimmedData;
  $: podcastEpisodes = data.podcastEpisodes;

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

<Filter
  origData={podcastEpisodes}
  bind:filteredData
  {selects}
  {searchOptions}
/>
<div class="container mx-auto mt-8 px-4 pb-8">
  <div class="space-y-8">
    {#if trimmedData}
      {#each trimmedData as episode}
        <BlogCard {...episode} external={true} />
      {/each}
    {/if}
    {#if filteredData}
      <Pagination
        items={filteredData}
        perPage={8}
        bind:trimmedItems={trimmedData}
      />
    {/if}
  </div>
</div>
