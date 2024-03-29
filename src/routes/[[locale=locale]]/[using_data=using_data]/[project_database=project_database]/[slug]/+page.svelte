<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Links from '$lib/components/Links.svelte';
  import Box from '$lib/components/Box.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';

  onMount(() => {
    $pageKey = 'navbar.using_data.project_database';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: project = data.project;
</script>

{#if project}
  <TextContainer title={project.title} teaser={project.summary}>
    <div class="mx-4" slot="sub_subtitle">
      {#if project.type || project.data}
        <div class="mb-4">
          {#if project.type}
            {#each project.type as tag}
              <span
                class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold capitalize text-white"
              >
                {tag}</span
              >
            {/each}
          {/if}
          {#if project.data}
            {#each project.data as tag}
              <span
                class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold capitalize text-white"
                >{tag}</span
              >
            {/each}
          {/if}
        </div>
      {/if}
      {#if project.localChapters}
        <div class="pb-3">
          {#each project.localChapters as lc}
            <a
              class="text-medium mb-3 line-clamp-3 inline pr-3 font-semibold text-base-content transition hover:text-primary"
              href={lc.href}>CorrelAidX {lc}</a
            >
          {/each}
        </div>
      {/if}

      {#if !project.description}
        <div class="mb-4">
          <ProjectLinks
            projectOutputs={project.projectOutputs}
            horizontal={false}
          />
        </div>
      {/if}
      {#if project.organization}
        <div class="mb-6 mt-4">
          <Box>
            {#if project.organization.description}
              <h2 class="text-xl font-semibold">
                {project.organization.name}
              </h2>
            {:else}
              <h2 class="font-semibold">{project.organization.name}</h2>
            {/if}
            {#if project.organization.description}
              <p>
                <Html
                  source={project.organization.description}
                  options={'!px-0'}
                />
              </p>
            {/if}
          </Box>
        </div>
      {/if}
    </div>
    <div slot="main">
      {#if project.description}
        <Html source={project.description} options={'mx-auto'} />
      {/if}
    </div>
  </TextContainer>
  {#if project.projectOutputs.length !== 0 && project.description}
    <div class="container mx-auto pb-12">
      <div class="px-4">
        <Box>
          <h3 class="mb-4 text-xl font-semibold">Outputs:</h3>
          <ProjectLinks projectOutputs={project.projectOutputs} />
        </Box>
      </div>
    </div>
  {/if}
  {#if project.projectContacts.length !== 0}
    <div class="container mx-auto pb-12">
      <div class="px-4">
        <Box>
          <h3 class="mb-4 text-xl font-semibold">CorrelAid Team:</h3>
          {#each project.projectContacts as person}
            <div class="flex items-center">
              <span class="mr-2">
                {person.name}
                {person.pronouns ? person.pronouns : ''}
              </span>
              <Links {...person.links} />
            </div>
          {/each}
        </Box>
      </div>
    </div>
  {/if}
{/if}
