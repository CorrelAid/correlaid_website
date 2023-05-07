<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    $page_key = 'navbar.home';
  });

  const posts = parseEntries(data.posts, 'blog_posts');
  const events = parseEntries(data.events, 'events');
  const podcast_episodes = parseEntries(
    data.podcast_episodes,
    'podcast_episodes',
  );
</script>

<div class="">
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
  <div class="grid gap-6 xl:grid-cols-2">
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
  <div class="grid gap-6 xl:grid-cols-2">
    {#each podcast_episodes as episode}
      <BlogCard {...episode} />
    {/each}
  </div>
</div>
