<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Links from '$lib/components/Links.svelte';
  import Box from '$lib/components/Box.svelte';
  import ProjectLinks from '$lib/components/ProjectLinks.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data.projects';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: project = data.project;
</script>

<TextContainer
  title={project.translations[0].title}
  teaser={project.translations[0].summary}
>
  <div class="mx-4" slot="sub_subtitle">
    <div class="mb-5">
      <ProjectLinks
        repo={project.Projects_Outputs.length != 0
          ? project.Projects_Outputs[0].url
          : null}
        podcast_href={project.Podcast ? project.Podcast.soundcloud_link : null}
        post_slug={project.Posts.length != 0
          ? project.Posts[0].translations.slug
          : null}
      />
    </div>
    <Box>
      <h2 class="text-xl font-semibold">
        {project.Organizations[0].Organizations_id.translations[0].name}
      </h2>
      <p>
        {project.Organizations[0].Organizations_id.translations[0].description}
      </p>
    </Box>
  </div>

  <Html
    source={project.translations[0].description}
    options={'mx-auto'}
    slot="main"
  />
</TextContainer>
<div class="text_width mx-auto pb-12">
  <div class="px-4">
    <Box>
      <h3 class="pb-3 text-xl font-semibold">CorrelAid Team:</h3>
      {#each project.People as person}
        <div class="flex items-center">
          <span class="mr-2"
            >{person.People_id.name}
            {person.People_id.translations[0]
              ? person.People_id.translations[0].pronouns
                ? `(${person.People_id.translations[0].pronouns})`
                : ''
              : ''}</span
          >
          <Links
            name={person.People_id.name}
            website={person.People_id.website ? person.People_id.website : ''}
            linkedin={person.People_id.linkedin
              ? person.People_id.linkedin
              : ''}
            mastodon={person.People_id.mastodon
              ? person.People_id.mastodon
              : ''}
            twitter={person.People_id.twitter ? person.People_id.twitter : ''}
            github={person.People_id.github ? person.People_id.github : ''}
          />
        </div>
      {/each}
    </Box>
  </div>
</div>
