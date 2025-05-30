<script>
  import {page} from '$app/stores';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount, tick} from 'svelte';
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
  let searchTerm = $state();

  const values = $state({});

  onMount(async () => {
    // when searchParams is set, set them in filter
    applyUrlSearchParams($page.url.searchParams, values, selects, checkBoxes);
    if ($page.url.searchParams.get('viewType')) {
      viewType = $page.url.searchParams.get('viewType');
    }
    // if value is set dont hide filter (if someone goes to page with defined url param)
    if (expanded === false) {
      if (Object.values(values).some((value) => value !== null)) {
        hidden = 'visible';
        ariaExpanded = true;
      }
    } else {
      hidden = 'visible';
    }
  });

  function handleHidden() {
    hidden = hidden === 'hidden' ? 'visible' : 'hidden';
    ariaExpanded = ariaExpanded ? false : true;
  }

  // update selects as values changes. We cant update selects directly because of infinite loop.
  function changeVal(values_) {
    for (const key in values_) {
      if (values_.hasOwnProperty(key)) {
        if (typeof values_[key] === 'boolean') {
          _.find(checkBoxes, {param: key}).value = values_[key];
        } else {
          _.find(selects, {param: key}).value = values_[key];
        }
      }
    }
  }

  $effect(() => {
    if (viewOptions) {
      viewType = viewOptions['config']['defaultView'];
    }
  });
  $effect(() => {
    selects = genDropdownLists(origData, selects);
  });
  $effect(() => {
    changeVal(values);
  });
  // when values changes, use updated selects to filter the original data
  $effect(() => {
    filteredData = filter(
      origData,
      selects,
      searchTerm,
      searchOptions,
      checkBoxes,
      values,
    );
  });
  $effect(() => {
    history.replaceState(
      history.state,
      '',
      setUrlParams($page.url, selects, checkBoxes, viewType, values),
    );
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
