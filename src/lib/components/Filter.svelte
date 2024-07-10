<script>
  import {page} from '$app/stores';
  import {t, locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import DropdownIcon from '$lib/svg/DropdownIcon.svelte';
  import {
    filter,
    genDropdownLists,
    setUrlParams,
    applyUrlSearchParams,
  } from '$lib/js/filter.js';
  import {translateSelectLabels} from '$lib/js/helpers.js';
  import Select from 'svelte-select';
  import _ from 'lodash';

  export let origData;
  export let filteredData;
  export let expanded = false;

  export let selects;
  export let checkBoxes = [];
  export let searchOptions;

  let hidden = 'hidden';
  let ariaExpanded = false;
  let searchTerm;

  const values = {};

  onMount(async () => {
    // when searchParams is set, set them in filter
    applyUrlSearchParams($page.url.searchParams, values, selects, checkBoxes);
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

  $: selects = genDropdownLists(origData, selects);

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
  $: changeVal(values);

  // when values changes, use updated selects to filter the original data
  $: filteredData = filter(
    origData,
    selects,
    searchTerm,
    searchOptions,
    checkBoxes,
    values,
  );

  // when selects changes, update url params
  $: history.replaceState(
    history.state,
    '',
    setUrlParams($page.url, selects, checkBoxes, values),
  );
</script>

<div class="mx-4">
  <div class="border-b border-neutral-25">
    <button
      class="inline-flex items-center justify-center pb-1 text-xl font-semibold transition hover:text-secondary"
      aria-expanded={ariaExpanded}
      aria-controls="filter"
      on:click={handleHidden}
    >
      Filter
      <DropdownIcon height={27} width={27} />
    </button>
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
            <div slot="empty" /></Select
          >
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
</style>
