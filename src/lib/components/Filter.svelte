<script>
  import {filter_data} from '$lib/stores/filter_data';
  import Select from 'svelte-select';
  import _ from 'lodash';
  export let type;
  export let data;

  let data_copy;

  let chapter;
  let chapterList;

  let tag;
  let tagList;

  if (type == 'events') {
    chapterList = unique(data);
    chapterList.push('Global');
    tagList = _.chain(data_copy).flatMap('tags').uniq().value();
  }

  function unique(arr) {
    const temp = _.chain(arr)
      .flatMap('local_chapters')
      .map('Local_Chapters_id.translations[0].city')
      .compact()
      .uniq()
      .value();
    return temp;
  }

  function filterByChapter(data, chapter) {
    return _.filter(data, (obj) => {
      if (chapter === 'Global') {
        return _.isEmpty(_.get(obj, 'local_chapters', []));
      } else {
        return (
          _.get(
            obj,
            'local_chapters[0].Local_Chapters_id.translations[0].city',
          ) === chapter
        );
      }
    });
  }

  $: if (chapterList) {
    if (chapter) {
      $filter_data = filterByChapter(data, chapter.value);
    } else {
      $filter_data = data;
    }
  }

  $: console.log($filter_data);
</script>

<div class="text_width mx-4 flex items-center justify-center gap-x-6">
  <span class="fonnt-semibold text-lg">Filter:</span>
  {#if type == 'events'}
    <Select items={chapterList} searchable={true} bind:value={chapter} />
  {/if}
  <Select items={tagList} searchable={true} bind:value={tag} />
</div>
