<script>
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key";
  import { gen_date } from "$lib/js/helpers";
  import { locale } from "$lib/stores/i18n";
  import Hero from "$lib/components/Hero.svelte";
  import Html from "$lib/components/Html.svelte";
  import { gen_img_url } from "$lib/js/helpers";

  onMount(() => {
    $page_key = "navbar.community.correlaidx";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  import Person from "$lib/components/Person.svelte";
  let local_chapter;
  $: local_chapter = data.local_chapter;
  $: console.log(local_chapter.local_administrators)
</script>

<div class="relative">
  <div class="w-screen pb-12">
    <Hero
      gradient_only={local_chapter.image ? false : true}
      height={"half"}
      correlaidx={true}
      image={local_chapter.image}
      text={`CorrelAidX ${local_chapter.translations[0].city}`}
    />
  </div>
  <div class="container mx-auto pb-12">
    <Html
      source={local_chapter.translations[0].description}
      options={"prose-img:"}
      width={"text"}
    />
    
  </div>
  {#if local_chapter.local_administrators != 0}
  <hr />
  <div class="pt-12 space-y-8">
    {#each local_chapter.local_administrators as person}
      <Person
        name={person.Local_Administrators_id.person.name}
        img={gen_img_url(
          person.Local_Administrators_id.person.image.id,
          "fit=cover&width=200&height=200&quality=80"
        )}
        position={person.Local_Administrators_id.translations[0].position}
        description={person.Local_Administrators_id.translations[0].description}
        website={person.Local_Administrators_id.person.website
          ? person.Local_Administrators_id.person.website
          : ""}
        linkedin={person.Local_Administrators_id.person.linkedin
          ? person.Local_Administrators_id.person.linkedin
          : ""}
        mastodon={person.Local_Administrators_id.person.mastodon
          ? person.Local_Administrators_id.person.mastodon
          : ""}
        twitter={person.Local_Administrators_id.person.twitter
          ? person.Local_Administrators_id.person.twitter
          : ""}
        github={person.Local_Administrators_id.person.github
          ? person.Local_Administrators_id.person.github
          : ""}
      />
    {/each}
  </div>
{/if}
  <style>
  </style>
</div>
