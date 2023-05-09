<script>
  import {onMount} from 'svelte';
  import {page_key} from '$lib/stores/page_key';
  import {t} from '$lib/stores/i18n';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Html from '$lib/components/Html.svelte';
  import Events_Card from '$lib/components/Events_Card.svelte';
  import Person from '$lib/components/Person.svelte';
  import {parseEntries} from '$lib/js/parse_cms';
  import Icon from '$lib/components/Icon.svelte';

  onMount(() => {
    $page_key = 'navbar.community.correlaidx';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let local_admins;

  $: local_chapter = data.local_chapter;
  $: events = parseEntries(data.events, 'events');
  $: projects = parseEntries(data.projects, 'lcProjects');
  $: if (local_chapter) {
    local_admins = parseEntries(
      local_chapter.local_administrators,
      'local_administrators',
    );
  }
</script>

<div class="relative">
  <div class="w-screen pb-12">
    <Hero
      gradient_only={local_chapter.hero_image ? false : true}
      image={local_chapter.hero_image ? local_chapter.hero_image : null}
      height={'half'}
      correlaidx={true}
      text={`${local_chapter.translations[0].city}`}
      image_alt={local_chapter.translations[0].hero_image_alt}
    />
  </div>
</div>
<div class="px-4">
  <div class="container mx-auto pb-12">
    <Html
      source={local_chapter.translations[0].description}
      options={'mx-auto'}
    />
  </div>
  {#if projects.length !== 0}
    <div class="container mx-auto mb-12 space-y-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.using_data.projects').text}
        </h2>
      </div>
      <div class="space-y-6">
        {#each projects as project}
          <ProjectsCard {...project} />
        {/each}
      </div>
    </div>
  {/if}
  {#if events.length !== 0}
    <div class="container mx-auto mb-12 space-y-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.events').text}
        </h2>
      </div>
      {#each events as event}
        <Events_Card {...event} />
      {/each}
    </div>
  {/if}
  {#if local_chapter.local_administrators.length != 0}
    <div class="container mx-auto mb-12">
      {#each local_admins as person}
        <Person {...person} email={local_chapter.lc_email} />
      {/each}
    </div>
  {/if}
  {#if local_chapter.translations[0].how_to_get_in_touch}
    <div class="container mx-auto mb-12">
      <Icon
        icon_type={'get_in_touch'}
        text={local_chapter.translations[0].how_to_get_in_touch}
      />
    </div>
  {/if}
</div>
