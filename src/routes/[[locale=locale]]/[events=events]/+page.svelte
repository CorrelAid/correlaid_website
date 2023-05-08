<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms';

  onMount(() => {
    $page_key = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: events = parseEntries(data.events, 'events');
</script>

<div class="space-y-5">
  {#each events as event}
    <Events_Card {...event} />
  {/each}
</div>
