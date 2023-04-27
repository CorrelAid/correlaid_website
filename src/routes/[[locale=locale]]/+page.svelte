<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import {gen_img_url} from '$lib/js/helpers';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  let posts;
  $: posts = data.posts;
  let events;
  $: events = data.events;
  let podcast_episodes;
  $: podcast_episodes = data.podcast_episodes;

  onMount(() => {
    $page_key = 'navbar.home';
  });
</script>

<div class="">
  <div class="mb-12">
    <a class="text-3xl font-bold" href={$t('navbar.events').url}>Events</a>
  </div>
  <div class="grid gap-6">
    {#each events as event, i}
      <Events_Card
        href={$t('navbar.events').url + '/' + event.slug}
        title={event.title}
        teaser={event.teaser}
        date={event.date}
        tags={event.tags}
        language={event.language}
      />
    {/each}
  </div>

  <div class="my-12">
    <a class="text-3xl font-bold" href={$t('navbar.blog').url}>Blog</a>
  </div>
  <div class="grid gap-6 xl:grid-cols-2">
    {#each posts as post, i}
      <div>
        <BlogCard
          {i}
          langs={post.langs}
          href={$t('navbar.blog').url + '/' + post.translations.slug}
          title={post.translations.title}
          teaser={post.translations.teaser}
          tags={post.translations.tags}
          image_url={post.translations.title_image
            ? gen_img_url(
                post.translations.title_image.id,
                'fit=inside&width=1200&height=675&format=png',
              )
            : null}
          content_creators={post.content_creators}
        />
      </div>
    {/each}
  </div>

  <div class="my-12">
    <a class="text-3xl font-bold" href={$t('navbar.podcast').url}>Podcast</a>
  </div>
  <div class="grid gap-6 xl:grid-cols-2">
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
