<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Links from '$lib/components/Links.svelte';
  import Box from '$lib/components/Box.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data.projects';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: project = data.project;
</script>

<TextContainer title={project.title} teaser={project.teaser}>
  <div class="mx-4" slot="sub_subtitle">
    <div class="mb-5">
      <ProjectLinks {...project.projectLinks} />
    </div>
    <Box>
      <h2 class="text-xl font-semibold">
        {project.organization_name}
      </h2>
      <p>
        {project.organization_description}
      </p>
    </Box>
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
