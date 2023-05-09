<script>
  import Html from '$lib/components/Html.svelte';
  import {gen_img_url} from '$lib/js/helpers';
  export let title_image = null;
  export let teaser;
  export let image_alt;
  export let title;
</script>

<div class="container mx-auto pt-12 pb-4">
  <div class="">
    <Html
      source={`<h1>${title}</h1><p class="text-md">${teaser}</p>`}
      options={'mx-auto'}
    />
  </div>

  <div class="text_width mx-auto my-4">
    <slot name="sub_subtitle" />
  </div>
  {#if title_image != null}
    <div class="container mx-auto">
      <div class="offset relative mx-4 mb-6">
        <img
          alt={image_alt}
          src={gen_img_url(
            title_image.id,
            'fit=inside&width=1200&height=675&format=png',
          )}
          class="h-full w-full rounded border-4 border-neutral"
        />
      </div>
    </div>
  {/if}
</div>
<div class="pb-10">
  <slot name="main" />
</div>
