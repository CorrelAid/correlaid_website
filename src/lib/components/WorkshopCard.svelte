<script>
  import detectElementOverflow from 'detect-element-overflow';
  import Langs from '$lib/components/Langs.svelte';
  export let href = '';
  import {t} from '$lib/stores/i18n';
  import ExternalLink from '../svg/External_Link.svelte';
  import ArrowUp from '../svg/nav_icons/ArrowUp.svelte';
  import ArrowDown from '../svg/nav_icons/ArrowDown.svelte';

  export let title;
  export let tags;
  export let targetAudiences;
  export let teaser;
  export let procRespUnits;
  export let language = '';

  let overflowParent;
  let overflowChild;
  let parentHeight;

  let overflowing = false;
  let expand = false;

  // if parentHeight is set, detect overflow
  $: if (parentHeight) {
    if (overflowParent && overflowChild) {
      const overflow = detectElementOverflow(overflowChild, overflowParent);
      //
      if (overflow.overflowBottom > 0) {
        overflowing = true;
      }
    }
  }

  function expandFunc() {
    expand = !expand;
  }
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <div class="absolute right-0 top-0 z-20 p-2">
    <Langs langs={[language]} />
  </div>

  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <div class="px-3 pb-6 pt-4">
    {#if href != ''}
      <div class="mb-3 mr-10">
        {#if href.includes('https://')}
          <a
            target="__blank"
            rel="noreferrer"
            {href}
            class="mb-3 text-xl font-semibold transition hover:text-primary"
          >
            <span class="mr-1">
              {title}
            </span>

            <span class="inline-block align-text-top" aria-label="External Link"
              ><ExternalLink
                height={20}
                width={20}
                color={'rgb(60, 60, 59)'}
              /></span
            >
          </a>
        {:else}
          <a
            class="mb-3 block text-xl font-semibold text-base-content transition hover:text-primary"
            {href}>{title}</a
          >
        {/if}
      </div>
    {:else}
      <h3
        class="mb-3 line-clamp-3 block text-xl font-semibold text-base-content transition"
      >
        {title}
      </h3>
    {/if}
    <div class="mb-2">
      {#each targetAudiences as audience}
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold text-white"
          >{$t(`targetAudience.${audience}`).text}</span
        >
      {/each}
      {#each tags as tag}
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
          >{tag}</span
        >
      {/each}
    </div>
    {#each procRespUnits as respUnit}
      <a
        class="font-semibold text-base-content transition hover:text-primary"
        href={respUnit.href}>{respUnit.name}</a
      >
    {/each}

    <div
      class="mt-2 {overflowing === true ? 'mb-8' : 'mb-1'} {expand === true
        ? ''
        : 'max-h-32 lg:max-h-20'} "
      bind:this={overflowParent}
      bind:clientHeight={parentHeight}
    >
      <p
        class="text-md {overflowing === true && expand === false
          ? 'line-clamp-5 lg:line-clamp-3'
          : ''}"
        bind:this={overflowChild}
      >
        {teaser}
      </p>
    </div>
  </div>
  {#if overflowing === true}
    <button
      class="absolute bottom-0 right-0 right-2/4 pb-4"
      on:click={expandFunc}
    >
      <span class="sr-only">{$t('misc.read_more').text}</span>
      <span class="fill-neutral-50" aria-hidden="true">
        {#if expand === true}
          <ArrowUp height={34} width={34} />
        {:else}
          <ArrowDown height={34} width={34} />
        {/if}
      </span>
    </button>
  {/if}
</div>
