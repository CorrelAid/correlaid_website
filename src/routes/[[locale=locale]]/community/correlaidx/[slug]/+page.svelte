<script>
  import {onMount} from 'svelte';
  import {page_key} from '$lib/stores/page_key';
  import {t} from '$lib/stores/i18n';
  import Card from '$lib/components/Card.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Html from '$lib/components/Html.svelte';
  import {gen_img_url} from '$lib/js/helpers';
  import Events_Card from '$lib/components/Events_Card.svelte';

  onMount(() => {
    $page_key = 'navbar.community.correlaidx';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  import Person from '$lib/components/Person.svelte';
  let local_chapter;
  $: local_chapter = data.local_chapter;
  let events;
  $: events = data.events;
  let projects;
  $: projects = data.projects;
</script>

<div class="relative">
  <div class="w-screen pb-12">
    <Hero
      gradient_only={local_chapter.hero_image ? false : true}
      image={local_chapter.hero_image ? local_chapter.hero_image : null}
      height={'half'}
      correlaidx={true}
      text={`${local_chapter.translations[0].city}`}
    />
  </div>
</div>
<div class="px-4">
  <div class="container mx-auto pb-12">
    <Html
      source={local_chapter.translations[0].description}
      options={'prose-img:'}
      width={'text'}
    />
  </div>
  {#if projects.length != 0}
    <div class="container mx-auto mb-12 space-y-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.using_data.projects').text}
        </h2>
      </div>
      <div class="grid gap-6 lg:grid-cols-2">
        {#each projects as project, i}
          <Card
            href={$t('navbar.using_data.projects').url +
              '/' +
              project.Projects_id.project_id}
            title={project.Projects_id.translations[0].title}
            subtitle={project.Projects_id.Organizations[0].Organizations_id
              .translations[0].name}
          />
        {/each}
      </div>
    </div>
  {/if}
  {#if events.length != 0}
    <div class="container mx-auto mb-12 space-y-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-base-content">
          {$t('navbar.events').text}
        </h2>
      </div>
      {#each events as event, i}
        <Events_Card
          href={$t('navbar.events').url + '/' + event.slug}
          title={event.title}
          teaser={event.teaser}
          date={event.date}
          tags={event.tags}
        />
      {/each}
    </div>
  {/if}

  {#if local_chapter.local_administrators.length != 0}
    <div class="container mx-auto mb-12 space-y-8">
      {#each local_chapter.local_administrators as person}
        <Person
          name={person.Local_Administrators_id.person.name}
          img={person.Local_Administrators_id.person.image
            ? gen_img_url(
                person.Local_Administrators_id.person.image.id,
                'fit=cover&width=200&height=200&quality=80',
              )
            : null}
          position={person.Local_Administrators_id.translations
            ? person.Local_Administrators_id.translations[0].position
            : null}
          description={person.Local_Administrators_id.translations
            ? person.Local_Administrators_id.translations[0].description
            : null}
          email={local_chapter.lc_email}
          website={person.Local_Administrators_id.person.website
            ? person.Local_Administrators_id.person.website
            : ''}
          linkedin={person.Local_Administrators_id.person.linkedin
            ? person.Local_Administrators_id.person.linkedin
            : ''}
          mastodon={person.Local_Administrators_id.person.mastodon
            ? person.Local_Administrators_id.person.mastodon
            : ''}
          twitter={person.Local_Administrators_id.person.twitter
            ? person.Local_Administrators_id.person.twitter
            : ''}
          github={person.Local_Administrators_id.person.github
            ? person.Local_Administrators_id.person.github
            : ''}
          pronouns={person.Local_Administrators_id.person.translations[0]
            ? person.Local_Administrators_id.person.translations[0].pronouns
            : null}
        />
      {/each}
    </div>
  {/if}
</div>
