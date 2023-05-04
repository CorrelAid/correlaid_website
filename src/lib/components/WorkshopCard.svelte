<script>
  export let title;
  export let subtitle;
  export let resp_unit = '';
  export let correlaidx_city = '';
  export let href = '';
  export let language = '';
  import {t} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import {gen_lc_href} from '$lib/js/helpers';
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  import ExternalLink from '../svg/External_Link.svelte';

  let href_resp_unit = '';

  $: if (resp_unit == 'correlaid') {
    resp_unit = '';
    href_resp_unit = '';
  } else if (resp_unit == 'correlaidx') {
    resp_unit = `CorrelAidX ${correlaidx_city}`;
    href_resp_unit = gen_lc_href($page.params, correlaidx_city);
  } else if (resp_unit == 'remote_office') {
    resp_unit = 'Remote Office';
    href_resp_unit = $t('navbar.about.team').url;
  }
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <div class="px-3 pt-4 pb-6">
    {#if href != ''}
      {#if href.includes('https://')}
        <a
          {href}
          class="mb-3 inline-flex items-center text-xl font-semibold transition hover:text-primary"
          >{title}<span class="ml-1.5"
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
    {:else}
      <h3
        class="mb-3 block text-xl font-semibold text-base-content transition line-clamp-3"
      >
        {title}
      </h3>
    {/if}
    {#if language != ''}
      <div class="pb-2">
        {#if language == 'de-DE'}
          <De height={25} width={25} />
        {:else if language == 'en-US'}
          <En height={25} width={25} />
        {/if}
      </div>
    {/if}
    <h4 class="text-md line-clamp-3">{subtitle}</h4>
    {#if resp_unit != ''}
      <a
        class="pt-2 font-semibold text-base-content transition line-clamp-3 hover:text-primary"
        href={href_resp_unit}>{resp_unit}</a
      >
    {/if}
  </div>
</div>
