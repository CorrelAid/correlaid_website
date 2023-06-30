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
  let filter_data;
  let posts;
  $: posts = data.posts;
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

<Filter orig_data={posts} bind:filter_data {selects} {searchOptions} />
<div class="mt-8 space-y-8 px-4">
  {#if filter_data}
    {#each filter_data as post, i}
      <div class={i === 0 ? 'col-span-full' : 'col-span-1'}>
        <BlogCard {...post} />
      </div>
    {/each}
  {/if}
</div>
