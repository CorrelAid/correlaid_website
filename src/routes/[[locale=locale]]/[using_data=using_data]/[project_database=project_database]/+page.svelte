<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data.project_database';
  });

  // const source = '# WIP';
  export let data;
  $: projects = data.projects;
</script>

<div class="space-y-8 px-4">
  {#each projects as project}
    <ProjectsCard {...project} />
  {/each}
</div>
