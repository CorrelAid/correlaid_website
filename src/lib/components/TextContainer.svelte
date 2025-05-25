<script>
  import Html from '$lib/components/Html.svelte';

  let {
    titleImage = null,
    teaser,
    imageAlt = void 0,
    imageDesc = void 0,
    title,
    sub_subtitle,
    main,
  } = $props();
</script>

<div class="container mx-auto pb-4 pt-8">
  <div class="">
    <Html
      source={`<h1 class="mt-4">${title}</h1><p class="text-md">${teaser}</p>`}
      options={'mx-auto '}
    />
  </div>

  <div class="container mx-auto my-4">
    {@render sub_subtitle()}
  </div>
  {#if titleImage != null}
    <div class="container mx-auto">
      <div class=" mx-4 mb-4">
        <figure class="h-full w-full">
          <div class="offset a aspect-h-9 aspect-w-16 relative">
            <img
              alt={imageAlt ? imageAlt : ''}
              src={titleImage}
              class="h-full w-full rounded border-4 border-neutral"
            />
          </div>
          {#if imageDesc}
            <figcaption
              class="container bottom-0 mx-auto rounded-tl pt-2 text-xs md:px-4"
            >
              {imageDesc}
            </figcaption>
          {/if}
        </figure>
      </div>
    </div>
  {/if}
</div>
<div class="pb-10">
  {@render main()}
</div>
