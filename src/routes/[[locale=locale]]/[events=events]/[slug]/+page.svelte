<script>
  import {page_key} from '$lib/stores/page_key';
  import {gen_date, gen_time} from '$lib/js/helpers';
  import {locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Calendar from '$lib/svg/Calendar.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Headset from '$lib/svg/Headset.svelte';
  import SignUp from '$lib/svg/Sign_Up.svelte';

  onMount(() => {
    $page_key = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let event;
  $: event = data.event;

  let dom;
  $: dom = new URL(event.registration_link);
  let root;
  $: root = dom.hostname.replace('www.', '');
</script>

<TextContainer title={event.title} teaser={event.teaser}>
  <div
    id="info"
    class="mx-auto mt-5 rounded border border-neutral-25 p-4"
    slot="sub_subtitle"
  >
    <p class="flex space-x-4">
      <span class="flex">
        <span class="my-auto flex fill-neutral"
          ><Calendar width={19} height={19} /></span
        >

        <span class="y-auto pl-2">{gen_date(event.date, $locale)}</span>
      </span>
      <span class="flex">
        <span class=" my-auto flex fill-neutral"
          ><Time width={20} height={20} /></span
        ><span class="my-auto pl-2"
          >{gen_time(event.start_time, $locale)} - {gen_time(
            event.end_time,
            $locale,
          )}</span
        ></span
      >

      {#if event.location}
        <p class="flex">
          <span class="my-auto flex fill-neutral"
            ><Location width={20} height={20} /></span
          > <span class="my-auto pl-2">{event.location}</span>
        </p>
      {/if}
      {#if event.online}
        <p class="flex">
          <span class="my-auto flex fill-neutral"
            ><Headset width={20} height={20} /></span
          > <span class="my-auto pl-2">Online</span>
        </p>
      {/if}
      {#if event.registration_link}
        <a href={event.registration_link} class="flex">
          <span class="my-auto flex fill-neutral"
            ><SignUp width={20} height={20} /></span
          > <span class="my-auto pl-2">{root}</span>
        </a>
      {/if}
    </p>
  </div>
  <div slot="main">
    <Html source={`<h2>Details</h2>` + event.description} width={'text'} />
  </div>
</TextContainer>

<style>
  #info {
    max-width: 800px;
  }
</style>
