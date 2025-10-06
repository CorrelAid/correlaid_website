<script>
  import {page} from '$app/stores';
  import {replaceState} from '$app/navigation';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import DropdownIcon from '$lib/svg/DropdownIcon.svelte';
  import Calendar from '$lib/svg/Calendar.svelte';
  import List from '$lib/svg/List.svelte';

  import {
    filter,
    genDropdownLists,
    applyUrlSearchParams,
    setUrlParams,
  } from '$lib/js/filter.js';
  import {translateSelectLabels} from '$lib/js/helpers.js';
  import Select from 'svelte-select';

  import _ from 'lodash';

  let {
    origData,
    filteredData = $bindable(),
    viewOptions = void 0,
    viewType = $bindable(),
    expanded = false,
    selects = $bindable(),
    checkBoxes = [],
    searchOptions,
  } = $props();

  let hidden = $state('hidden');
  let ariaExpanded = $state(false);
  let searchTerm = $state('');

  const values = $state({});

  onMount(async () => {
    // Initialize checkbox values to false if not already set
    for (const checkBox of checkBoxes) {
      if (values[checkBox.param] === undefined) {
        values[checkBox.param] = false;
      }
    }

    if ($page.url.searchParams.get('viewType')) {
      viewType = $page.url.searchParams.get('viewType');
    }

    // Restore search term from URL - simple and direct
    const urlSearchTerm = $page.url.searchParams.get('search');
    if (urlSearchTerm) {
      searchTerm = urlSearchTerm;
    }

    // Set initial visibility state
    if (expanded === true) {
      hidden = 'visible';
      ariaExpanded = true;
    }
  });

  function handleHidden() {
    hidden = hidden === 'hidden' ? 'visible' : 'hidden';
    ariaExpanded = ariaExpanded ? false : true;
  }

  $effect(() => {
    if (viewOptions) {
      viewType = viewOptions['config']['defaultView'];
    }
  });
  $effect(() => {
    selects = genDropdownLists(origData, selects);
  });

  // Apply URL search parameters after selects are populated
  let urlParamsApplied = $state(false);
  let isRestoringFromUrl = $state(false);

  // Handle other URL parameters
  $effect(() => {
    if (
      selects &&
      selects.length > 0 &&
      selects[0].items &&
      !urlParamsApplied
    ) {
      // Set flag to prevent URL updates during restoration
      isRestoringFromUrl = true;

      // when searchParams is set, set them in filter
      applyUrlSearchParams($page.url.searchParams, values, selects, checkBoxes);
      urlParamsApplied = true;

      // Show filter if any values are set from URL params
      if (expanded === false) {
        const hasValues = Object.values(values).some(
          (value) =>
            value !== null &&
            value !== false &&
            (Array.isArray(value) ? value.length > 0 : true),
        );
        const hasSearch = searchTerm && searchTerm.trim() !== '';
        if (hasValues || hasSearch) {
          hidden = 'visible';
          ariaExpanded = true;
        }
      }

      // Clear the restoration flag after a minimal delay to prevent i18n interference
      setTimeout(() => {
        isRestoringFromUrl = false;
      }, 20);
    }
  });
  // when values changes, use updated selects to filter the original data
  $effect(() => {
    // Update checkbox values before filtering
    for (const checkBox of checkBoxes) {
      checkBox.value = values[checkBox.param];
    }

    // Update select values before filtering
    for (const select of selects) {
      select.value = values[select.param];
    }

    filteredData = filter(
      origData,
      selects,
      searchTerm,
      searchOptions,
      checkBoxes,
    );
  });

  // Separate effect for URL updates that runs after filtering is complete
  let urlUpdateTimer;
  $effect(() => {
    // Explicitly read reactive dependencies to track them
    const currentViewType = viewType;
    const currentFilteredData = filteredData;
    const currentValues = values;
    const currentSearchTerm = searchTerm;

    // Wait for component to be ready and mounted, and skip during URL restoration
    if (
      currentFilteredData !== undefined &&
      typeof window !== 'undefined' &&
      !isRestoringFromUrl
    ) {
      // Clear previous timer to debounce URL updates
      clearTimeout(urlUpdateTimer);

      // Debounce URL updates to prevent "Too many calls to Location or History APIs"
      urlUpdateTimer = setTimeout(() => {
        try {
          // Sync values before URL generation - use captured values for consistency
          for (const checkBox of checkBoxes) {
            checkBox.value = currentValues[checkBox.param];
          }
          for (const select of selects) {
            select.value = currentValues[select.param];
          }

          const newUrl = setUrlParams(
            new URL(window.location.href),
            selects,
            checkBoxes,
            currentViewType,
            currentSearchTerm,
          );
          const newUrlString = newUrl.pathname + newUrl.search;
          const currentUrlString =
            window.location.pathname + window.location.search;

          // Only update URL if it actually changed to avoid interfering with i18n routing
          if (newUrlString !== currentUrlString) {
            replaceState(newUrlString, {});
          }
        } catch (error) {
          // Silently ignore if router not ready yet
        }
      }, 50); // 50ms debounce
    }
  });
