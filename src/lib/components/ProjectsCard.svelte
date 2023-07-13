<script>
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import CorrelAidLogo from '$lib/svg/CorrelAid_Logo_min.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
  import {t} from '$lib/stores/i18n';

  export let title;
  export let subpage;
  export let data = void 0;
  export let type = void 0;
  export let isInternal;
  export let organization = void 0;
  export let summary = void 0;
  export let correlaidx = [];
  export let project_id = void 0;
  export let repo = void 0;
  export let post_slug = void 0;
  export let podcast_href = void 0;

  const annonymousOrg = typeof organization === 'undefined' && !isInternal;

  $: {
    if (annonymousOrg) {
      organization = $t('organization.anonymous').text;
    }
  }

  $: if (isInternal) {
    organization = $t('organization.internalProject').text;
  }
  $: href = subpage
    ? $t('navbar.using_data.project_database').url + '/' + project_id
    : null;
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />

  <div class="px-4 pb-6 pt-6">
    <div class="mb-2 flex items-center pb-2">
      {#if !isInternal}
        <Nonprofit width={25} height={25} />
        <h4 class="text-md ml-2 line-clamp-3 font-semibold text-primary">
          {organization}
        </h4>
      {:else}
        <CorrelAidLogo width={25} height={25} />
        <h4 class="text-md ml-2 line-clamp-3 font-semibold text-primary">
          {organization}
        </h4>
      {/if}
    </div>

    <h3
      class="mb-3 mt-2 line-clamp-3 block text-xl font-semibold text-base-content transition"
    >
      {title}
    </h3>
    <div class="mb-4">
      {#if type}
        {#each type as tag}
          <span
            class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold capitalize text-white"
          >
            {tag}</span
          >
        {/each}
      {/if}
      {#if data}
        {#each data as tag}
          <span
            class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
            >{tag}</span
          >
        {/each}
      {/if}
    </div>
    {#if summary}
      <p class="mb-3 line-clamp-3">{summary}</p>
    {/if}
    {#if correlaidx.length !== 0}
      {#each correlaidx as lc}
        <a
          class="text-medium mb-3 line-clamp-3 font-semibold text-base-content transition hover:text-primary"
          href={gen_lc_href($page.params, lc)}>CorrelAidX {lc}</a
        >
      {/each}
    {/if}
    <ProjectLinks {href} {repo} {podcast_href} {post_slug} />
  </div>
</div>
