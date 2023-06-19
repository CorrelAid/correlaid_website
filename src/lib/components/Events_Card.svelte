<script>
  import {t, locale} from '$lib/stores/i18n';
  import {toLocalDateString} from '$lib/js/helpers';

  export let href;
  export let slug;
  export let title;
  export let type;
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
  export let teaser;
  export let date;
  export let end_date = void null;
  export let tags;
  export let language;
  export let correlaidx = [];
  import Langs from '$lib/components/Langs.svelte';
  let proc_date;
  let proc_end_date;
  $: proc_date = toLocalDateString(date, $locale);
  $: if (end_date) {
    proc_end_date = toLocalDateString(end_date, $locale);
  }

  $: if (typeof slug !== undefined) {
    href = $t('navbar.events').url + '/' + slug;
  }

  $: type = type.replace(/_/g, ' ');
  // $:console.log(title, correlaidx)
</script>

<div class="offset-right relative w-full" style="">
  <div
    class="z-1 relative top-0 grid h-full w-full grid-cols-4 rounded border border-neutral-25 bg-white p-4"
  >
    <div class="col-span-full xl:col-span-3">
      <div class=" align-center flex space-x-2 pb-2">
        <p class="mr-8 text-xl font-light">
          {proc_date}{proc_end_date ? ` - ${proc_end_date}` : ''}
        </p>
      </div>

      <div class="pb-2">
        <a
          {href}
          class="text-xl font-semibold text-base-content transition hover:text-primary"
        >
          {title}
        </a>
      </div>
      <Langs langs={[language]} />
      <div class="mb-4">
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold capitalize text-white"
        >
          {type}</span
        >
        {#each tags as tag}
          <span
            class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
            >{tag}</span
          >
        {/each}
      </div>

      <p class="mb-3 line-clamp-3 text-base-content xl:pb-0 xl:pr-4">
        {teaser}
      </p>

      {#if correlaidx.length !== 0}
        {#each correlaidx as lc, i}
          <a
            class="text-medium font-semibold text-base-content transition hover:text-primary"
            href={gen_lc_href($page.params, lc)}
          >
            CorrelAidX {lc}</a
          >{#if i < correlaidx.length - 1}{', '} {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>
