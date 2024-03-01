<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {page} from '$app/stores';
  import {genLcHref} from '$lib/js/helpers';
  import {genDate, genTime} from '$lib/js/helpers';
  import {t} from '$lib/stores/i18n';
  import {locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Calendar from '$lib/svg/Calendar.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Headset from '$lib/svg/Headset.svelte';
  import SignUp from '$lib/svg/Sign_Up.svelte';
  import Box from '$lib/components/Box.svelte';
  import De from '$lib/svg/DE.svelte';
  import En from '$lib/svg/EN.svelte';
  const iconSize = 22;

  onMount(() => {
    $pageKey = 'navbar.events';
  });

  /** @type {import('./$types').PageData} */
  export let data;

  $: event = data;
</script>

<TextContainer title={event.title} teaser={event.teaser}>
  <div class="mx-4" slot="sub_subtitle">
    {#if event.localChapters.length !== 0}
      <p class="pb-2">
        {#each event.localChapters as lc, i}
          <a
            class="text-medium font-semibold text-base-content transition hover:text-primary"
            href={genLcHref(
              $page.params,
              lc.Local_Chapters_id.translations[0].city,
            )}
          >
            CorrelAidX {lc.Local_Chapters_id.translations[0].city}</a
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
            >{genDate(event.date, $locale)}{event.endDate
              ? ` - ${genDate(event.endDate, $locale)}`
              : ''}</span
          >
        </span>
        {#if !event.endDate}
          <span class="flex">
            <span class=" my-auto flex fill-neutral" arria-hidden="true"
              ><Time width={20} height={20} /></span
            >
            <span class="sr-only">{$t('access.time').text}</span>
            <span class="my-auto pl-2"
              >{genTime(event.startTime, $locale)} - {genTime(
                event.endTime,
                $locale,
              )}</span
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
        {#if event.registration_link}
          <a
            href={event.registration_link}
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
        {#if event.language == 'de-DE'}
          <span
            class="inline-block rounded-full bg-white shadow-none"
            arria-hidden="true"
          >
            <De height={iconSize} width={iconSize} />
          </span>
          <span class="sr-only">Event ist auf deutsch.</span>
        {:else}
          <span
            class="inline-block rounded-full bg-white shadow-none"
            role="img"
            aria-label="Event is in english."
          >
            <En height={iconSize} width={iconSize} />
          </span>
        {/if}
      </p>
    </Box>
  </div>

  <div slot="main">
    <Html source={`<h2>Details</h2>` + event.description} options={'mx-auto'} />
  </div>
</TextContainer>
