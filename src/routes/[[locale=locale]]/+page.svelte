<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import EventsCard from '$lib/components/EventsCard.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    $pageKey = 'navbar.home';
  });

  let blogPosts;
  $: blogPosts = data.blogPosts;
  let events;
  $: events = data.events;
  let podcastEpisodes;
  $: podcastEpisodes = data.podcastEpisodes;
</script>

<div class="px-4">
  {#if events.length != 0}
    <div class="mb-12">
      <a
        class="text-3xl font-bold text-base-content transition hover:text-primary"
        href={$t('navbar.events').url}>{$t('navbar.events').text}</a
      >
    </div>
    <div class="grid gap-6">
      {#each events as event}
        <EventsCard {...(({date, ...rest}) => rest)(event)} />
      {/each}
    </div>
  {/if}
  <div class="my-12">
    <a
      class="text-3xl font-bold text-base-content transition hover:text-primary"
      href={$t('navbar.blog').url}>Blog</a
    >
  </div>
  <div class="space-y-8">
    {#each blogPosts as post}
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
    {#each podcastEpisodes as episode}
      <BlogCard {...episode} external={true} />
    {/each}
  </div>
</div>
