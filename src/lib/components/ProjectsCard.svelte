<script>
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import CorrelAidLogo from '$lib/svg/CorrelaidLogoMin.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import Tag from './Tag.svelte';
  import TeamSearch from '$lib/svg/TeamSearch.svelte';
  import {t} from '$lib/stores/i18n';

  let {
    title,
    dataTypes,
    projectTypes,
    isInternal,
    organization,
    teaser,
    teamSelection,
    procLocalChapters = [],
    href,
    projectOutputs = [],
  } = $props();
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  ></span>

  {#if teamSelection === true}
    <span class="link absolute z-20" style="right: 14px; top: 12px">
      <span arria-hidden="true">
        <TeamSearch width={36} height={36} />
      </span>
      <span class="sr-only">{$t('filter.team_selection').text}</span>
    </span>
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
      <h4 class="text-md ml-2 line-clamp-3 pr-12 font-semibold text-primary">
        {organization}
      </h4>
    </div>

    <a
      {href}
      class="mt-2 text-xl font-semibold text-base-content transition hover:text-primary"
      >{title}</a
    >

    <div class="mb-4 mt-3">
      {#each projectTypes as tag}
        <Tag text={tag} color="bg-primary" />
      {/each}
      {#each dataTypes as tag}
        <Tag text={tag} color="bg-secondary" />
      {/each}
    </div>
    <span class="my-3 line-clamp-3 !px-0 leading-normal text-base-content"
      >{teaser}</span
    >
    {#if projectOutputs && procLocalChapters.length !== 0}
      <div class="pb-3">
        {#each procLocalChapters as lc, i}
          <a
            class="text-medium mb-3 line-clamp-3 inline pr-3 font-semibold text-base-content transition hover:text-primary"
            href={lc['href']}>CorrelAidX {lc['city']}</a
          >
        {/each}
      </div>
    {/if}
    {#if projectOutputs && projectOutputs.length > 0 && teamSelection === false}
      <ProjectLinks {projectOutputs} />
    {/if}
  </div>
</div>
