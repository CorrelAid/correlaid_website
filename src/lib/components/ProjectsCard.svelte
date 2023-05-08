<script>
  export let title;
  export let organization;
  export let correlaidx = [];
  export let href;
  export let summary;
  export let repo;
  export let post_slug;
  export let podcast_href;
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />

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
    <ProjectLinks {href} {repo} {podcast_href} {post_slug} />
  </div>
</div>
