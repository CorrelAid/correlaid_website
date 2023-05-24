<script>
  import {t, locale} from '$lib/stores/i18n';
  import {gen_date} from '$lib/js/helpers';
  import Langs from '$lib/components/Langs.svelte';
  export let image_alt;
  export let langs;
  import ExternalLink from '../svg/External_Link.svelte';
  export let title;
  export let teaser;
  // export let tags;
  export let content_creators;
  export let href;
  export let pubdate;
  export let image_url = void 0;
  export let slug = void 0;
  export let external = false;
  export let image_desc = void 0;

  let proc_date;

  if (typeof slug !== 'undefined') {
    href = $t('navbar.blog').url + '/' + slug;
  }

  $: proc_date = gen_date(pubdate, $locale, true);
</script>

<article
  class="relative grid-cols-2 rounded border-l border-r border-t border-neutral-25 shadow-sm md:grid"
>
  <span
    class="absolute inset-x-0 bottom-0 z-10 h-2 rounded-b bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <Langs {langs} />

  <div class="flex">
    <a
      class="relative mx-auto w-full"
      {href}
      aria-label="Page: {slug ? 'Blogpost' : 'Podcast Episode'}"
      style="padding-bottom: 56.25%;"
    >
      {#if typeof image_url !== 'undefined'}
        <img
          class="absolute left-0 top-0 z-0 h-full w-full rounded-tl"
          alt={image_alt}
          src={image_url}
          title={image_desc}
        />
      {:else}
        <!-- TODO: Do we need this image placeholder? -->
        <div class="rounded-tl bg-gray-300" />
      {/if}
    </a>
  </div>
  <div class="">
    <div class="px-4 pb-4 pt-3 md:p-4 md:pt-2">
      <h3 class="line-clamp-2 md:pr-7">
        {#if external === false}
          <a
            {href}
            class="text-lg font-semibold leading-snug text-base-content transition hover:text-primary"
          >
            {title}
          </a>
        {:else}
          <a
            {href}
            target="_blank"
            rel="noreferrer"
            class="text-lg font-semibold leading-snug text-base-content transition hover:text-primary"
          >
            <span class="mr-1">
              {title}
            </span>

            <span class="inline-block align-text-top"
              ><ExternalLink
                height={20}
                width={20}
                color={'rgb(60, 60, 59)'}
              /></span
            >
          </a>
        {/if}
      </h3>
      <p class="pt-1.5 text-sm line-clamp-1">
        {proc_date} - {#each content_creators as person, i}
          {#if person.Content_Creators_id.person}
            {person.Content_Creators_id.person
              .name}{#if i < content_creators.length - 1}{', '} {/if}
          {/if}
        {/each}
      </p>

      <div class="pb-1 pt-1.5">
        <p class="overflow-hidden text-justify text-base-content line-clamp-3">
          {teaser}
        </p>
      </div>
    </div>
  </div>
</article>
