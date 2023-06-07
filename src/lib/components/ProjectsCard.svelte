<script>
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
  import {t, locale} from '$lib/stores/i18n';

  export let title;
  export let subpage;
  export let organization = void 0;
  export let summary = 'tbd';
  export let correlaidx = [];
  export let project_id = void 0;
  export let repo = void 0;
  export let post_slug = void 0;
  export let podcast_href = void 0;

  const annonymousOrg = typeof organization === 'undefined';

  $: {
    if (annonymousOrg) {
      if ($locale === 'de') {
        organization = 'Anonyme Organisation';
      } else {
        organization = 'Anonymous Organization';
      }
    }
  }
  $: href = subpage
    ? $t('navbar.using_data.projects').url + '/' + project_id
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
      <Nonprofit width={25} height={25} />
      <h4 class="text-md ml-2 line-clamp-3 font-semibold text-primary">
        {organization}
      </h4>
    </div>

    <h3
      class="mb-3 mt-2 line-clamp-3 block text-xl font-semibold text-base-content transition"
    >
      {title}
    </h3>

    <p class="mb-3 line-clamp-3">{summary}</p>
    {#if correlaidx.length !== 0}
      {#each correlaidx as lc}
        <a
          class="text-medium mb-3 line-clamp-3 font-semibold text-base-content transition hover:text-primary"
<<<<<<< HEAD
          href={gen_lc_href($page.params, lc)}>CorrelAidX {lc}</a
=======
          href={gen_lc_href(
            $page.params,
            lc.Local_Chapters_id.translations[0].city,
          )}>CorrelAidX {lc.Local_Chapters_id.translations[0].city}</a
>>>>>>> 81695d9 (server side parsing of project overview)
        >
      {/each}
    {/if}
    <ProjectLinks {href} {repo} {podcast_href} {post_slug} />
  </div>
</div>
