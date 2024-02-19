<script>
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import CorrelAidLogo from '$lib/svg/CorrelAid_Logo_min.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import {page} from '$app/stores';
  import Html from '$lib/components/Html.svelte';
  import {gen_lc_href} from '$lib/js/helpers';
  import {t} from '$lib/stores/i18n';
  import Cursor from '$lib/svg/Cursor.svelte';

  export let title;
  export let subpage;
  export let data = void 0;
  export let type = void 0;
  export let isInternal;
  export let organization = void 0;
  export let summary = void 0;
  export let correlaidx = [];
  export let correlaidx_short_id = [];
  export let project_id = void 0;
  export let end_date;

  export let project_outputs = void 0;

  export let post_slug = void 0;
  export let podcast_href = void 0;

  // $: if (organization === 'undefined'){
  //   organization_name = $t('organization.anonymous').text;
  // }
  // if (isInternal) {
  //   organization_name = $t('organization.internalProject').text;
  // }
  // else{
  //   organization_name = organization;
  // }

  $: href = subpage
    ? $t('navbar.using_data.project_database').url + '/' + project_id
    : void 0;
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />

  {#if href}
    <a
      check
      {href}
      class="link absolute z-20 flex rounded bg-secondary"
      style="right: -2px; top: -2px"
    >
      <span class="sr-only">{$t('misc.read_more').text}</span>
      <span class="animate-shake fill-white px-1.5 py-1" aria-hidden="true">
        <Cursor width={29} height={29} /></span
      >
    </a>
  {/if}

  <div class="px-4 pb-6 pt-6">
    <div class="mb-2 flex items-center pb-2">
      <span aria-hidden="true">
        {#if !isInternal}
          <Nonprofit width={25} height={25} />
        {:else}
          <CorrelAidLogo width={25} height={25} />
        {/if}
      </span>
      <h4 class="text-md ml-2 line-clamp-3 font-semibold text-primary">
        {organization}
      </h4>
    </div>

    {#if href}
      <a
        {href}
        class="mt-2 text-xl font-semibold text-base-content transition hover:text-primary"
        >{title}</a
      >
    {:else}
      <h3
        class=" mt-2 line-clamp-3 block text-xl font-semibold text-base-content transition"
      >
        {title}
      </h3>
    {/if}

    <div class="mb-4 mt-3">
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
            class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold capitalize text-white"
            >{tag}</span
          >
        {/each}
      {/if}
    </div>
    {#if summary}
      <Html source={summary} options={'line-clamp-3 !px-0 my-3'} />
    {/if}
    {#if correlaidx.length !== 0}
      <div class="pb-3">
        {#each correlaidx as lc, i}
          <a
            class="text-medium mb-3 line-clamp-3 inline pr-3 font-semibold text-base-content transition hover:text-primary"
            href={gen_lc_href($page.params, correlaidx_short_id[i])}
            >CorrelAidX {lc}</a
          >
        {/each}
      </div>
    {/if}
    <ProjectLinks {project_outputs} {podcast_href} {post_slug} />
  </div>
</div>
