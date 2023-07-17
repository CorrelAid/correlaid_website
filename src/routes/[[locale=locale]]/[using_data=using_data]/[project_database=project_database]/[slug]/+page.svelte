<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {page} from '$app/stores';
  import Html from '$lib/components/Html.svelte';
  import {gen_lc_href} from '$lib/js/helpers';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Links from '$lib/components/Links.svelte';
  import Box from '$lib/components/Box.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data.project_database';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: project = data;

  $: console.log(project.type);
  $: console.log(project.data);
</script>

<TextContainer title={project.title} teaser={project.teaser}>
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
    {#if project.Local_Chapters}
      <div class="pb-3">
        {#each project.Local_Chapters as lc}
          <a
            class="text-medium mb-3 line-clamp-3 inline pr-3 font-semibold text-base-content transition hover:text-primary"
            href={gen_lc_href($page.params, lc)}>CorrelAidX {lc}</a
          >
        {/each}
      </div>
    {/if}

    <div class="mb-5">
      <ProjectLinks {...project.projectLinks} />
    </div>
    {#if project.organization}
      <Box>
        <h2 class="text-xl font-semibold">
          {project.organization.name}
        </h2>
        <p>
          <Html source={project.organization.description} options={'!px-0'} />
        </p>
      </Box>
    {/if}
  </div>

  <Html source={project.description} options={'mx-auto'} slot="main" />
</TextContainer>
<div class="container mx-auto pb-12">
  <div class="px-4">
    <Box>
      <h3 class="pb-3 text-xl font-semibold">CorrelAid Team:</h3>
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
