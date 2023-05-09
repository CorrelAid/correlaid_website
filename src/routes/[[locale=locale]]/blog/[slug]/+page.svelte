<script>
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {page_key} from '$lib/stores/page_key';
  import {gen_date} from '$lib/js/helpers';
  import {locale} from '$lib/stores/i18n';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Person from '$lib/components/Person.svelte';
  import {parseEntries} from '$lib/js/parse_cms';

  onMount(() => {
    $page_key = 'navbar.blog';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  const post = data.post;
  const pubdate = data.pubdate;
  const lang_content = data.lang_content;
  const content_creators = parseEntries(
    data.content_creators,
    'content_creators',
  );
  const proc_date = gen_date(pubdate, $locale, true);
</script>

<TextContainer
  title={lang_content.title}
  title_image={post.title_image}
  image_alt={lang_content.image_alt}
  teaser={lang_content.teaser}
>
  <div slot="sub_subtitle">
    {#if proc_date}
      <p class="mx-4 pb-4 text-lg font-light">
        {proc_date} - {#each content_creators as person, i}
          {person.name}
          {person.pronouns ? `(${person.pronouns})` : ''}
          {#if i < content_creators.length - 1}{', '} {/if}{/each}
      </p>
    {/if}
  </div>
  <Html
    source={lang_content.text}
    options={'mx-auto'}
    width={'text'}
    slot="main"
  />
</TextContainer>
{#if content_creators.length != 0}
  <div class="container mx-auto space-y-8 px-4 pt-12">
    <hr />
    {#each content_creators as person}
      <Person {...person} />
    {/each}
  </div>
{/if}
