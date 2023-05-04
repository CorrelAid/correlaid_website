<script>
  export let title;
  export let organization;
  export let correlaidx = [];
  export let href;
  export let summary;
  export let external;
  export let post_slug;
  export let podcast_href;
  import Podcast from '$lib/svg/Podcast.svelte';
  import Blog from '$lib/svg/Blog.svelte';
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import ExternalLink from '$lib/svg/External_Link.svelte';
  import {t} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <div class="absolute right-0 flex items-center space-x-4 pt-4 pr-3">
    {#if podcast_href}
      <a class="text-secondary hover:underline" href={podcast_href}
        ><Podcast height={32} width={17} /></a
      >
    {/if}
    {#if post_slug}
      <a
        class="text-secondary hover:underline"
        href={$t('navbar.blog').url + '/' + post_slug}
        ><Blog height={33} width={33} /></a
      >
    {/if}
  </div>

  <div class="px-4 pt-6 pb-6">
    <div class="mb-2 flex items-center pb-2">
      <Nonprofit width={25} height={25} />
      <h4 class="text-md ml-2 font-semibold text-primary line-clamp-3">
        {organization}
      </h4>
    </div>

    <h3
      class="mt-2 mb-3 block text-xl font-semibold text-base-content transition line-clamp-3"
    >
      {title}
    </h3>

    {#if correlaidx != []}
      {#each correlaidx as lc}
        <a
          class="text-medium mb-3 text-base-content transition line-clamp-3 hover:text-primary"
          href={gen_lc_href(
            $page.params,
            lc.Local_Chapters_id.translations[0].city,
          )}>CorrelAidX {lc.Local_Chapters_id.translations[0].city}</a
        >
      {/each}
    {/if}

    <p class="mb-3 line-clamp-3">{summary}</p>

    {#if podcast_href || post_slug || external}
      <ul class="mb-4 flex list-inside list-disc items-center space-x-4">
        {#if href}
          <li>
            <a class="text-secondary hover:underline" {href}
              >{$t('misc.report').text}</a
            >
          </li>
        {/if}
        {#if external}
          <li>
            <div class=" inline-flex items-center">
              <a class=" text-secondary hover:underline" href={external}
                >{$t('misc.output').text}
              </a><span class="ml-1.5"
                ><ExternalLink
                  height={20}
                  width={20}
                  color={'rgb(56, 99, 162)'}
                /></span
              >
            </div>
          </li>
        {/if}
      </ul>
    {/if}
  </div>
</div>
