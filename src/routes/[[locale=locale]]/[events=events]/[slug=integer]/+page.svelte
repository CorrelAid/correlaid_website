<script>
  import { page } from "$app/stores";
  import { page_key } from "$lib/stores/page_key.js";
  import Html from "$lib/components/Html.svelte";
  import { gen_date, gen_time } from "$lib/js/helpers.js";
  import { t, locale } from "$lib/stores/i18n.js";
  import { onMount } from "svelte";
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
  <Html source={`<h1>${event.translations[0].title}</h1>`} width={"text"} />
  <div id="info" class="p-4 border border-neutral-25 rounded mt-8 mx-auto">
    <p class="flex pb-2">
      <span class="flex my-auto fill-neutral"
        ><Calendar width={20} height={20} /></span
      > <span class="pl-4 my-auto">{gen_date(event.date, $locale)}</span>
    </p>
    <p class="flex pb-2">
      <span class="flex my-auto fill-neutral"
        ><Time width={20} height={20} /></span
      >
      <span class="pl-4 my-auto"
        >{gen_time(event.start_time, $locale)} - {gen_time(
          event.end_time,
          $locale
        )} (CET)</span
      >
    </p>
    {#if event.translations[0].location}
      <p class="flex pb-2">
        <span class="flex my-auto fill-neutral"
          ><Location width={20} height={20} /></span
        > <span class="pl-4 my-auto">{event.translations[0].location}</span>
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
    <Html
      source={`<h2>Details</h2>` + event.translations[0].description}
      width={"text"}
    />
  </div>
</div>

<style>
  #info {
    max-width: 800px;
  }
</style>
