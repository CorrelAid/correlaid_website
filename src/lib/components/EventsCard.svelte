<script>
  export let href;
  export let title;
  export let type;
  export let viewType = void 0;
  export let teaser;
  export let procDate;
  export let endDate = void null;
  export let tags;
  export let language;
  export let procLocalChapters = [];
  import Langs from '$lib/components/Langs.svelte';
  import Tag from './Tag.svelte';

  $: link = viewType ? href + '?viewType=' + viewType : href;
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
          href={link}
          class="text-xl font-semibold text-base-content transition hover:text-primary"
        >
          {title}
        </a>
      </div>
      <div class="absolute right-0 top-0 z-20 p-2">
        <Langs langs={[language]} />
      </div>
      <div class="mb-4">
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold text-white"
        >
          {type}</span
        >
        {#each tags as tag}
          <Tag text={tag} color="bg-secondary" />
        {/each}
      </div>

      <p class="mb-3 line-clamp-3 text-base-content xl:pb-0 xl:pr-4">
        {teaser}
      </p>

      {#if procLocalChapters.length !== 0}
        {#each procLocalChapters as lc, i}
          <a
            class="text-medium font-semibold text-base-content transition hover:text-primary"
            href={lc.href}
          >
            CorrelAidX {lc.city}</a
          >{#if i < procLocalChapters.length - 1}{', '} {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>
