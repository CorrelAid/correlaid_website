<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import Events_Card from '../../../lib/components/Events_Card.svelte';

  onMount(() => {
    $page_key = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let events;
  $: events = data.events;
</script>

<div class="space-y-5">
  {#each events as event, i}
    <Events_Card
      href={$t('navbar.events').url + '/' + event.slug}
      title={event.title}
      teaser={event.teaser}
      date={event.date}
      tags={event.tags}
    />
  {/each}
</div>
