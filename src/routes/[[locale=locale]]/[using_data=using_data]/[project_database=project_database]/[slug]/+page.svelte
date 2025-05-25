<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Links from '$lib/components/Links.svelte';
  import Box from '$lib/components/Box.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import ExternalLink from '$lib/svg/External_Link.svelte';
  import {t} from '$lib/stores/i18n';

  onMount(() => {
    $pageKey = 'navbar.using_data.project_database';
  });

  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let {data} = $props();
  let project = $derived(data.project);
</script>

{#if project}
  <TextContainer title={project.title} teaser={project.summary}>
    {#snippet sub_subtitle()}
      <div class="mx-4">
        <div class="mb-4">
          {#each project.projectTypes as tag}
            <Tag text={tag} color="bg-primary" />
          {/each}

          {#each project.dataTypes as tag}
            <Tag text={tag} color="bg-secondary" />
          {/each}
        </div>
        {#if project.teamSelection === true}
          <div>
            <a
              target="__blank"
              rel="noreferrer"
              href={project.applicationLink}
              class="pb-1 pr-4 text-secondary"
            >
              <span class="underline">{$t('project.apply').text} </span>
              <span
                class="font inline-block align-text-top"
                aria-label="External Link"
                ><ExternalLink height={17} width={17} color={'#3863a2'} /></span
              >
            </a>
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
    {/snippet}
    {#snippet main()}
      <div>
        {#if project.description}
          <Html source={project.description} options={'mx-auto'} />
        {/if}
      </div>
    {/snippet}
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
