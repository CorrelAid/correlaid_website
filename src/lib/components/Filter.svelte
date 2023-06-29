<script>
  import {page} from '$app/stores';
  import {t} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import DropdownIcon from '$lib/svg/Dropdown_Icon.svelte';
  import {
    filter,
    genDropdownLists,
    setUrlParams,
    extractUrlSearchParams,
  } from '$lib/js/filter.js';
  import Select from 'svelte-select';
  import _ from 'lodash';

  export let filter_type;
  export let orig_data;
  export let filter_data;
  let hidden = 'visible';
  let searchTerm;

  const values = {};

  const selects = [
    {
      title: $t('filter.type').text,
      searchable: false,
      multiple: false,
      param: 'type',
    },
    {
      title: 'Local Chapters',
      searchable: false,
      multiple: true,
      param: 'correlaidx',
    },
    {
      title: $t('filter.language').text,
      searchable: false,
      multiple: false,
      param: 'language',
    },
  ];

  const searchOptions = [
    {name: 'tags', multiple: true},
    {name: 'title', multiple: false},
    {name: 'teaser', multiple: false},
  ];

  console.log(orig_data);

  onMount(async () => {
    // when searchParams is set, set them in filter
    extractUrlSearchParams($page.url.searchParams, values, selects);
    // if value is set dont hide filter (if someone goes to page with defined url param)
    // if (Object.values(values).some((value) => value !== null)) {
    //   hidden = 'visible';
    // }
  });

  genDropdownLists(orig_data, selects);

  function handleHidden() {
    hidden = hidden === 'hidden' ? 'visible' : 'hidden';
  }

  // limit selectable items
  // const Max = 3;
  // $: hasMaxChapters = chapters?.length === Max;
  // $: chapterList_ = hasMaxChapters ? [] : [...chapterList];

  // update selects as values changes. We cant update selects directly because of infinite loop.
  function changeVal(values_) {
    for (const key in values_) {
      if (values_.hasOwnProperty(key)) {
        _.find(selects, {param: key}).value = values_[key];
      }
    }
  }
  $: changeVal(values);

  // when values changes, use updated selects to filter the original data
  $: filter_data = filter(
    orig_data,
    selects,
    searchTerm,
    searchOptions,
    values,
  );

  // when selects changes, update url params
  $: setUrlParams($page.url, selects, values);
  let listOpen = false;
  $: listOpen = false;
</script>

<div class="mx-4">
  <div class="border-b border-neutral-25">
    <button
      class="inline-flex items-center justify-center pb-1 text-xl font-semibold transition hover:text-secondary"
      aria-expanded="true"
      on:click={handleHidden}
    >
      Filter
      <DropdownIcon height={27} width={27} />
    </button>
  </div>
  <div class="text_width grid items-center gap-y-4 md:gap-x-6 {hidden}">
    <div class="">
      <span class="mt-4 block pb-1 text-lg font-semibold"
        >{$t('filter.search').text}</span
      >
      <div class="flex">
        <input
          bind:value={searchTerm}
          placeholder={$t('filter.search').text}
          class="h-full w-full rounded-md border border-neutral-25 p-2 pl-4"
        />
      </div>
    </div>
    {#each selects as select}
      <div>
        <span class="mt-2 block pb-1 text-lg font-semibold">{select.title}</span
        >
        <div class={select.param !== 'language' ? 'capitalize' : ''}>
          <Select
            showChevron
            placeholder={$t('filter.placeholder').text}
            items={select.items}
            closeListOnChange={select.multiple == true ? true : false}
            searchable={select.searchable}
            multiple={select.multiple}
            bind:value={values[select.param]}
            --list-z-index="30"
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
</style>
