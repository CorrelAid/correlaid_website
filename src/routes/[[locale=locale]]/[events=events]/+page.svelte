<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {genAbsoluteUrl} from '$lib/js/helpers';
  import Copy from '$lib/svg/Copy.svelte';
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
      param: 'localChapterNames',
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

  function copyText(text) {
    navigator.clipboard.writeText(text);
  }
</script>

<!-- passing unfiltered data to component -->
<Filter origData={eventsData} bind:filteredData {selects} {searchOptions} />
{#if events}
  <div class="mb-3 mt-5 px-4 text-2xl font-bold drop-shadow-sm lg:mt-6">
    {currentEventSeparator}
  </div>

  <span
    class="mx-4 mb-12 grid grid-cols-2 text-sm lg:mt-0 lg:flex lg:w-2/4 lg:items-center"
  >
    <span
      class="col-span-full mr-1.5 whitespace-nowrap pb-2 lg:col-span-1 lg:pb-0"
      id="ics_label"
    >
      {$t('ics.cta').text}
    </span>
    <span
      class="flex items-center rounded-md border border-neutral-25 bg-white px-1 py-0.5"
    >
      <span
        class="text-nowrap no-scrollbar w-[160px] overflow-scroll text-ellipsis whitespace-nowrap text-xs"
      >
        {genAbsoluteUrl($t('footer.ical').url)}
      </span>
      <button
        aria-labelledby="ics_label"
        class="ml-1"
        on:click={() => copyText(genAbsoluteUrl($t('footer.ical').url))}
        ><Copy height="18" width="18" /></button
      >
    </span>
  </span>

  {#if events.future.length === 0}
    <p class="px-4">{$t('filter.no_results').text}</p>
  {:else}
    <div class="space-y-8 px-4">
      {#if trimmedFutureData}
        {#each trimmedFutureData as event, i}
          <EventsCard
            {...(({date, localChapterNames, ...rest}) => rest)(event)}
          />
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
          <EventsCard
            {...(({date, localChapterNames, ...rest}) => rest)(event)}
          />
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
