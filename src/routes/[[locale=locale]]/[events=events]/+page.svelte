<script>
  import {pageKey} from '$lib/stores/pageKey';
  import Ical from '$lib/svg/Ical.svelte';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import {timeSplitEntries} from '$lib/js/entries';
  import EventsCard from '$lib/components/EventsCard.svelte';
  import Filter from '../../../lib/components/Filter.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  onMount(() => {
    $pageKey = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  // original unfiltered data
  $: eventsData = data.events;

  let filteredData;
  let trimmedPastData;
  let trimmedFutureData;

  // Needs to stay client because it depends on the current date
  // and can therefore not be statically build
  // using store data that was manipulated by component
  let events;
  $: if (filteredData) {
    events = timeSplitEntries(filteredData, (event) => event.date);
  }

  $: currentEventSeparator =
    $locale === 'de' ? 'Kommende Veranstaltungen' : 'Upcoming Events';
  $: pastEventSeparator =
    $locale === 'de' ? 'Vergangene Veranstaltungen' : 'Past Events';

  $: selects = [
    {
      title: $t('filter.type').text,
      searchable: false,
      multiple: false,
      param: 'type',
    },
    {
      title: 'Local Chapters',
      searchable: false,
      multiple: true,
      param: 'correlaidx',
    },
    {
      title: $t('filter.language').text,
      searchable: false,
      multiple: false,
      param: 'language',
    },
  ];

  const searchOptions = [
    {searchProperty: 'tags', multiple: true},
    {searchProperty: 'title', multiple: false},
    {searchProperty: 'teaser', multiple: false},
  ];
</script>

<!-- passing unfiltered data to component -->
<Filter origData={eventsData} bind:filteredData {selects} {searchOptions} />
{#if events}
  <span
    class="mb-4 mt-8 hidden rounded-md px-4 px-4 py-2 text-2xl font-bold drop-shadow-sm lg:mb-8 lg:block"
  >
    {currentEventSeparator}
    <a
      download="calendar.ics"
      href={$t('footer.ical').url}
      class="absolute right-0 ml-1 mr-2 inline-block whitespace-nowrap align-text-top"
      aria-label={$t('access.ical').text}
    >
      <Ical height="45" width="45" />
    </a>
  </span>
  <a
    download="calendar.ics"
    href={$t('footer.ical').url}
    class="my-4 inline-block whitespace-nowrap pl-3 lg:hidden"
    aria-label={$t('access.ical').text}
  >
    <Ical height="45" width="45" />
  </a>

  {#if events.future.length === 0}
    <p class="px-4">{$t('filter.no_results').text}</p>
  {:else}
    <div class="space-y-8 px-4">
      {#if trimmedFutureData}
        {#each trimmedFutureData as event, i}
          <EventsCard {...event} />
        {/each}
      {/if}
      <Pagination
        items={events.future}
        perPage={8}
        bind:trimmedItems={trimmedFutureData}
      />
    </div>
  {/if}
  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold drop-shadow-sm">
    {pastEventSeparator}
  </h2>
  {#if events.past.length === 0}
    <p class="px-4">{$t('filter.no_results').text}</p>
  {:else}
    <div class="space-y-8 px-4">
      {#if trimmedPastData}
        {#each trimmedPastData as event}
          <EventsCard {...event} />
        {/each}
      {/if}
      <Pagination
        items={events.past}
        perPage={8}
        bind:trimmedItems={trimmedPastData}
      />
    </div>
  {/if}
{/if}
