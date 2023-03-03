<script>
  import { page_key } from "$lib/stores/page_key";
  import { gen_date, gen_time } from "$lib/js/helpers";
  import { locale } from "$lib/stores/i18n";
  import { onMount } from "svelte";
  import Html from "$lib/components/Html.svelte";
  import Time from "$lib/svg/Time.svelte";
  import Calendar from "$lib/svg/Calendar.svelte";
  import Location from "$lib/svg/Location.svelte";
  import Headset from "$lib/svg/Headset.svelte";

  onMount(() => {
    $page_key = "navbar.events";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let event;
  $: event = data.event;
</script>

<div class="container mx-auto pt-8 px-4">
  <Html source={`<h1>${event.title}</h1>`} width={"text"} />
  <div id="info" class="p-4 border border-neutral-25 rounded mt-8 mx-auto">
    {#each event.dates as date}
      <p class="flex pb-2">
        <span class="flex my-auto fill-neutral"
          ><Calendar width={20} height={20} /></span
        >

        <span class="pl-4 my-auto">{gen_date(date.date, $locale)}</span>
        <span class="pl-10 flex my-auto fill-neutral"
          ><Time width={20} height={20} /></span
        ><span class="pl-4 my-auto">{gen_time(date.start_time, $locale)} - {gen_time(date.end_time, $locale)}</span
        >
    {/each}
    {#if event.location}
      <p class="flex pb-2">
        <span class="flex my-auto fill-neutral"
          ><Location width={20} height={20} /></span
        > <span class="pl-4 my-auto">{event.location}</span>
      </p>
    {/if}
    {#if event.online}
      <p class="flex">
        <span class="flex my-auto fill-neutral"
          ><Headset width={20} height={20} /></span
        > <span class="pl-4 my-auto">Online</span>
      </p>
    {/if}
  </div>
  <div class="mt-6">
    <Html source={`<h2>Details</h2>` + event.description} width={"text"} />
  </div>
</div>

<style>
  #info {
    max-width: 800px;
  }
</style>
