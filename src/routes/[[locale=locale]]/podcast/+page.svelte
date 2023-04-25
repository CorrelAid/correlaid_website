<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import BlogCard from '$lib/components/Blog_Card.svelte';

  onMount(() => {
    $page_key = 'navbar.podcast';
  });

  export let data;
  let podcast_episodes;
  $: podcast_episodes = data.podcast_episodes;
</script>

<div class="container mx-auto space-y-4 pb-8 pl-4 pr-6">
  <div class="grid grid-cols-2 gap-6">
    {#each podcast_episodes as episode, i}
      <BlogCard
        {i}
        langs={[episode.language]}
        href={episode.soundcloud_link}
        title={episode.title}
        teaser={episode.description}
        tags={episode.tags}
        image_url={null}
        content_creators={episode.content_creators}
      />
    {/each}
  </div>
</div>
