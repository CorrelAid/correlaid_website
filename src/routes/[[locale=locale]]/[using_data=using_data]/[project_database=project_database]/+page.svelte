<script>
  import {run} from 'svelte/legacy';

  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import Filter from '$lib/components/Filter.svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  onMount(() => {
    $pageKey = 'navbar.using_data.project_database';
  });

  /**
   * @typedef {Object} Props
   * @property {any} data - const source = '# WIP';
   */

  /** @type {Props} */
  let {data} = $props();

  let filteredData = $state();
  let trimmedData = $state();
  let projects = $derived(data.projects);

  let checkBoxes = $derived([
    {title: $t('filter.team_selection').text, param: 'teamSelection'},
  ]);

  let selects = $derived([
    {
      title: $t('filter.type').text,
      searchable: false,
      multiple: true,
      param: 'projectTypes',
    },
    {
      title: $t('filter.data_type').text,
      searchable: false,
      multiple: true,
      param: 'dataTypes',
    },
    {
      title: $t('filter.organization_sector').text,
      searchable: false,
      multiple: false,
      param: 'organizationSector',
    },
    {
      title: 'Local Chapters',
      searchable: false,
      multiple: true,
      param: 'localChapterNames',
    },
  ]);

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
  {checkBoxes}
  {searchOptions}
  expanded={true}
/>
<div class="mt-8 space-y-8 px-4">
  {#if trimmedData}
    {#each trimmedData as project}
      <ProjectsCard
        {...(({organizationSector, localChapterNames, endDate, ...rest}) =>
          rest)(project)}
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
