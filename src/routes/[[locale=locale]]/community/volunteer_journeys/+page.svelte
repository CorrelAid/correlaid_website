<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.community.volunteer_journeys";
    });

    export let data;
    let volunteer_journeys;
    $: volunteer_journeys = data.volunteer_journeys;

</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
    <ul>
      {#each volunteer_journeys as journey, i}
        <li>
          {journey.person.name}
        </li>
      {/each}
    </ul>
  </div>

