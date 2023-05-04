<script>
  import {page_key} from '$lib/stores/page_key';
  import {t} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data.projects';
  });

  export let data;
  let projects;
  $: projects = data.projects;

  $: console.log(projects[0].Posts[0]);
</script>

<div class="space-y-6">
  {#each projects as project, i}
    {#if project.Organizations[0]}
      <ProjectsCard
        href={project.subpage == true
          ? $t('navbar.using_data.projects').url + '/' + project.project_id
          : null}
        title={project.translations[0].title}
        organization={project.Organizations[0].Organizations_id.translations[0]
          .name}
        summary={project.translations[0].summary
          ? project.translations[0].summary
          : 'tbd'}
        correlaidx={project.Local_Chapters != []
          ? project.Local_Chapters
          : null}
        podcast_href={project.Podcast ? project.Podcast.soundcloud_link : null}
        post_slug={project.Posts.length != 0
          ? project.Posts[0].Posts_id.translations[0].slug
          : null}
        external={project.Projects_Outputs.length != 0
          ? project.Projects_Outputs[0].url
          : null}
      />
    {/if}
  {/each}
</div>
