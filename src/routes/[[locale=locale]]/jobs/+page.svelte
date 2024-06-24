<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import JobCard from '$lib/components/JobCard.svelte';
  import {locale} from '$lib/stores/i18n';
  import {timeSplitEntries} from '$lib/js/entries';

  onMount(() => {
    $pageKey = 'navbar.jobs';
  });

  let noJobMessage;
  let currentJobSeparator;
  let pastJobSeparator;

  /** @type {import('./$types').PageData} */
  export let data;

  $: jobs = timeSplitEntries(data.jobs, (job) => job.deadline);
  $: {
    if ($locale === 'de') {
      noJobMessage = 'Keine Anzeigen';
      currentJobSeparator = 'Aktuelle Jobanzeigen';
      pastJobSeparator = 'Alte Jobanzeigen';
    } else {
      noJobMessage = 'No Announcements';
      currentJobSeparator = 'Current Job Announcements';
      pastJobSeparator = 'Past Job Announcements';
    }
  }
</script>

<div class="space-y-8 px-4">
  <h2 class="mb-6 mt-8 text-2xl font-bold drop-shadow-sm">
    {currentJobSeparator}
  </h2>
  {#if jobs.future.length !== 0}
    {#each jobs.future as job}
      <JobCard {...(({deadline, ...rest}) => rest)(job)} />
    {/each}
  {:else}
    <p class="">
      {noJobMessage}
    </p>
  {/if}

  <h2 class="mb-6 mt-4 text-2xl font-bold drop-shadow-sm">
    {pastJobSeparator}
  </h2>
  {#if jobs.past.length !== 0}
    {#each jobs.past as job}
      <JobCard {...(({deadline, ...rest}) => rest)(job)} />
    {/each}
  {:else}
    <p class="">
      {noJobMessage}
    </p>
  {/if}
</div>
