<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import EventsCard from '$lib/components/EventsCard.svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';

  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let {data} = $props();

  onMount(() => {
    $pageKey = 'navbar.home';
  });

  let blogPosts = $derived(data.blogPosts);

  let events = $derived(data.events);

  let projects = $derived(data.projects);
</script>

<div class="px-4">
  {#if projects.length != 0}
    <div class="mb-12">
      <a
        class="text-3xl font-bold text-base-content transition hover:text-primary"
        href={$t('navbar.using_data.project_database').url +
          '/?teamSelection=true'}>{$t('misc.open_projects').text}</a
      >
    </div>
    <div class="grid gap-6">
      {#each projects as project}
        <ProjectsCard
          {...(({organizationSector, localChapterNames, endDate, ...rest}) =>
            rest)(project)}
        />
      {/each}
      {#if projects.length > 4}
        <a
          target="__blank"
          rel="noreferrer"
          href={$t('navbar.using_data.project_database').url +
            '/?teamSelection=true'}
          class="pb-1 pr-4 capitalize text-secondary"
        >
          <span class="underline">
            {$t('misc.more_projects').text}
          </span>
        </a>
      {/if}
    </div>
  {/if}
  {#if events.length != 0}
    <div class="my-12">
      <a
        class="text-3xl font-bold text-base-content transition hover:text-primary"
        href={$t('navbar.events').url}>{$t('navbar.events').text}</a
      >
    </div>
    <div class="grid gap-6">
      {#each events as event}
        <EventsCard
          {...(({
            date,
            localChapterNames,
            start,
            end,
            id,
            extendedProps,
            allDay,
            editable,
            startEditable,
            durationEditable,
            ...rest
          }) => rest)(event)}
        />
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
</div>
