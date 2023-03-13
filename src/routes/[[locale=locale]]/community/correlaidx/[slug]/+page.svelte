<script>
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key";
  import { gen_date } from "$lib/js/helpers";
  import { locale } from "$lib/stores/i18n";
  import { t } from "$lib/stores/i18n";
  import Card from "$lib/components/Card.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Html from "$lib/components/Html.svelte";
  import { gen_img_url } from "$lib/js/helpers";
  import Events_Card from "$lib/components/Events_Card.svelte";

  onMount(() => {
    $page_key = "navbar.community.correlaidx";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  import Person from "$lib/components/Person.svelte";
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
      gradient_only={true}
      height={"half"}
      correlaidx={true}
      text={`CorrelAidX ${local_chapter.translations[0].city}`}
    />
  </div>
</div>
<div class="container mx-auto pb-12">
  <Html
    source={local_chapter.translations[0].description}
    options={"prose-img:"}
    width={"text"}
  />
</div>
{#if events.length != 0}
  <div class="container mx-auto mb-12 space-y-8">
    <h2 class="px-4 text-xl font-semibold">Events</h2>
    {#each events as event, i}
      <Events_Card
        href={$t("navbar.events").url + "/" + event.slug}
        title={event.title}
        teaser={event.teaser}
        image_url={gen_img_url(
          event.title_image.id,
          "fit=inside&width=1200&height=675&format=png"
        )}
        date={event.date}
        tags={event.tags}
      />
    {/each}
  </div>
{/if}
{#if projects.length != 0}
  <div class="container mx-auto mb-12 space-y-8">
    <h2 class="px-4 text-xl font-semibold">Projects</h2>
    <div class="grid grid-cols-2 gap-6">
      {#each projects as project, i}
        <Card
          href={$t("navbar.projects_consulting.projects").url +
            "/" +
            project.Projects_id.project_id}
          title={project.Projects_id.translations[0].title}
          subtitle={project.Projects_id.organizations[0]
            .Projects_Organization_id.translations[0].name}
        />
      {/each}
    </div>
  </div>
{/if}
{#if local_chapter.local_administrators.length != 0}
  <div class="container mx-auto mb-12 space-y-8">
    {#each local_chapter.local_administrators as person}
      <Person
        name={person.Local_Administrators_id.person.name}
        img={gen_img_url(
          person.Local_Administrators_id.person.image.id,
          "fit=cover&width=200&height=200&quality=80"
        )}
        position={person.Local_Administrators_id.translations[0].position}
        description={person.Local_Administrators_id.translations[0].description}
        email={person.Local_Administrators_id.person.email}
      />
    {/each}
  </div>
{/if}
