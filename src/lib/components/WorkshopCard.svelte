<script>
  import detectElementOverflow from 'detect-element-overflow';
  import Langs from '$lib/components/Langs.svelte';
  import {t} from '$lib/stores/i18n';
  import ExternalLink from '../svg/External_Link.svelte';
  import Tag from './Tag.svelte';
  import ArrowUp from '../svg/nav_icons/ArrowUp.svelte';
  import ArrowDown from '../svg/nav_icons/ArrowDown.svelte';

  let {
    href = '',
    title,
    tags,
    targetAudiences,
    teaser,
    procRespUnits,
    language = '',
  } = $props();

  let overflowParent = $state();
  let overflowChild = $state();
  let parentHeight = $state();

  let expand = $state(false);

  let overflowing = $state(false);

  $effect(() => {
    if (parentHeight) {
      if (overflowParent && overflowChild) {
        const overflow = detectElementOverflow(overflowChild, overflowParent);
        //
        if (overflow.overflowBottom > 0) {
          overflowing = true;
        }
      }
    }
  });

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
  ></span>
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
        <Tag text={$t(`targetAudience.${audience}`).text} color="bg-primary" />
      {/each}
      {#each tags as tag}
        <Tag text={tag} color="bg-secondary" />
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
      onclick={expandFunc}
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
