<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';
  import {parseEntries} from '$lib/js/parse_cms';

  onMount(() => {
    $page_key = 'navbar.using_data.projects';
  });

  export let data;
  $: projects = parseEntries(data.projects, 'projects');
</script>

<div class="space-y-6">
  {#each projects as project}
    <ProjectsCard {...project} />
  {/each}
</div>
