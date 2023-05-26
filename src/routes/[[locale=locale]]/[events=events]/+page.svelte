<script>
  import {page_key} from '$lib/stores/page_key';
  import {locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms';

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
  $: events = parseEntries(data.events, 'events');

  // Needs to stay client because it depends on the current date
  // and can therefore not be statically build
  $: splitEvents = timeSplitEvents(events);

  $: currentEventSeperator =
    $locale === 'de' ? 'Kommende Veranstaltungen' : 'Upcoming Events';
  $: pastEventSeperator =
    $locale === 'de' ? 'Vergangene Veranstaltungen' : 'Past Events';
</script>

<h2 class="mb-6 mt-8 px-4 text-2xl font-bold drop-shadow-sm">
  {currentEventSeperator}
</h2>

<div class="space-y-8 px-4">
  {#each splitEvents.future as event}
    <Events_Card {...event} />
  {/each}
</div>

<h2 class="mb-6 mt-8 px-4 text-2xl font-bold drop-shadow-sm">
  {pastEventSeperator}
</h2>

<div class="space-y-8 px-4">
  {#each splitEvents.past as event}
    <Events_Card {...event} />
  {/each}
</div>
