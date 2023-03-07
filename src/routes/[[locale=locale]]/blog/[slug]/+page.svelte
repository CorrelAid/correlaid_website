<script>
  import Person from "$lib/components/Person.svelte";
  import Html from "$lib/components/Html.svelte";
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key";
  import { gen_date } from "$lib/js/helpers";
  import { locale } from "$lib/stores/i18n";
  import { gen_img_url } from "$lib/js/helpers";
  import _ from "lodash";
  import { get_lang } from '$lib/js/helpers'

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
  $: console.log(content_creators)
</script>

<div class="container mx-auto pt-12 pb-10">
  <div id="header" class="mx-auto pb-6">
    <Html source={`<h1>${lang_content.title}</h1>`} width={"text"} />
    <p class="mx-4 pt-12 text-lg">{lang_content.teaser}</p>

    <p class="mx-4 py-4 font-light">
      {proc_date} - {#each content_creators as person, i}
        {person.Content_Creators_id.person
          .name}{#if i < content_creators.length - 1}{", "} {/if}
      {/each}
    </p>
    <div class="aspect-w-16 aspect-h-9 offset my-8 mx-4">
      {#if lang_content.title_image}
      <img
        alt="Office"
        src={gen_img_url(
          lang_content.title_image.id,
          "fit=inside&width=1200&height=675&format=png"
        )}
        class="h-full w-full rounded border-4 border-neutral "
      />
      {:else}
          <div class="w-full h-full bg-primary"></div>
      {/if}
    </div>
  </div>
  <div class="pb-10">
    <Html
      source={lang_content.text}
      options={"prose-img:"}
      width={"text"}
    />
  </div>
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
</div>

<style>
  #header {
    max-width: 800px;
  }
  .offset::after {
    content: "";
    border-radius: 4px;
    border: 7px solid transparent;
    background: linear-gradient(to left, #3863a2, #96c342) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    top: -12px;
    right: 12px;
    bottom: 12px;
    left: -12px;
    position: absolute;
    z-index: 10;
    opacity: 0.8;
  }
</style>
