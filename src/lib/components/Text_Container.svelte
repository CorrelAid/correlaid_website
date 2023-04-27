<script>
  import Html from '$lib/components/Html.svelte';
  import Box from '$lib/components/Box.svelte';
  import {gen_img_url} from '$lib/js/helpers';
  export let date = '';
  export let title_image = null;
  export let teaser;
  export let title;
  export let content_creators = [];
  export let box_content = '';
</script>

<div class="container mx-auto pt-12 pb-5">
  <div class="mb-2">
    <Html
      source={`<h1>${title}</h1><p class="text-lg">${teaser}</p>`}
      width={'text'}
    />
  </div>
  {#if date != ''}
    <p class="mx-4 my-6 font-light">
      {date} - {#each content_creators as person, i}
        {person.Content_Creators_id.person
          .name}{#if i < content_creators.length - 1}{', '} {/if}{/each}
    </p>
  {/if}
  <slot name="sub_subtitle" />

  {#if title_image != null}
    <div class="offset aspect-w-16 aspect-h-9 mx-4 mb-10">
      <img
        alt="Office"
        src={gen_img_url(
          title_image.id,
          'fit=inside&width=1200&height=675&format=png',
        )}
        class="h-full w-full rounded border-4 border-neutral"
      />
    </div>
  {:else if box_content != ''}
    <div class="text_width px-4">
      <Box>
        <h2 class="text-xl font-semibold">{box_content.name}</h2>
        <p>{box_content.description}</p>
      </Box>
    </div>
  {/if}
</div>
<div class="pb-10">
  <slot name="main" />
</div>
