<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Links from '$lib/components/Links.svelte';
  import Box from '$lib/components/Box.svelte';
  import Podcast from '$lib/svg/Podcast.svelte';
  import Blog from '$lib/svg/Blog.svelte';
  import {t} from '$lib/stores/i18n';

  onMount(() => {
    $page_key = 'navbar.using_data.projects';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let project;
  $: project = data.project;
</script>

<TextContainer
  title={project.translations[0].title}
  teaser={project.translations[0].summary}
  box_content={project.Organizations[0].Organizations_id.translations[0]}
>
  <div slot="sub_subtitle">
    {#if project.Podcast || project.Posts.length != 0}
      <!-- <h3 class="px-4 text-lg pb-2 font-semibold">Links:</h3> -->
      <div class="mb-6 flex items-center py-1">
        {#if project.Podcast.soundcloud_link}
          <a href={project.Podcast.soundcloud_link}
            ><Podcast height={50} width={50} /></a
          >
        {/if}
        {#if project.Posts.length != 0}
          <a
            href={$t('navbar.blog').url +
              '/' +
              project.Posts[0].Posts_id.translations.slug}
            ><Blog height={50} width={30} /></a
          >
        {/if}
      </div>
    {/if}
  </div>
  <Html
    source={project.translations[0].description}
    width={'text'}
    slot="main"
  />
</TextContainer>
<div class="text_width mx-auto pb-12">
  <Box>
    <h3 class="pb-3 text-xl font-semibold">CorrelAid Team:</h3>
    {#each project.People as person}
      <div class="flex items-center">
        <span class="mr-2">{person.People_id.name}</span>
        <Links
          website={person.People_id.website ? person.People_id.website : ''}
          linkedin={person.People_id.linkedin ? person.People_id.linkedin : ''}
          mastodon={person.People_id.mastodon ? person.People_id.mastodon : ''}
          twitter={person.People_id.twitter ? person.People_id.twitter : ''}
          github={person.People_id.github ? person.People_id.github : ''}
        />
      </div>
    {/each}
  </Box>
</div>
