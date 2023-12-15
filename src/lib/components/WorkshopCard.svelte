<script>
  import Langs from '$lib/components/Langs.svelte';
  export let href = '';
  import {t} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
  import ExternalLink from '../svg/External_Link.svelte';

  export let title;
  export let tags;
  export let target_audience;
  export let subtitle;
  export let resp_unit = '';
  export let correlaidx_city = '';
  export let correlaidx_short_id = '';
  export let language = '';

  let href_resp_unit = '';

  $: if (resp_unit == 'correlaid') {
    resp_unit = '';
    href_resp_unit = '';
  } else if (resp_unit == 'correlaidx') {
    resp_unit = `CorrelAidX ${correlaidx_city}`;
    href_resp_unit = gen_lc_href($page.params, correlaidx_short_id);
  } else if (resp_unit == 'remote_office') {
    resp_unit = 'Remote Office';
    href_resp_unit = $t('navbar.about.team').url;
  }
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <Langs langs={[language]} />
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
      {#each target_audience as audience}
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold text-white"
          >{$t(`target_audience.${audience}`).text}</span
        >
      {/each}
      {#each tags as tag}
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
          >{tag}</span
        >
      {/each}
    </div>

    <h4 class="text-md line-clamp-3">{subtitle}</h4>
    {#if resp_unit != ''}
      <a
        class="line-clamp-3 pt-2 font-semibold text-base-content transition hover:text-primary"
        href={href_resp_unit}>{resp_unit}</a
      >
    {/if}
  </div>
</div>
