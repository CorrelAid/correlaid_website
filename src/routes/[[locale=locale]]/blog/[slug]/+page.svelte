<script>
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {pageKey} from '$lib/stores/pageKey';
  import {locale} from '$lib/stores/i18n';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Person from '$lib/components/Person.svelte';
  import _ from 'lodash';
  import {localeToLang, genDate} from '$lib/js/helpers';

  onMount(() => {
    $pageKey = 'navbar.blog';
  });

  function getLanguageContent(contentAllLanguages, locale) {
    let langContent = _.find(
      contentAllLanguages,
      (el) => el.languages_code.code === localeToLang(locale),
    );

    if (typeof langContent === 'undefined') {
      langContent = contentAllLanguages[0];
    }
    return langContent;
  }

  /** @type {import('./$types').PageData} */
  export let data;
  $: blogPostPage = data;
  $: langContent = getLanguageContent(
    blogPostPage.contentAllLanguages,
    $locale,
  );
  $: procDate = genDate(blogPostPage.pubDate, $locale, true);
</script>

<TextContainer
  title={langContent.title}
  titleImage={blogPostPage.titleImage}
  imageAlt={langContent.imageAlt}
  teaser={langContent.teaser}
>
  <div slot="sub_subtitle">
    {#if procDate}
      <p class="mx-4 pb-4 text-lg font-light">
        {procDate} - {#each blogPostPage.contentCreators as person, i}
          {person.name}
          {person.pronouns ? `(${person.pronouns})` : ''}
          {#if i < blogPostPage.contentCreators.length - 1}{', '} {/if}{/each}
      </p>
    {/if}
  </div>
  <Html source={langContent.text} options={'mx-auto'} slot="main" />
</TextContainer>
{#if blogPostPage.contentCreators.length != 0}
  <div class="container mx-auto space-y-8 px-4 py-12">
    {#each blogPostPage.contentCreators as person}
      <Person {...person} />
    {/each}
  </div>
{/if}
