<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    $page_key = 'navbar.home';
  });

  let posts;
  $: posts = data.posts;
  let events;
  $: events = data.events;
  let podcast_episodes;
  $: podcast_episodes = data.podcast_episodes;
</script>

<div class="px-4">
  <div class="mb-12">
    <a
      class="text-3xl font-bold text-base-content transition hover:text-primary"
      href={$t('navbar.events').url}>{$t('navbar.events').text}</a
    >
  </div>
  <div class="grid gap-6">
    {#each events as event}
      <Events_Card {...event} />
    {/each}
  </div>

  <div class="my-12">
    <a
      class="text-3xl font-bold text-base-content transition hover:text-primary"
      href={$t('navbar.blog').url}>Blog</a
    >
  </div>
  <div class="space-y-8">
    {#each posts as post}
      <div>
        <BlogCard {...post} />
      </div>
    {/each}
  </div>

  <div class="my-12">
    <a
      class="text-3xl font-bold text-base-content transition hover:text-primary"
      href={$t('navbar.podcast').url}>Podcast</a
    >
  </div>
  <div class="space-y-8">
    {#each podcast_episodes as episode}
      <BlogCard {...episode} external={true} />
    {/each}
  </div>
</div>
