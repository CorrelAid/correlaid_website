<script>
  import Html from "$lib/components/Html.svelte";
  import Box from "$lib/components/Box.svelte";
  import { gen_img_url } from "$lib/js/helpers";
  export let date = "";
  export let title_image = null;
  export let teaser;
  export let title;
  export let content_creators = [];
  export let box_content = ""
  $:console.log(box_content)
</script>

<div class="mx-auto pb-6 text_width">
  <Html source={`<h1>${title}</h1><p class="text-lg">${teaser}</p>`} width={"text"} />
  {#if date != ""}
    <p class="mx-4 py-4 font-light">
      {date} - {#each content_creators as person, i}
        {person.Content_Creators_id.person
          .name}{#if i < content_creators.length - 1}{", "} {/if}
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
  {:else if box_content != ""}
  <Box>
    <h2 class="text-xl font-semibold">{box_content.name}</h2>
    <p>{box_content.description}</p>
  </Box>
  {/if}
</div>
<div class="pb-10">
  <slot />
</div>

