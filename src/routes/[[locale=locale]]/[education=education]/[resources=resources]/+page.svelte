<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import WorkshopCard from '$lib/components/WorkshopCard.svelte';
  import Filter from '$lib/components/Filter.svelte';
  import {t} from '$lib/stores/i18n';

  onMount(() => {
    $pageKey = 'navbar.education.resources';
  });

  let {data} = $props();
  let workshops = $derived(data.workshops);

  let filteredData = $state();
  let selects = $derived([
    {
      title: $t('filter.responsible').text,
      searchable: false,
      multiple: true,
      param: 'respUnitNames',
    },
    {
      title: $t('filter.language').text,
      searchable: false,
      multiple: false,
      param: 'language',
    },
    {
      title: $t('filter.targetAudience').text,
      searchable: false,
      multiple: true,
      param: 'targetAudiences',
    },
  ]);

  const searchOptions = [
    {searchProperty: 'tags', multiple: true},
    {searchProperty: 'title', multiple: false},
    {searchProperty: 'subtitle', multiple: false},
  ];
</script>

<Filter origData={workshops} bind:filteredData {selects} {searchOptions} />
{#if filteredData}
  <div class="mt-8 space-y-6 px-4">
    {#each filteredData as workshop}
      <WorkshopCard {...(({respUnitNames, ...rest}) => rest)(workshop)} />
    {/each}
  </div>
{/if}
