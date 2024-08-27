<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {page} from '$app/stores';
  import {genAbsoluteUrl} from '$lib/js/helpers';
  import Copy from '$lib/svg/Copy.svelte';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import {timeSplitEntries} from '$lib/js/entries';
  import EventsCard from '$lib/components/EventsCard.svelte';
  import Filter from '../../../lib/components/Filter.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import DayGrid from '@event-calendar/day-grid';
  import {queryParam} from 'sveltekit-search-params';

  const plugins = [TimeGrid, DayGrid];

  let ec;
  const containsDate = queryParam('containsDate');
  let containsDateMount;
  const calendarView = queryParam('calendarView', {
    defaultValue: 'dayGridMonth',
  });
  let calendarViewMount;

  onMount(() => {
    $pageKey = 'navbar.events';
    if ($page.url.searchParams.get('containsDate')) {
      containsDateMount = $page.url.searchParams.get('containsDate');
    }
    if ($page.url.searchParams.get('calendarView')) {
      calendarViewMount = $page.url.searchParams.get('calendarView');
    }
  });

  /** @type {import('./$types').PageData} */
  export let data;
  // original unfiltered data
  $: eventsData = data.events;

  $: options = {
    locale: $locale,
    // height: "100vh",
    firstDay: 1,
    buttonText: {
      dayGridMonth: $t('calendar.month').text,
      timeGridWeek: $t('calendar.week').text,
    },
    eventMouseEnter: (info) => {
      return info.event.extendedProps.description;
    },
    datesSet: (info) => {
      if (ec) {
        const dt = ec.getOption('date');
        dt.setDate(dt.getDate() + 1);
        $containsDate = dt.toISOString().split('T')[0];
        $calendarView = ec.getOption('view');
      }
    },
    viewDidMount: (info) => {
      if (containsDateMount) {
        ec.setOption('date', containsDateMount);
        $containsDate = containsDateMount;
        containsDateMount = void 0;
      }
      if (calendarViewMount) {
        ec.setOption('view', calendarViewMount);
        $calendarView = calendarViewMount;
        calendarViewMount = void 0;
      } else {
        ec.setOption('view', $calendarView);
      }
    },
    plugins,
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek',
    },
    views: {
      dayGridMonth: {pointer: true},
      timeGridWeek: {pointer: true, slotMinTime: '08:00', slotMaxTime: '23:00'},
    },
    events: filteredData,
    eventContent: (info) => {
      return {
        html: `<a href="${
          info.event.extendedProps.href +
          '?' +
          $page.url.searchParams.toString()
        }" class="ec-event-title text-xs has-tooltip">${
          info.event.title
        } <div class="tooltip mt-2"><span class="inline-block bg-white text-black py-1 px-2">${
          info.event.title
        }</span></div></a>`,
      };
    },
    eventBackgroundColor: 'rgb(56, 99, 162)',
    allDaySlot: false,
    slotLabelFormat: {hour: 'numeric', minute: 'numeric', hour12: false},
  };

  let filteredData;
  let trimmedFutureData;
  let trimmedPastData;

  // Needs to stay client because it depends on the current date
  // and can therefore not be statically build
  // using store data that was manipulated by component
  let events;
  $: if (filteredData) {
    events = timeSplitEntries(filteredData, (event) => event.date);
  }

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

  const viewOptions = {
    views: [
      {title: 'List', value: 'list'},
      {title: 'Grid', value: 'grid'},
    ],
    config: {
      defaultView: 'list',
    },
  };

  let viewType;

  $: currentEventSeparator =
    $locale === 'de' ? 'Kommende Veranstaltungen' : 'Upcoming Events';
  $: pastEventSeparator =
    $locale === 'de' ? 'Vergangene Veranstaltungen' : 'Past Events';
</script>

<span
  class="mx-4 mb-8 grid w-full grid-cols-2 text-sm lg:mt-0 lg:flex lg:w-2/4 lg:items-center"
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
<!-- passing unfiltered data to component -->
<Filter
  origData={eventsData}
  bind:filteredData
  bind:viewType
  {selects}
  {searchOptions}
  {viewOptions}
/>

{#if events}
  {#if viewType === 'list'}
    <div class="mt-12 px-4 pt-4 text-2xl font-bold drop-shadow-sm lg:mt-6">
      {currentEventSeparator}
    </div>
    {#if events.future.length === 0}
      <p class="px-4 pt-8">{$t('filter.no_results').text}</p>
    {:else}
      <div class="space-y-8 px-4 pt-8">
        {#if trimmedFutureData}
          {#each trimmedFutureData as event, i}
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
              href={event.extendedProps.href + '?' + $page.url.searchParams}
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
    {#if events.past.length === 0}
      <p class="mt-12 px-4">{$t('filter.no_results').text}</p>
    {:else}
      <div class="mt-12 space-y-8 px-4">
        {#if trimmedPastData}
          <div class="mb-3 mt-5 text-2xl font-bold drop-shadow-sm lg:mt-6">
            {pastEventSeparator}
          </div>
          {#each trimmedPastData as event, i}
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
              href={event.extendedProps.href + '?' + $page.url.searchParams}
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
  {:else if viewType === 'calendar'}
    <div class="px-4 pt-12">
      <Calendar {plugins} {options} bind:this={ec} />
    </div>
  {/if}
{/if}

<style>
  /* See app.css for calendar styling */
</style>
