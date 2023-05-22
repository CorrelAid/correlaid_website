<script>
  import {page_key} from '$lib/stores/page_key';
  import {gen_date, gen_time} from '$lib/js/helpers';
  import {t} from '$lib/stores/i18n';
  import {locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Calendar from '$lib/svg/Calendar.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Headset from '$lib/svg/Headset.svelte';
  import SignUp from '$lib/svg/Sign_Up.svelte';
  import Box from '$lib/components/Box.svelte';
  import De from '$lib/svg/DE.svelte';
  import En from '$lib/svg/EN.svelte';
  const icon_h = 22;

  onMount(() => {
    $page_key = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;

  $: event = data;
</script>

<TextContainer title={event.title} teaser={event.teaser}>
  <div class="mx-4" slot="sub_subtitle">
    <Box>
      <p class="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <span class="flex">
          <span
            class="my-auto flex fill-neutral"
            role="img"
            aria-label={$t('access.date').text}
            ><Calendar width={19} height={19} /></span
          >

          <span class="y-auto pl-2">{gen_date(event.date, $locale)}</span>
        </span>
        <span class="flex">
          <span
            class=" my-auto flex fill-neutral"
            role="img"
            aria-label={$t('access.time').text}
            ><Time width={20} height={20} /></span
          ><span class="my-auto pl-2"
            >{gen_time(event.start_time, $locale)} - {gen_time(
              event.end_time,
              $locale,
            )}</span
          ></span
        >
        {#if event.lang == 'de-DE'}
          <span
            class="inline-block rounded-full bg-white shadow-none"
            role="img"
            aria-label="Event ist auf deutsch."
          >
            <De height={icon_h} width={icon_h} />
          </span>
        {:else}
          <span
            class="inline-block rounded-full bg-white shadow-none"
            role="img"
            aria-label="Event is in english."
          >
            <En height={icon_h} width={icon_h} />
          </span>
        {/if}
        {#if event.location}
          <p class="flex">
            <span
              class="my-auto flex fill-neutral"
              role="img"
              aria-label={$t('access.location').text}
              ><Location width={20} height={20} /></span
            > <span class="my-auto pl-2">{event.location}</span>
          </p>
        {/if}
        {#if event.online}
          <p class="flex">
            <span
              class="my-auto flex fill-neutral"
              role="img"
              aria-label={$t('access.online').text}
              ><Headset width={20} height={20} /></span
            > <span class="my-auto pl-2">Online</span>
          </p>
        {/if}
        {#if event.registration_link}
          <a href={event.registration_link} class="flex" target="_blank">
            <span
              class="my-auto flex fill-neutral"
              role="img"
              aria-label={$t('access.sign_up').text}
              ><SignUp width={20} height={20} /></span
            > <span class="my-auto pl-2">{event['root']}</span>
          </a>
        {/if}
      </p>
    </Box>
  </div>

  <div slot="main">
    <Html source={`<h2>Details</h2>` + event.description} options={'mx-auto'} />
  </div>
</TextContainer>
