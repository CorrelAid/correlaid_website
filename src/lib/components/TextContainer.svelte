<script>
  import Html from '$lib/components/Html.svelte';
  import ArrowLeft from '$lib/svg/ArrowLeft.svelte';
  export let titleImage = null;
  export let teaser;
  export let imageAlt = void 0;
  export let title;
  export let overviewHref = void 0;
  import {t} from '$lib/stores/i18n';
</script>

<div class="container mx-auto pb-4 pt-8">
  <div class="">
    {#if overviewHref}
      <a
        href={overviewHref + '?' + searchParams.toString()}
        class="ml-3 block hover:underline"
      >
        <span
          class="mr-1 inline-block whitespace-nowrap align-text-bottom"
          aria-hidden="true"><ArrowLeft width={20} height={20} /></span
        >{$t('misc.back').text}</a
      >
    {/if}
    <Html
      source={`<h1 class="mt-4">${title}</h1><p class="text-md">${teaser}</p>`}
      options={'mx-auto '}
    />
  </div>

  <div class="container mx-auto my-4">
    <slot name="sub_subtitle" />
  </div>
  {#if titleImage != null}
    <div class="container mx-auto">
      <div class=" mx-4 mb-4">
        <figure class="h-full w-full">
          <div class="offset a aspect-h-9 aspect-w-16 relative">
            <img
              alt={imageAlt ? imageAlt : ''}
              src={titleImage}
              title={titleImage.description}
              class="h-full w-full rounded border-4 border-neutral"
            />
          </div>
          {#if titleImage.description}
            <figcaption
              class="container bottom-0 mx-auto rounded-tl pt-2 text-xs md:px-4"
            >
              {titleImage.description}
            </figcaption>
          {/if}
        </figure>
      </div>
    </div>
  {/if}
</div>
<div class="pb-10">
  <slot name="main" />
</div>
