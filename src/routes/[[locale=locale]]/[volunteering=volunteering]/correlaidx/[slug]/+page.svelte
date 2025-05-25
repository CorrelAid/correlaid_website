<script>
  import {onMount} from 'svelte';
  import {pageKey} from '$lib/stores/pageKey';
  import {t} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import Ical from '$lib/svg/Ical.svelte';
  import ProjectsCard from '$lib/components/ProjectsCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Html from '$lib/components/Html.svelte';
  import EventsCard from '$lib/components/EventsCard.svelte';
  import Person from '$lib/components/Person.svelte';
  import Icon from '$lib/components/Icon.svelte';

  onMount(() => {
    $pageKey = 'navbar.volunteering.correlaidx';
  });

  let {data} = $props();
  let localAdministrators = $derived(data.localAdministrators);
  let hero = $derived(data.hero);
  let projects = $derived(data.projects);
  let events = $derived(data.events);
  let description = $derived(data.description);
  let iconText = $derived(data.iconText);
</script>

<div class="relative">
  <div class="w-screen pb-12">
    <Hero {...hero} />
  </div>
</div>
<div class="container mx-auto">
  {#if description}
    <Html source={description} options={'px-0 mb-12'} />
  {/if}
  {#if projects.length !== 0}
    <div class=" mb-12 space-y-8 px-4">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.using_data.projects').text}
        </h2>
      </div>
      <div class="space-y-6">
        {#each projects as project}
          <ProjectsCard
            {...(({organizationSector, localChapterNames, ...rest}) => rest)(
              project,
            )}
          />
        {/each}
      </div>
    </div>
  {/if}
  {#if events.length !== 0}
    <div class="mb-12 px-4 lg:space-y-8">
      <div class="lg:mb-12">
        <span class="relative block text-3xl font-bold text-base-content">
          {$t('navbar.events').text}
          <a
            download="calendar.ics"
            href={`${$t('navbar.volunteering.correlaidx').url}/${
              $page.params.slug
            }/calendar.ics`}
            class="absolute right-0 hidden whitespace-nowrap align-text-top lg:inline-block"
            aria-label={$t('access.ical').text}
          >
            <Ical height="45" width="45" />
          </a>
        </span>
      </div>
      <a
        download="calendar.ics"
        href={$t('footer.ical').url}
        class="my-4 inline-block whitespace-nowrap lg:hidden"
        aria-label={$t('access.ical').text}
      >
        <Ical height="45" width="45" />
      </a>
      {#each events as event}
        <EventsCard {...event} />
      {/each}
    </div>
  {/if}
  {#if localAdministrators.length != 0}
    <div class="mx-4 mb-12">
      <h2 class="text-3xl font-bold text-base-content">Team</h2>
    </div>
    <div class="flex flex-col gap-y-8 px-4 pb-12">
      {#each localAdministrators as person}
        <Person {...person} />
      {/each}
    </div>
  {/if}
  {#if iconText}
    <div class="mb-12 px-4">
      <Icon iconType={'get_in_touch'} text={iconText} />
    </div>
  {/if}
</div>
