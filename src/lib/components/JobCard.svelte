<script>
  import {t} from '$lib/stores/i18n';
  export let title;
  export let href;
  export let summary;
  export let fte;
  export let jobType;
  export let language;
  export let procDeadline;
  export let location;
  export let salary;
  export let tags = [];
  import De from '$lib/svg/DE.svelte';
  import En from '$lib/svg/EN.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Salary from '$lib/svg/Salary.svelte';
  import Tag from './Tag.svelte';

  const iconSize = 22;

  const listStyle = 'min-w-min mr-4 mb-2';

  let cardDetails = {};

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
        <Tag text={jobType} color="bg-primary" />
        {#each tags as tag}
          <Tag text={tag} color="bg-secondary" />
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
              {#if language == 'german'}
                <span
                  class="inline-block rounded-full bg-white shadow-none"
                  arria-hidden="true"
                >
                  <De height={iconSize} width={iconSize} />
                </span>
                <span class="sr-only">Event ist auf deutsch.</span>
              {:else}
                <span
                  class="inline-block rounded-full bg-white shadow-none"
                  role="img"
                  aria-label="Event is in english."
                >
                  <En height={iconSize} width={iconSize} />
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
        <strong>{$t('access.deadline').text}: </strong>{procDeadline}
      </p>
    </div>
  </div>
</div>
