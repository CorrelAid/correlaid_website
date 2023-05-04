<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import WorkshopCard from '$lib/components/WorkshopCard.svelte';

  onMount(() => {
    $page_key = 'navbar.education.resources';
  });

  export let data;
  let workshops;
  $: workshops = data.workshops;
</script>

<div class="space-y-6">
  {#each workshops as workshop, i}
    <WorkshopCard
      title={workshop.name}
      subtitle={workshop.teaser}
      language={workshop.language}
      href={workshop.resource_link}
      resp_unit={workshop.responsible_unit}
      correlaidx_city={workshop.local_chapters[0]
        ? workshop.local_chapters[0].Local_Chapters_id.translations[0].city
        : null}
    />
  {/each}
</div>
