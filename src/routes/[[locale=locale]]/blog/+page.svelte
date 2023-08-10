<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import Filter from '../../../lib/components/Filter.svelte';

  onMount(() => {
    $page_key = 'navbar.blog';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let filteredData;
  let blog_posts;
  $: blog_posts = data.blog_posts;
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

<Filter orig_data={blog_posts} bind:filteredData {selects} {searchOptions} />
<div class="mt-8 space-y-8 px-4">
  {#if filteredData}
    {#each filteredData as post, i}
      <div class={i === 0 ? 'col-span-full' : 'col-span-1'}>
        <BlogCard {...post} />
      </div>
    {/each}
  {/if}
</div>
