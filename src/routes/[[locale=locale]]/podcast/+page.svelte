<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";
  import Card from "$lib/components/Card.svelte";

  onMount(() => {
    $page_key = "navbar.podcast";
  });

  export let data;
  let podcast_episodes;
  $: podcast_episodes = data.podcast_episodes;
</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
  <div class="grid grid-cols-2 gap-6">
    {#each podcast_episodes as podcast_episode, i}
      <Card
        href={podcast_episode.link}
        title={podcast_episode.title}
        subtitle={podcast_episode.description}
      />
    {/each}
  </div>
</div>
