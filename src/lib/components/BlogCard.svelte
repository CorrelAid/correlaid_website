<script>
  import Html from '$lib/components/Html.svelte';
  import Langs from '$lib/components/Langs.svelte';
  import ExternalLink from '../svg/External_Link.svelte';

  let {
    imageAlt,
    langs,
    title,
    teaser,
    contentCreators,
    pubDate,
    imageSrc = void 0,
    href,
    external = false,
    imageDesc = void 0,
  } = $props();
</script>

<article
  class="relative grid-cols-2 rounded border-l border-r border-t border-neutral-25 shadow-sm md:grid"
>
  <span
    class="absolute inset-x-0 bottom-0 z-10 h-2 rounded-b bg-gradient-to-r from-primary to-secondary opacity-75"
  ></span>
  <div class="absolute right-0 top-0 z-20 p-2">
    <Langs {langs} />
  </div>
  <div class="flex">
    <a class="relative mx-auto w-full" {href} style="padding-bottom: 56.25%;">
      {#if typeof imageSrc !== 'undefined'}
        <img
          class="absolute left-0 top-0 z-0 h-full w-full rounded-tl"
          alt={imageAlt}
          src={imageSrc}
          title={imageDesc}
        />
      {:else}
        <!-- TODO: Do we need this image placeholder? -->
        <div class="rounded-tl bg-gray-300"></div>
      {/if}
    </a>
  </div>
  <div class="">
    <div class="px-4 pb-4 pt-3 md:p-4 md:pt-2">
      <h3 class="line-clamp-2 md:pr-7">
        {#if external === false}
          <a
            {href}
            class="text-lg font-semibold leading-snug text-base-content transition hover:text-primary"
          >
            {title}
          </a>
        {:else}
          <a
            {href}
            target="_blank"
            rel="noreferrer"
            class="text-lg font-semibold leading-snug text-base-content transition hover:text-primary"
          >
            <span class="mr-1">
              {title}
            </span>

            <span class="inline-block align-text-top"
              ><ExternalLink
                height={20}
                width={20}
                color={'rgb(60, 60, 59)'}
              /></span
            >
          </a>
        {/if}
      </h3>
      <p class="line-clamp-1 pt-1.5 text-sm">
        {pubDate} - {#each contentCreators as person, i}
          {person.name}{#if i < contentCreators.length - 1}{', '}
          {/if}
        {/each}
      </p>

      <div class="pb-1 pt-1.5">
        <Html
          source={teaser}
          options={'mx-0 !px-0 line-clamp-3 overflow-hidden text-base-content leading-normal'}
        />
      </div>
    </div>
  </div>
</article>
