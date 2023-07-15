<script>
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {page_key} from '$lib/stores/page_key';
  import {locale} from '$lib/stores/i18n';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Person from '$lib/components/Person.svelte';
  import _ from 'lodash';
  import {localeToLang, gen_date} from '$lib/js/helpers';

  onMount(() => {
    $page_key = 'navbar.blog';
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
  $: procDate = gen_date(blogPostPage.pubDate, $locale, true);
</script>

<TextContainer
  title={langContent.title}
  title_image={blogPostPage.post.title_image}
  image_alt={langContent.image_alt}
  teaser={langContent.teaser}
>
  <div slot="sub_subtitle">
    {#if procDate}
      <p class="mx-4 pb-4 text-lg font-light">
        {procDate} - {#each blogPostPage.content_creators as person, i}
          {person.name}
          {person.pronouns ? `(${person.pronouns})` : ''}
          {#if i < blogPostPage.content_creators.length - 1}{', '} {/if}{/each}
      </p>
    {/if}
  </div>
  <Html source={langContent.text} options={'mx-auto'} slot="main" />
</TextContainer>
{#if blogPostPage.content_creators.length != 0}
  <div class="container mx-auto space-y-8 px-4 py-12">
    {#each blogPostPage.content_creators as person}
      <Person {...person} />
    {/each}
  </div>
{/if}
