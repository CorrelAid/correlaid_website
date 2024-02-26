<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import WorkshopCard from '$lib/components/WorkshopCard.svelte';
  import Filter from '$lib/components/Filter.svelte';
  import {t} from '$lib/stores/i18n';

  onMount(() => {
    $pageKey = 'navbar.education.resources';
  });

  export let data;
  $: workshops = data.workshops;

  let filteredData;
  $: selects = [
    {
      title: $t('filter.responsible').text,
      searchable: false,
      multiple: false,
      param: 'respUnit',
    },
    {
      title: 'Local Chapter',
      searchable: false,
      multiple: false,
      param: 'correlaidXCity',
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
      param: 'targetAudience',
    },
  ];

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
      <WorkshopCard {...workshop} />
    {/each}
  </div>
{/if}
