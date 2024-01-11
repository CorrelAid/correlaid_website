<script>
  import {t, locale} from '$lib/stores/i18n';
  import {toLocalDateString, convertContractType} from '$lib/js/helpers';
  export let title;
  export let slug;
  export let summary;
  export let fte;
  export let type;
  export let language;
  export let deadline;
  export let location;
  export let salary;
  export let tags = [];
  import De from '$lib/svg/DE.svelte';
  import En from '$lib/svg/EN.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Salary from '$lib/svg/Salary.svelte';
  export let href = '';

  const icon_h = 22;

  const listStyle = 'min-w-min mr-4 mb-2';

  let cardDetails = {};

  $: if (typeof slug !== 'undefined') {
    href = $t('navbar.jobs').url + '/' + slug;
  }

  $: {
    cardDetails = {};
    cardDetails['workload'] = fte;
    cardDetails['location'] = location;
    cardDetails['salary'] = salary;
    cardDetails['language_'] = language;
  }
</script>

<div class="offset-right relative w-full" style="">
  <div
    class="z-1 relative top-0 grid h-full w-full grid-cols-4 rounded border border-neutral-25 bg-white p-4"
  >
    <div class="col-span-full">
      <div class="pb-2">
        <a
          {href}
          class="text-xl font-semibold text-base-content transition hover:text-primary"
        >
          {title}
        </a>
      </div>
      <div class="mb-2">
        <span
          class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold text-white"
          >{convertContractType(type, $locale)}</span
        >
        {#each tags as tag}
          <span
            class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
            >{tag}</span
          >
        {/each}
      </div>

      <ul class="mb-2 flex flex-wrap">
        {#each Object.keys(cardDetails) as key}
          <li class={listStyle}>
            {#if key == 'workload'}
              <span class="flex">
                <span class=" my-auto flex fill-neutral" arria-hidden="true"
                  ><Time width={20} height={20} /></span
                >
                <span class="sr-only">{$t('access.time').text}</span>
                <span class="my-auto pl-2">{cardDetails[key]}</span></span
              >
            {:else if key == 'location'}
              <span class="flex">
                <span class=" my-auto flex fill-neutral" arria-hidden="true"
                  ><Location width={20} height={20} /></span
                >
                <span class="sr-only">{$t('access.location').text}</span>
                <span class="my-auto pl-2">{cardDetails[key]}</span></span
              >
            {:else if key == 'salary'}
              <span class="flex">
                <span class=" my-auto flex fill-neutral" arria-hidden="true"
                  ><Salary width={20} height={20} /></span
                >
                <span class="sr-only">{$t('access.location').text}</span>
                <span class="my-auto pl-2">{cardDetails[key]}</span></span
              >
            {:else if key == 'language_'}
              {#if language == 'German'}
                <span
                  class="inline-block rounded-full bg-white shadow-none"
                  arria-hidden="true"
                >
                  <De height={icon_h} width={icon_h} />
                </span>
                <span class="sr-only">Event ist auf deutsch.</span>
              {:else}
                <span
                  class="inline-block rounded-full bg-white shadow-none"
                  role="img"
                  aria-label="Event is in english."
                >
                  <En height={icon_h} width={icon_h} />
                </span>
              {/if}
            {:else}
              <strong>{@html key}</strong> {cardDetails[key]}
            {/if}
          </li>
        {/each}
      </ul>

      <p class="text-md mb-3 line-clamp-3 text-base-content xl:pb-0 xl:pr-4">
        {summary}
      </p>
      <p class="text-semibold">
        <strong>{$t('access.deadline').text}: </strong>{toLocalDateString(
          deadline,
          $locale,
          true,
        )}
      </p>
    </div>
  </div>
</div>
