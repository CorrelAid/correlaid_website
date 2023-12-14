<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import WorkshopCard from '$lib/components/WorkshopCard.svelte';
  import Filter from '$lib/components/Filter.svelte';
  import {t} from '$lib/stores/i18n';

  onMount(() => {
    $page_key = 'navbar.education.resources';
  });

  export let data;
  $: workshops = data.workshops;

  let filteredData;
  $: selects = [
    {
      title: $t('filter.responsible').text,
      searchable: false,
      multiple: false,
      param: 'resp_unit',
    },
    {
      title: 'Local Chapter',
      searchable: false,
      multiple: false,
      param: 'correlaidx_city',
    },
    {
      title: $t('filter.language').text,
      searchable: false,
      multiple: false,
      param: 'language',
    },
    {
      title: $t('filter.target_audience').text,
      searchable: false,
      multiple: true,
      param: 'target_audience',
    },
  ];

  const searchOptions = [
    {searchProperty: 'tags', multiple: true},
    {searchProperty: 'title', multiple: false},
    {searchProperty: 'subtitle', multiple: false},
  ];
</script>

<Filter orig_data={workshops} bind:filteredData {selects} {searchOptions} />
{#if filteredData}
  <div class="mt-8 space-y-6 px-4">
    {#each filteredData as workshop}
      <WorkshopCard {...workshop} />
    {/each}
  </div>
{/if}
