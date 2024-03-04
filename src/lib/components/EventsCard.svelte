<script>
  export let href;
  export let title;
  export let type;
  import {page} from '$app/stores';
  import {genLcHref} from '$lib/js/helpers';
  export let teaser;
  export let procDate;
  export let endDate = void null;
  export let tags;
  export let language;
  export let localChapters = [];
  import Langs from '$lib/components/Langs.svelte';
</script>

<div class="offset-right relative w-full" style="">
  <div
    class="z-1 relative top-0 grid h-full w-full grid-cols-4 rounded border border-neutral-25 bg-white p-4"
  >
    <div class="col-span-full xl:col-span-3">
      <div class=" align-center flex space-x-2 pb-2">
        <p class="mr-8 text-xl font-light">
          {procDate}{endDate ? ` - ${endDate}` : ''}
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
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold text-white"
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

      {#if localChapters.length !== 0}
        {#each localChapters as lc, i}
          <a
            class="text-medium font-semibold text-base-content transition hover:text-primary"
            href={genLcHref($page.params, lc.shortId)}
          >
            CorrelAidX {lc.city}</a
          >{#if i < localChapters.length - 1}{', '} {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>
