<script>
  import '../app.css';
  import {page} from '$app/stores';
  import {goto} from '$app/navigation';
  import {t, locale} from '$lib/stores/i18n';
  import {page_key} from '$lib/stores/page_key';
  import {header_height} from '$lib/stores/dims';
  import {no_scroll} from '$lib/stores/no_scroll';
  import Header from '$lib/layout/Header.svelte';
  import Person from '$lib/components/Person.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Html from '$lib/components/Html.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import QuoteCarousel from '$lib/components/Quote_Carousel.svelte';
  import Cta from '$lib/components/CTA.svelte';
  import CtaGroup from '$lib/components/CTA_group.svelte';
  import {parse} from '$lib/js/parse_cms.js';
  import LinkButton from '../lib/components/Link_Button.svelte';

  export let data;

  $: if ($page.params.locale) {
    $locale = $page.params.locale;
  } else {
    $locale = 'de';
  }

  // Forwarding the user to the equivalent of the current page in the language selected in the laguage dropdown in the header
  function handleLocaleChange(event) {
    // if the page contains a slug, get the root url and add the slug
    if ($page.params.slug != null) {
      const url = $t($page_key).url + '/' + $page.params.slug;
      goto(url);
    } else {
      const url = $t($page_key).url;
      goto(url);
    }
  }

  function parseContent(rawSections) {
    if (!rawSections) {
      return;
    }

    const parsedContent = [];
    for (const rawSection of rawSections) {
      try {
        const section = {
          collection: rawSection.collection,
          props: parse[rawSection.collection](rawSection),
        };
        if (section.collection === 'heros') {
          section.sort = rawSection.sort;
        }
        if (section.collection === 'contacts') {
          section.item = {hr: rawSection.item.hr};
        }
        if (section.collection === 'wysiwyg') {
          section.sort = rawSection.sort;
        }
        parsedContent.push(section);
      } catch (err) {
        console.log(
          `Error parsing ${rawSection.collection} on page ${$page_key}`,
        );
        console.log(err.message);
        console.log(rawSection);
      }
    }
    return parsedContent;
  }

  // Setting page title by retreiving translations from translations and conditionally taking into account dynamic pages by using the page title attribute from the page data,
  // assigned in the dynamic pages +page.server
  let title;
  let title_content;
  $: title_content =
    $page.data.title != null
      ? `${$t($page_key).text + ' - ' + $page.data.title}`
      : `${$t($page_key).text}`;
  $: title = $page_key === 'navbar.home' ? 'CorrelAid' : title_content;

  let content;
  $: content = parseContent(data.builder);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<!-- Footer on bottom of page if page is too short -->
<div
  class="flex min-h-screen flex-col items-center text-neutral"
  style={$no_scroll ? 'max-height: 100vh; overflow-y:hidden' : ''}
>
  <Header on:changeLanguage={handleLocaleChange} />
  <div class="block xl:hidden" style="min-height: {$header_height}px;" />
  <div id="grow" class="w-screen">
    {#if $header_height}
      {#if content}
        {#each content as section}
          {#if section.collection === 'heros'}
            <div class:mb-12={section.sort !== content.length}>
              <Hero {...section.props} />
            </div>
          {:else if section.collection === 'cta_group'}
            <div class="container mx-auto grid grid-cols-2 gap-8 px-4 pb-10">
              <CtaGroup {...section.props} />
            </div>
          {:else if section.collection === 'ctas'}
            <div class="container mx-auto">
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
                <Html {...section.props} />
              </div>
            </div>
          {:else if section.collection === 'contacts'}
            <div class="container mx-auto mb-12 px-4">
              {#if section.item.hr === true}
                <hr class="mb-12" />
              {/if}
              <Person {...section.props} />
            </div>
          {:else if section.collection === 'carousel'}
            <div class="mb-12">
              <Carousel {...section.props} />
            </div>
          {:else if section.collection === 'quote_carousel'}
            <div class="mb-12">
              <QuoteCarousel {...section.props} />
            </div>
          {:else if section.collection === 'buttons'}
            <div class="text_width mb-12">
              <div class="flex items-center justify-center">
                <LinkButton {...section.props} />
              </div>
            </div>
          {:else if section.collection === 'custom_sections'}
            <div class="container mx-auto mb-12">
              <div class="mx-4">
                <slot />
              </div>
            </div>
          {/if}
        {/each}
        <!-- if collection doesnt contain a custom section, load page anyways (but must be empty in this case) to write page key to store -->
        {#if !content.find((e) => e.collection === 'custom_sections')}
          <slot />
        {/if}
      {:else}
        <!-- not part of pages collection -->

        <slot />
      {/if}
    {/if}
  </div>
  <Footer />
</div>

<style>
  #grow {
    flex: 1 1 auto; /*grow vertically*/
  }
</style>
