<script>
  import {onMount} from 'svelte';
  import {page_key} from '$lib/stores/page_key';
  import {t} from '$lib/stores/i18n';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Html from '$lib/components/Html.svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import Person from '$lib/components/Person.svelte';
  import Icon from '$lib/components/Icon.svelte';

  onMount(() => {
    $page_key = 'navbar.community.correlaidx';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: lcPage = data;
</script>

<div class="relative">
  <div class="w-screen pb-12">
    <Hero {...lcPage['hero']} />
  </div>
</div>
<div class="container mx-auto">
  <Html source={lcPage['description']} options={'px-0 mb-12'} />
  {#if lcPage['projects'].length !== 0}
    <div class=" mb-12 space-y-8 px-4">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.using_data.projects').text}
        </h2>
      </div>
      <div class="space-y-6">
        {#each lcPage['projects'] as project}
          <ProjectsCard {...project} />
        {/each}
      </div>
    </div>
  {/if}
  {#if lcPage['events'].length !== 0}
    <div class=" mb-12 space-y-8 px-4">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.events').text}
        </h2>
      </div>
      {#each lcPage['events'] as event}
        <Events_Card {...event} />
      {/each}
    </div>
  {/if}
  {#if lcPage['local_admins'].length != 0}
    <div class="mx-4 mb-12">
      <h2 class="text-3xl font-bold text-base-content">Team</h2>
    </div>
    <div class="flex flex-col gap-y-8 px-4 pb-12">
      {#each lcPage['local_admins'] as person}
        <Person {...person} email={lcPage['lcEmail']} />
      {/each}
    </div>
  {/if}
  {#if lcPage.howToGetInTouch}
    <div class="mb-12 px-4">
      <Icon icon_type={'get_in_touch'} text={lcPage.howToGetInTouch} />
    </div>
  {/if}
</div>
