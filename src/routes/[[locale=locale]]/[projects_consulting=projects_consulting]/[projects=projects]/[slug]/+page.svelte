<script>
  import { page_key } from "$lib/stores/page_key";
  import { locale } from "$lib/stores/i18n";
  import { onMount } from "svelte";
  import Html from "$lib/components/Html.svelte";
  import TextContainer from "$lib/components/Text_Container.svelte";
  import Links from "$lib/components/Links.svelte";
  import Box from "$lib/components/Box.svelte";

  onMount(() => {
    $page_key = "navbar.projects_consulting.projects";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let project;
  $: project = data.project;
  $:console.log(project.organizations[0].Projects_Organization_id)
</script>

<TextContainer
  title={project.translations[0].title}
  teaser={project.translations[0].summary}
  box_content={project.organizations[0].Projects_Organization_id.translations[0]}
>
  <Html source={project.translations[0].description} width={"text"} />
</TextContainer>
<Box>
      <h3 class="text-xl font-semibold pb-3">CorrelAid Team:</h3>
      {#each project.People as person}
        <div class="flex items-center">
          <span class="mr-2">{person.People_id.name}</span>
          <Links
            website={person.People_id.website
              ? person.People_id.website
              : ""}
            linkedin={person.People_id.linkedin
              ? person.People_id.linkedin
              : ""}
            mastodon={person.People_id.mastodon
              ? person.People_id.mastodon
              : ""}
            twitter={person.People_id.twitter
              ? person.People_id.twitter
              : ""}
            github={person.People_id.github
              ? person.People_id.github
              : ""}
          />
        </div>
      {/each}

 </Box>
