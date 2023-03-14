<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";
  import VolunteerJourney from "$lib/components/Volunteer_Journey.svelte";
  import Person from "$lib/components/Person.svelte";

  onMount(() => {
    $page_key = "navbar.community.volunteer_journeys";
  });

  export let data;
  let volunteer_journeys;
  $: volunteer_journeys = data.volunteer_journeys;
</script>

<div class="container mx-auto pb-12">
  <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 lg:gap-28 gap-8 px-4">
    {#each volunteer_journeys as journey, i}
      <VolunteerJourney
        name={journey.person.name}
        subtitle={journey.translations[0].subtitle}
        text={journey.translations[0].text}
        image={journey.person.image}
      />
    {/each}
  </div>
</div>