</script>

<div class="mx-4">
  <div class="flex h-12">
    <div class="w-2/4 border-b border-neutral-25">
      <button
        class="inline-flex items-center justify-center pt-2 text-xl font-semibold transition hover:text-secondary"
        aria-expanded={ariaExpanded}
        aria-controls="filter"
        onclick={handleHidden}
      >
        Filter
        {#if hidden === 'hidden'}
          <DropdownIcon height={27} width={27} />
        {:else}
          <DropdownIcon height={27} width={27} direction={'up'} />
        {/if}
      </button>
    </div>
    {#if viewOptions}
      <ul class="mx-0 grid w-2/4 grid-cols-11 text-lg">
        <li class="col-span-5">
          <button
            class="bg-grey flex h-full w-full items-center justify-center rounded-t border border-neutral-25 bg-secondary px-2 transition duration-100 ease-in {viewType ===
            'list'
              ? 'border-b-white bg-white'
              : ''}"
            onclick={() => (viewType = 'list')}
            ><List
              height={18}
              width={18}
              color={viewType === 'list' ? '#000' : '#fff'}
            /></button
          >
        </li>
        <li class="col-span-1">
          <div class="h-full border-b border-neutral-25"></div>
        </li>
        <li class="col-span-5">
          <button
            class="bg-grey flex h-full w-full items-center justify-center rounded-t border border-neutral-25 bg-secondary px-2 transition duration-100 ease-in {viewType ===
            'calendar'
              ? 'border-b-white bg-white'
              : ''}"
            onclick={() => (viewType = 'calendar')}
            ><Calendar
              height={18}
              width={18}
              color={viewType === 'calendar' ? '#000' : '#fff'}
            /></button
          >
        </li>
      </ul>
    {:else}
      <div class=" h-full w-2/4 border-b border-neutral-25"></div>
    {/if}
  </div>
  <div
    class="text_width grid items-center gap-y-4 md:gap-x-6 {hidden}"
    id="filter"
  >
    {#each checkBoxes as checkBox}
      <div class="mt-6 block">
        <label class="inline text-lg font-semibold" for="checkbox"
          >{checkBox.title}</label
        >
        <input
          type="checkbox"
          class="ml-2 align-text-top"
          id="checkbox"
          bind:checked={values[checkBox.param]}
        />
      </div>
    {/each}
    <div class={checkBoxes.length == 0 ? 'mt-6' : ''}>
      <span class="block pb-1 text-lg font-semibold"
        >{$t('filter.search').text}</span
      >
      <div class="flex">
        <input
          bind:value={searchTerm}
          placeholder={$t('filter.search').text}
          class="h-full w-full rounded-md border border-neutral-25 p-2 pl-4"
          data-testid="filter-search"
        />
      </div>
    </div>
    {#each selects as select}
      <div>
        <span class="mt-2 block pb-1 text-lg font-semibold">{select.title}</span
        >
        <div
          class={select.param !== 'language' && select.param !== 'langs'
            ? 'capitalize'
            : ''}
        >
          <Select
            showChevron
            placeholder={$t('filter.placeholder').text}
            items={translateSelectLabels(select.items, $locale, select.param)}
            searchable={select.searchable}
            multiple={select.multiple}
            bind:value={values[select.param]}
            --list-z-index="30"
          >
            <div></div></Select
          >
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
</style>
