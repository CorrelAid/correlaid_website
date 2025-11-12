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
              {#if $locale === 'de' && $pageKey == 'navbar.home'}
                <AnnouncementBox>
                  <div class="flex items-center justify-center">
                    <CorrelLabWide />
                  </div>

                  <div>
                    <p>
                      <strong
                        >Registriere deine NPO für die zweite Runde des <a
                          href="https://lab.correlaid.org"
                          style="text-decoration: underline;">CorrelLAB</a
                        >!</strong
                      >
                    </p>
                    <p>
                      Unser Kurs- und Praxisprogramm für Non-Profits rund um
                      Daten startet wieder am 06.02.
                    </p>
                    <p>
                      <a
                        href="https://lab.correlaid.org"
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
              {:else if section.props.key === 'correlheart'}
                <div>
                  <img
                    class="m-auto"
                    src="https://cms.correlaid.org/assets/c9558cfe-5d71-42d6-9fc9-93e70daa1849.png?width=200&height=200&format=webp"
                    alt="test"
                  />
                </div>
              {:else}
                {@render children?.()}
              {/if}
            </div>
          {/if}
        {/each}
        <!-- if collection doesnt contain a custom section, load page anyways (but must be empty
        in this case) to write page key to store -->
        {#if !content.find((e) => e.collection === 'customSections')}
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
