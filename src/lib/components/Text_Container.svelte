<script>
  import Html from "$lib/components/Html.svelte";
  import Person from "$lib/components/Person.svelte";
  import { gen_img_url } from "$lib/js/helpers";
  export let date = "";
  export let people = [];
  export let title_image = null;
  export let teaser;
  export let title;
  export let content_creators = false;
  $:console.log(people)
</script>

<div class="mx-auto pb-6 text_width">
  <Html source={`<h1>${title}</h1>`} width={"text"} />
  <Html source={`<p class="pt-12 text-lg">${teaser}</p>`} width={"text"} />
  {#if date != ""}
    <p class="mx-4 py-4 font-light">
      {date} - {#each people as person, i}
        {person.Content_Creators_id.person
          .name}{#if i < people.length - 1}{", "} {/if}
      {/each}
    </p>
  {/if}

  {#if title_image != null}
    <div class="aspect-w-16 aspect-h-9 offset my-8 mx-4">
      <img
        alt="Office"
        src={gen_img_url(
          title_image.id,
          "fit=inside&width=1200&height=675&format=png"
        )}
        class="h-full w-full rounded border-4 border-neutral "
      />
    </div>
  {/if}
</div>
<div class="pb-10">
  <slot />
</div>
{#if people.length != 0}
  <hr />
  <div class="pt-12 space-y-8">
    {#if content_creators === true}
    {#each people as person}
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
    {:else}
    {#each people as person}
      <Person
        name={person.People_id.name}
        img={person.People_id.image != null ? gen_img_url(
          person.People_id.image.id,
          "fit=cover&width=200&height=200&quality=80"
        ) : null}
        website={person.People_id.website
          ? person.People_id.website
          : ""}
        linkedin={person.People_id.linkedin
          ? person.linkedin
          : ""}
        mastodon={person.People_id.mastodon
          ? person.mastodon
          : ""}
        twitter={person.People_id.twitter
          ? person.People_id.twitter
          : ""}
        github={person.People_id.github
          ? person.People_id.github
          : ""}
      />
    {/each}
    {/if}
  </div>
{/if}
