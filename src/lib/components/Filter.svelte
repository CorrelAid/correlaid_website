<script>
  import {filter_data} from '$lib/stores/filter_data';
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
  import {t} from '$lib/stores/i18n';
  import {
    filterBy,
    filterByChapter,
    filterByTag,
  } from '$lib/js/data_processing.js';
  import Select from 'svelte-select';
  import _ from 'lodash';
  export let filter_type;
  export let data;
  import DropdownIcon from '$lib/svg/Dropdown_Icon.svelte';

  let chapterList;
  let tag;
  let lang;
  let type;
  let langList;
  let chapter;

  $: if (filter_type == 'events') {
    chapterList = _.chain(data)
      .flatMap('local_chapters')
      .map('Local_Chapters_id.translations[0].city')
      .compact()
      .uniq()
      .value();
    chapterList.push('Global');
    langList = [
      {value: 'en-US', label: 'en'},
      {value: 'de-DE', label: 'de'},
    ];
  }

  $: tagList = _.chain(data).flatMap('tags').uniq().value();

  $: typeList = _.chain(data)
    .flatMap('type')
    .uniq()
    .value()
    .map((value, i) => ({
      value: value,
      index: i,
      label: value
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
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

  function onChange() {
    if ($page.url.searchParams.get('lc')) {
      chapter = fromParam('lc', chapterList);
    }
    if ($page.url.searchParams.get('type')) {
      type = fromParam('type', typeList, true);
    }
    if ($page.url.searchParams.get('lang')) {
      lang = fromParam('lang', langList, true);
    }
    if ($page.url.searchParams.get('tag')) {
      console.log(tag);
      const tag_ = $page.url.searchParams.get('tag').split(',');
      const arr = [];
      for (let i = 0; i < tag_.length; i++) {
        if (tagList.includes(tag_[i])) {
          arr.push({
            value: tag_[i],
            label: tag_[i],
            index: tagList.indexOf(tag_[i]),
          });
        }
      }
      tag = arr;
    }
  }

  $: onChange($page.url.searchParams);

  function filter(data_, type, lang, tag, chapter) {
    if (chapterList) {
      if (chapter) {
        data_ = filterByChapter(data_, chapter.value);
      } else {
      }
    }
    if (langList) {
      if (lang) {
        data_ = filterBy('language', data_, lang.value);
      } else {
      }
    }

    if (tag) {
      tag = _.chain(tag).flatMap('value').value();
      data_ = filterByTag(data_, tag);
    } else {
    }

    if (type) {
      data_ = filterBy('type', data_, type.value);
    } else {
    }

    return data_;
  }

  $: $filter_data = filter(data, type, lang, tag, chapter);
  $: {
    const newUrl = new URL($page.url);

    if (chapter) {
      newUrl?.searchParams?.set('lc', chapter.value);
    } else {
      newUrl?.searchParams?.delete('lc');
    }
    if (type) {
      newUrl?.searchParams?.set('type', type.value);
    } else {
      newUrl?.searchParams?.delete('type');
    }
    if (tag) {
      newUrl?.searchParams?.set('tag', _.chain(tag).flatMap('value').value());
    } else {
      newUrl?.searchParams?.delete('tag');
    }
    if (lang) {
      newUrl?.searchParams?.set('lang', lang.value);
    } else {
      newUrl?.searchParams?.delete('lang');
    }

    goto(newUrl);
  }

  let hidden = 'hidden';
  $: if (chapter || type || lang || tag) {
    hidden = 'visible';
  }
  function handle_hidden() {
    hidden === 'hidden' ? (hidden = 'visible') : (hidden = 'hidden');
  }

  $: maxItems = tag?.length === 3;
  $: tagList_ = maxItems ? [] : [...tagList];
</script>

<div class="mx-4">
  <div class="border-b border-neutral-25">
    <button
      class="inline-flex items-center justify-center pb-1 text-xl font-semibold transition hover:text-secondary"
      aria-expanded="true"
      on:click={handle_hidden}
    >
      Filter
      <DropdownIcon height={27} width={27} />
    </button>
  </div>
  <div class="text_width grid items-center gap-y-4 md:gap-x-6 {hidden}">
    <div>
      <span class="mt-2 block pb-1 text-lg font-semibold"
        >{$t('filter.type').text}:</span
      >
      <div class="">
        <Select
          items={typeList}
          searchable={true}
          bind:value={type}
          --list-z-index="30"
        />
      </div>
    </div>
    {#if filter_type == 'events'}
      <div>
        <span class="block pb-1 text-lg font-semibold">Local Chapter:</span>
        <div class="">
          <Select
            items={chapterList}
            searchable={true}
            bind:value={chapter}
            --list-z-index="30"
          />
        </div>
      </div>
      <div>
        <span class="block pb-1 text-lg font-semibold"
          >{$t('filter.language').text}:</span
        >
        <div class="">
          <Select
            items={langList}
            searchable={true}
            bind:value={lang}
            --list-z-index="30"
          />
        </div>
      </div>
    {/if}

    <div>
      <span class="block pb-1 text-lg font-semibold">Tags:</span>
      <div class="">
        <Select
          items={tagList_}
          multiple
          searchable={true}
          bind:value={tag}
          --list-z-index="30"
        >
          <div class="empty" slot="empty">{maxItems ? '' : 'No options'}</div>
        </Select>
      </div>
    </div>
  </div>
</div>
