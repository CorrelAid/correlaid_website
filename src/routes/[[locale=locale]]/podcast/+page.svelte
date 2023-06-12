<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import BlogCard from '$lib/components/Blog_Card.svelte';

  onMount(() => {
    $page_key = 'navbar.podcast';
  });

  export let data;

  $: podcast_episodes = data.podcast_episodes;
</script>

<div class="container mx-auto px-4 pb-8">
  <div class="space-y-8">
    {#each podcast_episodes as episode}
      <BlogCard {...episode} external={true} />
    {/each}
  </div>
</div>
