<script>
  import {t, locale} from '$lib/stores/i18n';
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {pageKey} from '$lib/stores/pageKey';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Box from '$lib/components/Box.svelte';
  import {toLocalDateString, convertContractType} from '$lib/js/helpers';
  import De from '$lib/svg/DE.svelte';
  import En from '$lib/svg/EN.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Salary from '$lib/svg/Salary.svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $pageKey = 'navbar.jobs';
  });

  export let data;

  $: job = data;

  const iconSize = 22;

  const listStyle = 'min-w-min mr-4 mb-2';

  let cardDetails = {};

  $: if (typeof slug !== 'undefined') {
    href = $t('navbar.jobs').url + '/' + slug;
  }

  $: {
    cardDetails = {};
    cardDetails['workload'] = job.FTE;
    cardDetails['location'] = job.location;
    cardDetails['salary'] = job.salary;
    cardDetails['language_'] = job.language;
  }
</script>

<TextContainer title={job.title} teaser={job.summary}>
  <div class="mx-4" slot="sub_subtitle">
    <Box slot="sub_subtitle">
      {#if job.tags}
        <div class="mb-4">
          <span
            class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-primary px-3 py-1 text-xs font-bold text-white"
            >{convertContractType(job.type, $locale)}</span
          >
          {#each job.tags as tag}
            <span
              class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
              >{tag}</span
            >
          {/each}
        </div>
      {/if}
      <ul class="flex flex-wrap">
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
              {#if job.language == 'German'}
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
      <p class="text-semibold">
        <strong>{$t('access.deadline').text}: </strong>{toLocalDateString(
          job.deadline,
          $locale,
          true,
        )}
      </p>
    </Box>
  </div>
  <Html
    source={job.description}
    options={'mx-auto prose-li:my-1 prose-ul:my-1'}
    slot="main"
  />
</TextContainer>

<div class="container mx-auto">
  {#if job.colleagues.length !== 0}
    <div class="mx-4 mb-12">
      <h2 class="text-3xl font-bold text-base-content">Colleagues</h2>
    </div>
    <div class="flex flex-col gap-y-8 px-4 pb-12">
      {#each job.colleagues as person}
        <Person {...person} />
      {/each}
    </div>
  {/if}
</div>
