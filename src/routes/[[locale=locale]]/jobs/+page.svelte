<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import JobCard from '$lib/components/Job_Card.svelte';
  import {locale} from '$lib/stores/i18n';

  onMount(() => {
    $page_key = 'navbar.jobs';
  });

  let noJobMessage;

  /** @type {import('./$types').PageData} */
  export let data;

  $: jobs = data.jobs;
  $: {
    if ($locale === 'de') {
      noJobMessage = 'Aktuell keine offenen Stellen';
    } else {
      noJobMessage = 'Currently no open positions';
    }
  }
</script>

<div class="space-y-8 px-4">
  {#if jobs.length !== 0}
    {#each jobs as job}
      <JobCard {...job} />
    {/each}
  {:else}
    <div class="mx-auto text-center text-2xl">
      {noJobMessage}
    </div>
  {/if}
</div>
