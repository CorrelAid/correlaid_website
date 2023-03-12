<script>
  
  import Html from "$lib/components/Html.svelte";
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key";
  import { gen_date } from "$lib/js/helpers";
  import { locale } from "$lib/stores/i18n";
  import _ from "lodash";
  import TextContainer from "$lib/components/Text_Container.svelte";
  import Person from "$lib/components/Person.svelte";
  import { gen_img_url } from "$lib/js/helpers";

  onMount(() => {
    $page_key = "navbar.blog";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let pubdate;
  $: pubdate = data.pubdate;
  let lang_content;
  $: lang_content = data.lang_content;
  let content_creators;
  $: content_creators = data.content_creators;
  let proc_date;
  $: proc_date = gen_date(pubdate, $locale, true);
</script>


<TextContainer
  date={proc_date}
  title={lang_content.title}
  people={content_creators}
  title_image={lang_content.title_image}
  teaser={lang_content.teaser}
  content_creators={content_creators}
>
  <Html source={lang_content.text} options={"prose-img:"} width={"text"} slot="main"/>
</TextContainer>
{#if content_creators.length != 0}
  <hr />
  <div class="pt-12 space-y-8">
    {#each content_creators as person}
      <Person
        name={person.Content_Creators_id.person.name}
        img={gen_img_url(
          person.Content_Creators_id.person.image.id,
          "fit=cover&width=200&height=200&quality=80"
        )}
        position={person.Content_Creators_id.translations[0].position}
        description={person.Content_Creators_id.translations[0].description}
        website={person.Content_Creators_id.person.website
          ? person.Content_Creators_id.person.website
          : ""}
        linkedin={person.Content_Creators_id.person.linkedin
          ? person.Content_Creators_id.person.linkedin
          : ""}
        mastodon={person.Content_Creators_id.person.mastodon
          ? person.Content_Creators_id.person.mastodon
          : ""}
        twitter={person.Content_Creators_id.person.twitter
          ? person.Content_Creators_id.person.twitter
          : ""}
        github={person.Content_Creators_id.person.github
          ? person.Content_Creators_id.person.github
          : ""}
      />
    {/each}
  </div>
{/if}
