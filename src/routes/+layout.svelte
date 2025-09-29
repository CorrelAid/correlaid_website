<script>
  import {run} from 'svelte/legacy';
  import CorrelLabWide from '$lib/svg/CorrelLabWide.svelte';
  import {DataPresentation} from '$lib/svg/nav_icons';
  import '../app.css';
  import {dev} from '$app/environment';
  import {onMount} from 'svelte';
  import {page} from '$app/stores';
  import {goto} from '$app/navigation';
  import {t, locale} from '$lib/stores/i18n';
  import {pageKey} from '$lib/stores/pageKey';
  import {headerHeight} from '$lib/stores/dims';
  import {noScroll} from '$lib/stores/noScroll';
  import Header from '$lib/layout/Header.svelte';
  import Person from '$lib/components/Person.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Html from '$lib/components/Html.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import QuoteCarousel from '$lib/components/QuoteCarousel.svelte';
  import Cta from '$lib/components/CTA.svelte';
  import CtaGroup from '$lib/components/CtaGroup.svelte';
  import LinkButton from '../lib/components/LinkButton.svelte';
  import Icon from '../lib/components/Icon.svelte';
  import PeopleList from '../lib/components/PeopleList.svelte';

  // TODO: cleanup after launch
  import BannerAnnouncement from '$lib/components/BannerAnnouncement.svelte';
  import AnnouncementBox from '$lib/components/singleUse/AnnouncementBox.svelte';

  const LabLogo = `<svg
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="200 0 1320 460"
        fill="#3c3c3b"
        style="min-width: 68px;"
      >
        <g>
          <path
            d="M827.81,80l-103.66,299.91h63.4l23.47-72.06h109.28l24.24,72.06h63.6l-105.87-299.91h-74.47ZM825.91,262.16l10.56-32.41c5.1-17.04,10.43-36.26,16-57.67,3.8-14.61,7.81-30.39,12.02-47.29,4.38,16.75,8.56,32.4,12.54,46.88,5.84,21.27,11.5,40.63,17.01,58.07l10.9,32.41h-79.03Z"
          />
          <path
            d="M1260.26,259.14c-6.24-10.73-14.29-19.05-24.15-24.96-9.86-5.9-20.3-9.12-31.3-9.66v-2.82c10.06-2.42,19.09-6.37,27.07-11.88,7.98-5.5,14.32-12.61,19.02-21.34,4.7-8.72,7.04-19.05,7.04-31,0-14.9-3.59-28.18-10.77-39.85-7.18-11.67-18.01-20.86-32.51-27.58-14.49-6.71-32.68-10.06-54.55-10.06h-116.94v299.91h123.99c22.81,0,41.8-3.59,56.96-10.77,15.16-7.18,26.53-16.97,34.12-29.39,7.58-12.41,11.37-26.4,11.37-41.97s-3.12-27.91-9.36-38.65ZM1100.74,127.3h52.73c15.16,0,26.74,3.59,34.72,10.77,7.98,7.18,11.98,16.4,11.98,27.68,0,8.45-2.11,15.77-6.34,21.94-4.23,6.17-9.96,10.94-17.21,14.29-7.25,3.36-15.37,5.03-24.35,5.03h-51.53v-79.71ZM1198.06,321.24c-8.52,7.32-22.24,10.97-41.16,10.97h-56.16v-84.94h57.77c10.73,0,19.99,1.98,27.78,5.94,7.78,3.96,13.82,9.36,18.12,16.2,4.29,6.84,6.44,14.63,6.44,23.35,0,11.67-4.26,21.17-12.78,28.48Z"
          />
          <rect x="470" y="80.11" width="57.65" height="299.8" />
          <rect x="550.72" y="287.66" width="57.65" height="92.25" />
          <rect x="631.43" y="230.01" width="57.65" height="149.9" />
        </g>
      </svg>`;

  onMount(async () => {
    if (dev) {
      console.warn('Will not register service worker in dev mode.');
    } else {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', {
          type: dev ? 'module' : 'classic',
        });
      }
    }
  });

  let {data, children} = $props();

  $effect(() => {
    if ($page.params.locale) {
      $locale = $page.params.locale;
    } else {
      $locale = 'de';
    }
  });

  /**
   * Forwarding the user to the equivalent of the current page in the language selected in
   * the laguage dropdown in the header.
   */
  function handleLocaleChange(event) {
    // if the page contains a slug, get the root url and add the slug

    if ($page.params.slug != null) {
      const url = $t($pageKey).url + '/' + $page.params.slug;
      goto(url);
    } else {
      const url = $t($pageKey).url;
      goto(url);
    }
  }
  // Setting page title by retreiving translations from translations and conditionally taking
  // into account dynamic pages by using the page title attribute from the page data,
  // assigned in the dynamic pages +page.server
  let title = $derived(
    $pageKey === 'navbar.home' ? 'CorrelAid - Data4Good' : titleContent,
  );
  let titleContent = $derived(
    $page.data.title != null
      ? `${$t($pageKey).text + ' - ' + $page.data.title}`
      : `${$t($pageKey).text}`,
  );

  let content = $derived(data.content);

  let sectionsWithNonEmptyPropsKey = $derived.by(() => {
    if (content) {
      return content.filter(
        (section) =>
          section.props &&
          section.props.key &&
          section.props.key.trim() !== null,
      );
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={$t('misc.desc').text} />
  {#if !dev}
    <script
      src="/stats/js/script.js"
      data-api="/stats/api/event"
      data-domain="correlaid.org"
    ></script>
  {/if}
</svelte:head>
<!-- Footer on bottom of page if page is too short -->

<div
  lang={$locale}
  class="flex min-h-screen flex-col items-center text-neutral"
  style={$noScroll ? 'max-height: 100vh; overflow-y:hidden' : ''}
>
  <Header on:changeLanguage={handleLocaleChange} />
  {#if $headerHeight}
    <div class="block xl:hidden" style="min-height: {$headerHeight}px;"></div>
    {#if $locale === 'de'}<BannerAnnouncement
        top="{$headerHeight > 63 ? 0 : $headerHeight}px;"
      >
        <a href="https://lab.correlaid.org">{@html LabLogo}</a>
        <div class="flex flex-col gap-1">
          <p>
            <strong
              ><a
                href="https://lab.correlaid.org"
                style="text-decoration: underline;"
                >Neu: Das CorrelLAB ist da!
              </a></strong
            >
          </p>
          <p>
            <a
              href="https://pretix.eu/correlaid/correllab/"
              style="text-decoration: underline;">Registriere</a
            >
            deine NPO jetzt
            <a
              href="https://pretix.eu/correlaid/correllab/"
              style="text-decoration: underline;">für einen Kurs</a
            >.
          </p>
        </div>
      </BannerAnnouncement>{/if}
    <main id="grow" class="w-screen">
      <!-- page.error case is required for the static build which otherwise renders content -->
      {#if content && $page.error == null}
        {#each content as section}
          {#if section.collection === 'heros'}
            <div class={section.sort !== content.length ? 'mb-9 lg:mb-12' : ''}>
              <Hero {...section.props} />
            </div>
          {:else if section.collection === 'ctaGroups'}
            <div class="container mx-auto mb-12 space-y-8 px-4">
              {#if $locale === 'de'}
                <AnnouncementBox>
                  <div class="flex items-center justify-center">
                    <CorrelLabWide />
                  </div>

                  <div>
                    <p>
                      <strong
                        >Neu: Das <a
                          href="https://lab.correlaid.org"
                          style="text-decoration: underline;">CorrelLAB</a
                        > ist da!</strong
                      >
                    </p>
                    <p>
                      Unser neues Kurs- und Praxisprogramm für Non-Profits rund
                      um Daten.
                    </p>
                    <p>
                      <a
                        href="https://lab.correlaid.org"
                        style="text-decoration: underline;">Mehr erfahren</a
                      >
                    </p>
                  </div>
                </AnnouncementBox>
                <AnnouncementBox colors="correlaid">
                  <div class="flex items-center justify-center">
                    <DataPresentation height="73" width="228" fill="black" />
                  </div>
                  <div>
                    <p>
                      <strong>Nur noch bis 9.10.!</strong>
                    </p>
                    <p>
                      Anmeldung für unseren Kurs Daten kommunizieren:
                      Storytelling und Visualisierung entdecken
                    </p>
                    <p>
                      <a
                        href="bildung/daten_kommunizieren/"
                        style="text-decoration: underline;">Mehr erfahren</a
                      >
                    </p>
                  </div>
                </AnnouncementBox>
              {/if}
              <CtaGroup {...section.props} />
            </div>
          {:else if section.collection === 'ctas'}
            <div class="container mx-auto mb-12 px-4">
              <Cta {...section.props} />
            </div>
          {:else if section.collection === 'timelines'}
            <div class="container mx-auto pb-12">
              <Timeline {...section.props} />
            </div>
          {:else if section.collection === 'wysiwyg'}
            <div class="container mx-auto">
              <!-- if first item add top margin -->
              <div class="mb-12" class:mt-10={section.sort === 1}>
                <Html {...section.props} options={'mx-auto'} />
              </div>
            </div>
          {:else if section.collection === 'contacts'}
            <div class="container mx-auto mb-12 mt-8 px-4 md:mt-0">
              <Person {...section.props} />
            </div>
          {:else if section.collection === 'quoteCarousels'}
            <div class="mb-12">
              <QuoteCarousel {...section.props} />
            </div>
          {:else if section.collection === 'buttons'}
            <div class="container mx-auto mb-12">
              <div class="flex items-center justify-center">
                <LinkButton {...section.props} />
              </div>
            </div>
          {:else if section.collection === 'icons'}
            <div class="container mx-auto mb-12 px-4">
              <Icon {...section.props} />
            </div>
          {:else if section.collection === 'customSections'}
            <div class="container mx-auto mb-12">
              {#if section.props.key === 'cs_remote_office_list' && $page.data.remoteOffice}
                <PeopleList people={$page.data.remoteOffice} />
              {:else if section.props.key === 'cs_board_list' && $page.data.board}
                <PeopleList people={$page.data.board} />
              {:else}
                {@render children?.()}
              {/if}
            </div>
          {/if}
        {/each}
        <!-- if collection doesnt contain a custom section, load page anyways (but must be empty
        in this case) to write page key to store -->
        {#if !content.find((e) => e.collection === 'customSections') | (sectionsWithNonEmptyPropsKey.length >= 2)}
          {@render children?.()}
        {/if}
      {:else}
        <!-- not part of pages collection -->
        {@render children?.()}
      {/if}
    </main>
    <Footer />
  {/if}
</div>

<style>
  #grow {
    flex: 1 1 auto; /*grow vertically*/
  }
</style>
