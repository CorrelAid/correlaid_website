<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import BlogCard from '$lib/components/Blog_Card.svelte';
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
  let podcast_episodes;
  $: podcast_episodes = data.podcast_episodes;
</script>

<div class="container mx-auto space-y-4 pb-8">
  <Pagination {number_of_items} {items_per_page} on:navigate={changePage} />
  <div class="grid gap-6 lg:grid-cols-2">
    {#each podcast_episodes as episode, i}
      <BlogCard
        {i}
        langs={[episode.language]}
        href_pod={episode.soundcloud_link}
        slug={null}
        title={episode.title}
        teaser={episode.description}
        tags={episode.tags}
        image_url={null}
        content_creators={episode.content_creators}
      />
    {/each}
  </div>
</div>
