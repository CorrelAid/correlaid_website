<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import Filter from '../../../lib/components/Filter.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  onMount(() => {
    $pageKey = 'navbar.blog';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let filteredData;
  let trimmedData;
  let blogPosts;
  $: blogPosts = data.blogPosts;
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

<Filter origData={blogPosts} bind:filteredData {selects} {searchOptions} />
<div class="mt-8 space-y-8 px-4">
  {#if trimmedData}
    {#each trimmedData as post, i}
      <div class={i === 0 ? 'col-span-full' : 'col-span-1'}>
        <BlogCard {...post} />
      </div>
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
