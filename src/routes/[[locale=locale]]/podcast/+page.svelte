<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import Filter from '../../../lib/components/Filter.svelte';

  onMount(() => {
    $page_key = 'navbar.podcast';
  });

  export let data;
  let filter_data;
  $: podcast_episodes = data.podcast_episodes;

  const selects = [
    {
      title: $t('filter.language').text,
      searchable: false,
      multiple: true,
      param: 'langs',
    },
  ];

  const searchOptions = [
    {name: 'title', multiple: false},
    {name: 'teaser', multiple: false},
  ];
</script>

<Filter
  orig_data={podcast_episodes}
  bind:filter_data
  {selects}
  {searchOptions}
/>
<div class="container mx-auto mt-8 px-4 pb-8">
  <div class="space-y-8">
    {#if filter_data}
      {#each filter_data as episode}
        <BlogCard {...episode} external={true} />
      {/each}
    {/if}
  </div>
</div>
