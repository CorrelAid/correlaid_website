<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {page} from '$app/stores';
  import {t} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Calendar from '$lib/svg/Calendar.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Headset from '$lib/svg/Headset.svelte';
  import SignUp from '$lib/svg/Sign_Up.svelte';
  import Langs from '$lib/components/Langs.svelte';
  import Box from '$lib/components/Box.svelte';

  onMount(() => {
    $pageKey = 'navbar.events';
  });

  $: searchParams = $page.url.searchParams;

  /** @type {import('./$types').PageData} */
  export let data;

  $: event = data.event;
</script>

<TextContainer
  title={event.title}
  teaser={event.teaser}
  overviewHref={$t('navbar.events').url}
  {searchParams}
>
  <div class="mx-4" slot="sub_subtitle">
    {#if event.localChapters.length !== 0}
      <p class="pb-2">
        {#each event.localChapters as lc, i}
          <a
            class="text-medium font-semibold text-base-content transition hover:text-primary"
            href={lc.href}
          >
            CorrelAidX {lc.city}</a
          >{#if i < event.localChapters.length - 1}{', '} {/if}
        {/each}
      </p>
    {/if}
    <Box>
      <p class="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
        <span class="flex">
          <span class="my-auto flex fill-neutral" arria-hidden="true"
            ><Calendar width={19} height={19} /></span
          >
          <span class="sr-only">{$t('access.date').text}</span>
          <span class="y-auto pl-2"
            >{event.date}{event.endDate ? ` - ${event.endDate}` : ''}</span
          >
        </span>
        {#if !event.endDate}
          <span class="flex">
            <span class=" my-auto flex fill-neutral" arria-hidden="true"
              ><Time width={20} height={20} /></span
            >
            <span class="sr-only">{$t('access.time').text}</span>
            <span class="my-auto pl-2">{event.startTime} - {event.endTime}</span
            ></span
          >
        {/if}
        {#if event.location}
          <p class="flex">
            <span class="my-auto flex fill-neutral" arria-hidden="true"
              ><Location width={20} height={20} /></span
            > <span class="sr-only">{$t('access.location').text}</span>
            <span class="my-auto pl-2">{event.location}</span>
          </p>
        {/if}
        {#if event.online}
          <p class="flex">
            <span class="my-auto flex fill-neutral" arria-hidden="true"
              ><Headset width={20} height={20} /></span
            ><span class="sr-only">{$t('access.online').text}</span>
            <span class="my-auto pl-2">Online</span>
          </p>
        {/if}
        {#if event.registrationLink}
          <a
            href={event.registrationLink}
            class="flex text-secondary underline"
            target="_blank"
            rel="noreferrer"
          >
            <span class="my-auto flex fill-neutral" arria-hidden="true"
              ><SignUp width={20} height={20} /></span
            > <span class="sr-only">{$t('access.sign_up').text}</span>
            <span class="my-auto pl-2">{$t('access.registration').text}</span>
          </a>
        {/if}
        <Langs langs={[event.language]} />
      </p>
    </Box>
  </div>

  <div slot="main">
    <Html source={`<h2>Details</h2>` + event.description} options={'mx-auto'} />
  </div>
</TextContainer>
