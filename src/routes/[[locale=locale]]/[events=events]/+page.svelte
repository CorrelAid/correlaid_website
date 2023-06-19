<script>
  import {page_key} from '$lib/stores/page_key';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms';
  import Filter from '../../../lib/components/Filter.svelte';


  onMount(() => {
    $page_key = 'navbar.events';
  });

  function timeSplitEvents(parsedEvents) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function byDate(a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    }

    const futureEvents = parsedEvents
      .filter((event) => event.date >= today)
      .sort(byDate);
    const pastEvents = parsedEvents
      .filter((event) => event.date < today)
      .sort(byDate)
      .reverse();

    return {
      past: pastEvents,
      future: futureEvents,
    };
  }

  /** @type {import('./$types').PageData} */
  export let data;
  // original unfiltered data
  $: events_data = parseEntries(data.events, 'events');

  $: console.log(filter_data);
  let filter_data = events_data;


  // Needs to stay client because it depends on the current date
  // and can therefore not be statically build
  // using store data that was manipulated by component
  let events;
  $: if (filter_data) {
    events = timeSplitEvents(filter_data);
  }

  $: currentEventSeperator =
    $locale === 'de' ? 'Kommende Veranstaltungen' : 'Upcoming Events';
  $: pastEventSeperator =
    $locale === 'de' ? 'Vergangene Veranstaltungen' : 'Past Events';
</script>

<!-- passing unfiltered data to component -->
<Filter data={events_data} filter_type={'events'} bind:filter_data />
{#if events}
  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold drop-shadow-sm">
    {currentEventSeperator}
  </h2>
  {#if events.future.length === 0}
    <p class="px-4">{$t('filter.no_results').text}</p>
  {:else}
    <div class="space-y-8 px-4">
      {#each events.future as event}
        <Events_Card {...event} />
      {/each}
    </div>
  {/if}

  <h2 class="mb-6 mt-8 px-4 text-2xl font-bold drop-shadow-sm">
    {pastEventSeperator}
  </h2>
  {#if events.past.length === 0}
    <p class="px-4">{$t('filter.no_results').text}</p>
  {:else}
    <div class="space-y-8 px-4">
      {#each events.past as event}
        <Events_Card {...event} />
      {/each}
    </div>
  {/if}
{/if}
