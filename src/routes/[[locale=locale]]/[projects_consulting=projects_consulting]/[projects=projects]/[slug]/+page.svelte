<script>
  import { page_key } from "$lib/stores/page_key";
  import { locale } from "$lib/stores/i18n";
  import { onMount } from "svelte";
  import Html from "$lib/components/Html.svelte";
  import TextContainer from "$lib/components/Text_Container.svelte";

  onMount(() => {
    $page_key = "navbar.projects_consulting.projects";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let project;
  $: project = data.project;
</script>

<TextContainer
  title={project.translations[0].title}
  teaser={project.translations[0].summary}
  people={project.People}
>
  <Html source={project.translations[0].description} width={"text"} />
</TextContainer>
