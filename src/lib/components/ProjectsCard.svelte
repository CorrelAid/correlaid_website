<script>
  import Nonprofit from '$lib/svg/Nonprofit.svelte';
  import CorrelAidLogo from '$lib/svg/CorrelaidLogoMin.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import Tag from './Tag.svelte';
  import Html from '$lib/components/Html.svelte';
  import Volunteering from '$lib/svg/Volunteering.svelte';
  import {t} from '$lib/stores/i18n';

  export let title;
  export let dataTypes;
  export let projectTypes;
  export let isInternal;
  export let organization;
  export let summary;
  export let teamSelection;
  export let procLocalChapters = [];
  export let href;
  export let projectOutputs = [];
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />

  {#if teamSelection === true}
    <span class="link absolute z-20" style="right: 10px; top: 15px">
      <Volunteering width={40} height={40} />
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
      <h4 class="text-md ml-2 line-clamp-3 font-semibold text-primary">
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
    <Html source={summary} options={'line-clamp-3 !px-0 my-3'} />
    {#if procLocalChapters.length !== 0}
      <div class="pb-3">
        {#each procLocalChapters as lc, i}
          <a
            class="text-medium mb-3 line-clamp-3 inline pr-3 font-semibold text-base-content transition hover:text-primary"
            href={lc['href']}>CorrelAidX {lc['city']}</a
          >
        {/each}
      </div>
    {/if}
    {#if projectOutputs.length > 0 && teamSelection === false}
      <ProjectLinks {projectOutputs} />
    {/if}
    {#if teamSelection === true}
      <div>
        <p class="italic text-tertiary">{$t('filter.team_selection').text}!</p>
      </div>
    {/if}
  </div>
</div>
