<script>
  import {t, locale} from '$lib/stores/i18n';
  import {toLocalDateString} from '$lib/js/helpers';

  export let href;
  export let slug;
  export let title;
  export let teaser;
  export let date;
  export let tags;
  export let language;
  import Langs from '$lib/components/Langs.svelte';
  let proc_date;
  $: proc_date = toLocalDateString(date, $locale);

  if (typeof slug !== undefined) {
    href = $t('navbar.events').url + '/' + slug;
  }
</script>

<div class="offset-right relative w-full" style="">
  <div
    class="z-1 relative top-0 grid h-full w-full grid-cols-4 rounded border border-neutral-25 bg-white p-4"
  >
    <div class="col-span-full xl:col-span-3">
      <div class=" align-center flex w-40 space-x-2 pb-2">
        <span class="text-xl font-light">{proc_date}</span>
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
        {#each tags as tag}
          <span
            class="mr-2 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white line-clamp-1"
            >{tag}</span
          >
        {/each}
      </div>

      <p class="mb-4 text-base-content line-clamp-3 xl:pb-0 xl:pr-4">
        {teaser}
      </p>
    </div>
  </div>
</div>
