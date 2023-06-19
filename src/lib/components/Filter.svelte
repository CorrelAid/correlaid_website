<script>
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
  import {t} from '$lib/stores/i18n';
  import {filterDefinedBy, filterByMultiple} from '$lib/js/data_processing.js';
  import Select from 'svelte-select';
  import _ from 'lodash';
  export let filter_type;
  export let orig_data;
  export let filter_data;
  import DropdownIcon from '$lib/svg/Dropdown_Icon.svelte';

  let chapterList;
  let tags;
  let lang;
  let type;
  let langList;
  let chapters;

  $: if (filter_type == 'events') {
    chapterList = _.chain(orig_data)
      .flatMap('correlaidx')
      .compact()
      .uniq()
      .value();
    chapterList.push('Global');
    langList = [
      {value: 'en-US', label: 'en'},
      {value: 'de-DE', label: 'de'},
    ];
  }

  $: tagList = _.chain(orig_data).flatMap('tags').uniq().value();

  $: typeList = _.chain(orig_data)
    .flatMap('type')
    .uniq()
    .value()
    .map((value, i) => ({
      value: value,
      index: i,
      label: value.replace(/_/g, ' '),
    }));

  function fromParam(param, lst, complex) {
    const value_ = $page.url.searchParams.get(param);
    if (complex === true) {
      lst = _.chain(lst).flatMap('value').value();
    }
    if (lst.includes(value_)) {
      return {
        value: value_,
        label: value_
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        index: lst.indexOf(value_),
      };
    }
  }

  function extractUrlSearchParams() {
    if ($page.url.searchParams.get('lcs')) {
      const chapters_ = $page.url.searchParams.get('lcs').split(',');
      const arr = [];
      for (let i = 0; i < chapters_.length; i++) {
        if (chapterList.includes(chapters_[i])) {
          arr.push({
            value: chapters_[i],
            label: chapters_[i],
            index: chapterList.indexOf(chapters_[i]),
          });
        }
      }
      chapters = arr;
    }
    if ($page.url.searchParams.get('type')) {
      type = fromParam('type', typeList, true);
    }
    if ($page.url.searchParams.get('lang')) {
      lang = fromParam('lang', langList, true);
    }
    if ($page.url.searchParams.get('tags')) {
      const tags_ = $page.url.searchParams.get('tags').split(',');
      const arr = [];
      for (let i = 0; i < tags_.length; i++) {
        if (tagList.includes(tags_[i])) {
          arr.push({
            value: tags_[i],
            label: tags_[i],
            index: tagList.indexOf(tags_[i]),
          });
        }
      }
      tags = arr;
    }
  }

  $: extractUrlSearchParams($page.url.searchParams);

  function filter(data, type, lang, tags, chapters) {
    let data_ = structuredClone(data);
    if (chapterList) {
      if (chapters) {
        chapters = _.chain(chapters).flatMap('value').value();
        data_ = filterByMultiple(data_, chapters, 'correlaidx');
      } else {
      }
    }
    if (langList) {
      if (lang) {
        data_ = filterDefinedBy('language', data_, lang.value);
      } else {
      }
    }

    if (tags) {
      tags = _.chain(tags).flatMap('value').value();
      data_ = filterByMultiple(data_, tags, 'tags');
    } else {
    }

    if (type) {
      data_ = filterDefinedBy('type', data_, type.value);
    } else {
    }

    return data_;
  }

  $: filter_data = filter(orig_data, type, lang, tags, chapters);
  $: {
    const newUrl = new URL($page.url);

    if (chapters) {
      newUrl?.searchParams?.set(
        'lcs',
        _.chain(chapters).flatMap('value').value(),
      );
    } else {
      newUrl?.searchParams?.delete('lcs');
    }
    if (type) {
      newUrl?.searchParams?.set('type', type.value);
    } else {
      newUrl?.searchParams?.delete('type');
    }
    if (tags) {
      newUrl?.searchParams?.set('tags', _.chain(tags).flatMap('value').value());
    } else {
      newUrl?.searchParams?.delete('tags');
    }
    if (lang) {
      newUrl?.searchParams?.set('lang', lang.value);
    } else {
      newUrl?.searchParams?.delete('lang');
    }

    goto(newUrl);
  }

  let hidden = 'hidden';
  $: if (chapters || type || lang || tags) {
    hidden = 'visible';
  }
  function handleHidden() {
    hidden = hidden === 'hidden' ? 'visible' : 'hidden';
  }
  const Max = 3;
  $: hasMaxTags = tags?.length === Max;
  $: tagList_ = hasMaxTags ? [] : [...tagList];

  $: hasMaxChapters = chapters?.length === Max;
  $: chapterList_ = hasMaxChapters ? [] : [...chapterList];
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
    <div>
      <span class="mt-2 block pb-1 text-lg font-semibold"
        >{$t('filter.type').text}</span
      >
      <div class="capitalize">
        <Select
          items={typeList}
          searchable={false}
          bind:value={type}
          --list-z-index="30"
        />
      </div>
    </div>
    {#if filter_type == 'events'}
      <div>
        <span class="block pb-1 text-lg font-semibold">Local Chapters</span>
        <div class="">
          <Select
            multiple
            items={chapterList}
            searchable={false}
            bind:value={chapters}
            --list-z-index="30"
          />
        </div>
      </div>
      <div>
        <span class="block pb-1 text-lg font-semibold"
          >{$t('filter.language').text}</span
        >
        <div class="">
          <Select
            items={langList}
            searchable={false}
            bind:value={lang}
            --list-z-index="30"
          />
        </div>
      </div>
    {/if}

    <div>
      <span class="block pb-1 text-lg font-semibold">Tags</span>
      <div class="">
        <Select
          items={tagList_}
          multiple
          searchable={true}
          bind:value={tags}
          --list-z-index="30"
        >
          <div class="empty" slot="empty">
            <p class="rounded py-2 pl-4">{hasMaxTags ? '' : 'No options'}</p>
          </div>
        </Select>
      </div>
    </div>
  </div>
</div>
