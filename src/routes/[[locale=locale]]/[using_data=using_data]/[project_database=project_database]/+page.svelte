<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import Filter from '$lib/components/Filter.svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  onMount(() => {
    $pageKey = 'navbar.using_data.project_database';
  });

  // const source = '# WIP';
  export let data;
  $: projects = data.projects;
  let filteredData;
  let trimmedData;
  let projects;

  $: selects = [
    {
      title: 'Local Chapters',
      searchable: false,
      multiple: true,
      param: 'localChapterNames',
    },
    {
      title: $t('filter.type').text,
      searchable: false,
      multiple: true,
      param: 'projectTypes',
    },
    {
      title: $t('filter.organization_sector').text,
      searchable: false,
      multiple: false,
      param: 'organizationSector',
    },
    {
      title: $t('filter.data_type').text,
      searchable: false,
      multiple: true,
      param: 'dataTypes',
    },
  ];

  const searchOptions = [
    {searchProperty: 'title', multiple: false},
    {searchProperty: 'summary', multiple: false},
    {searchProperty: 'organization', multiple: false},
  ];
</script>

<Filter
  origData={projects}
  bind:filteredData
  {selects}
  {searchOptions}
  expanded={true}
/>
<div class="mt-8 space-y-8 px-4">
  {#if trimmedData}
    {#each trimmedData as project}
      <ProjectsCard
        {...(({endDate, localChapterNames, ...rest}) => rest)(project)}
      />
    {/each}
  {/if}
  {#if filteredData}
    <Pagination
      items={filteredData}
      perPage={8}
      bind:trimmedItems={trimmedData}
    />
  {/if}
</div>
