<script>
  import {page_key} from '$lib/stores/page_key';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import {timeSplitEntries} from '$lib/js/entries';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import Filter from '../../../lib/components/Filter.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  onMount(() => {
    $page_key = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  // original unfiltered data
  $: events_data = data.events;

  let filteredData;
  let trimmedPastData;
  let trimmedFutureData;

  $: console.log(events_data);

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

<Filter orig_data={events_data} bind:filteredData {selects} {searchOptions} />
{#if events}
  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold drop-shadow-sm">
    {currentEventSeparator}
  </h2>
  {#if events.future.length === 0}
    <p class="px-4">{$t('filter.no_results').text}</p>
  {:else}
    <div class="space-y-8 px-4">
      {#if trimmedFutureData}
        {#each trimmedFutureData as event, i}
          <Events_Card {...event} />
        {/each}
      {/if}
      {#if events.future}
        <Pagination
          items={events.future}
          perPage={8}
          bind:trimmedItems={trimmedFutureData}
        />
      {/if}
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
          <Events_Card {...event} />
        {/each}
      {/if}
      {#if events.future}
        <Pagination
          items={events.past}
          perPage={8}
          bind:trimmedItems={trimmedPastData}
        />
      {/if}
    </div>
  {/if}
{/if}
