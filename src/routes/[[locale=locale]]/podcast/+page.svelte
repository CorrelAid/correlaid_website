<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.podcast";
    });

    export let data;
    let podcast_episodes;
    $: podcast_episodes = data.podcast_episodes;

</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
    <ul>
      {#each podcast_episodes as podcast_episode, i}
        <li>
          {podcast_episode.title}
        </li>
      {/each}
    </ul>
  </div>

