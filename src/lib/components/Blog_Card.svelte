<script>
  import {t, locale} from '$lib/stores/i18n';
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  import {gen_date} from '$lib/js/helpers';

  export let langs;
  export let title;
  export let teaser;
  export let tags;
  export let content_creators;
  export let href;
  export let pubdate;
  export let image_url = void 0;
  export let slug = void 0;

  let proc_date;

  if (typeof slug !== 'undefined') {
    href = $t('navbar.blog').url + '/' + slug;
  }

  $: proc_date = gen_date(pubdate, $locale, true);
</script>

<article
  class="relative min-h-full overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <a {href} class="aspect-video mb-2 w-full">
    {#if typeof image_url !== 'undefined'}
      <img alt="Office" src={image_url} />
    {:else}
      <!-- TODO: Do we need this image placeholder? -->
      <div {href} class="h-[10em] w-full bg-neutral" />
    {/if}
  </a>
  <div class="p-4 sm:p-6">
    <a {href}>
      <h3
        class="text-xl font-semibold text-base-content transition hover:text-primary"
      >
        {title}
      </h3>
      <p class="flex space-x-2 pt-2">
        {#each langs as lang}
          {#if lang == 'de-DE'}
            <De height={25} width={25} />
          {:else}
            <En height={25} width={25} />
          {/if}
        {/each}
      </p>
    </a>

    <p class="pt-2 pb-4">
      {proc_date} - {#each content_creators as person, i}
        {#if person.Content_Creators_id.person}
          {person.Content_Creators_id.person
            .name}{#if i < content_creators.length - 1}{', '} {/if}
        {/if}
      {/each}
    </p>

    {#if tags}
      <div class="flex w-full flex-wrap gap-2">
        {#each tags as tag}
          <span
            class="inline-flex items-center rounded bg-secondary px-3 py-1 text-xs font-bold capitalize text-white"
            >{tag}</span
          >
        {/each}
      </div>
    {/if}
    <div class="py-4">
      <p
        class="overflow-hidden text-justify leading-relaxed text-base-content line-clamp-3"
      >
        {teaser}
      </p>
    </div>
  </div>
</article>
