<script>
  import {t, locale} from '$lib/stores/i18n';
  import {gen_date} from '$lib/js/helpers';
  import Langs from '$lib/components/Langs.svelte';

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

  console.log(tags);
</script>

<article
  class="relative grid-cols-2 rounded border-t border-r border-l border-neutral-25 shadow-sm md:grid md:h-56"
>
  <!-- <div class="absolute top-0 -mt-6 space-x-2">
  {#if tags}
    {#each tags as tag}
      <span
        class="inline-flex items-center rounded bg-secondary px-3 py-1 text-xs font-bold text-white "
        >{tag}</span
      >
    {/each}
  {/if}
</div> -->
  <span
    class="absolute inset-x-0 bottom-0 h-2 rounded-b bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <Langs {langs} />

  <div class="flex">
    <div class="">
      <a {href} class="aspect-video w-full">
        {#if typeof image_url !== 'undefined'}
          <img class="rounded-tl" alt="Office" src={image_url} />
        {:else}
          <!-- TODO: Do we need this image placeholder? -->
          <div {href} class="h-[10em] w-full bg-neutral" />
        {/if}
      </a>
    </div>
  </div>
  <div class="">
    <div class="px-4 pb-4 pt-2 md:p-4">
      <h3 class="line-clamp-2 md:pr-12">
        <a
          {href}
          class="text-lg font-semibold leading-snug text-base-content transition hover:text-primary"
        >
          {title}
        </a>
      </h3>

      <p class="pt-2 text-sm line-clamp-1">
        {proc_date} - {#each content_creators as person, i}
          {#if person.Content_Creators_id.person}
            {person.Content_Creators_id.person
              .name}{#if i < content_creators.length - 1}{', '} {/if}
          {/if}
        {/each}
      </p>

      <div class="pt-2 pb-1">
        <p class="overflow-hidden text-justify text-base-content line-clamp-4">
          {teaser}
        </p>
      </div>
    </div>
  </div>
</article>
