<script>
  // import {page} from '$app/stores';
  import {t} from '$lib/stores/i18n';
  import {
    filter,
    // setFilterParams,
    // extractUrlSearchParams,
  } from '$lib/js/filter.js';
  import Select from 'svelte-select';
  import _ from 'lodash';
  export let filter_type;
  export let orig_data;
  export let filter_data;
  import DropdownIcon from '$lib/svg/Dropdown_Icon.svelte';

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
    {
      title: 'Tags',
      searchable: true,
      multiple: true,
      param: 'tags',
    },
  ];

  const chapterList = _.chain(orig_data)
    .flatMap('correlaidx')
    .compact()
    .uniq()
    .value();
  chapterList.push('Global');
  _.find(selects, {param: 'correlaidx'}).items = chapterList;

  const langList = [
    {value: 'en-US', label: 'en'},
    {value: 'de-DE', label: 'de'},
  ];

  _.find(selects, {param: 'language'}).items = langList;

  _.find(selects, {param: 'tags'}).items = _.chain(orig_data)
    .flatMap('tags')
    .uniq()
    .value();

  const typeList = _.chain(orig_data)
    .flatMap('type')
    .uniq()
    .value()
    .map((value, i) => ({
      value: value,
      index: i,
      label: value.replace(/_/g, ' '),
    }));
  _.find(selects, {param: 'type'}).items = typeList;

  // $: extractUrlSearchParams($page.url.searchParams, selects);
  // $: setFilterParams($page.url, selects)

  $: filter_data = filter(orig_data, selects, values);

  let hidden = 'hidden';
  // $: if (chapters || type || lang || tags) {
  //   hidden = 'visible';
  // }
  function handleHidden() {
    hidden = hidden === 'hidden' ? 'visible' : 'hidden';
  }
  // const Max = 3;
  // $: hasMaxTags = tags?.length === Max;
  // $: tagList_ = hasMaxTags ? [] : [...tagList];

  // $: hasMaxChapters = chapters?.length === Max;
  // $: chapterList_ = hasMaxChapters ? [] : [...chapterList];

  const values = {};
  function changeVal(values_) {
    for (const key in values_) {
      if (p.hasOwnProperty(key)) {
        _.find(selects, {param: key}).value = values_[key];
      }
    }
  }
  $: changeVal(values);
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
    {#each selects as select}
      <div>
        <span class="mt-2 block pb-1 text-lg font-semibold">{select.title}</span
        >
        <div class="capitalize">
          <Select
            items={select.items}
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
