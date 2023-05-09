<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  onMount(() => {
    $page_key = 'navbar.podcast';
  });

  export let data;

  $: podcast_episodes = parseEntries(data.podcast_episodes, 'podcast_episodes');
</script>

<div class="container mx-auto space-y-4 pb-8">
  <div class="space-y-8">
    {#each podcast_episodes as episode}
      <BlogCard {...episode} />
    {/each}
  </div>
</div>
