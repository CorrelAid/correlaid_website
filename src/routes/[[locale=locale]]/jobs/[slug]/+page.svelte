<script>
  import {t} from '$lib/stores/i18n';
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {pageKey} from '$lib/stores/pageKey';
  import Tag from '$lib/components/Tag.svelte';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Box from '$lib/components/Box.svelte';
  import De from '$lib/svg/DE.svelte';
  import En from '$lib/svg/EN.svelte';
  import Time from '$lib/svg/Time.svelte';
  import Location from '$lib/svg/Location.svelte';
  import Salary from '$lib/svg/Salary.svelte';

  onMount(() => {
    $pageKey = 'navbar.jobs';
  });

  let {data} = $props();
  let job = $derived(data.job);
  const iconSize = 22;

  const listStyle = 'min-w-min mr-4 mb-2';

  let cardDetails = $derived({
    workload: job.fte,
    location: job.location,
    salary: job.salary,
    language: job.language,
  });
</script>

{#snippet sub_subtitle()}
  <div class="mx-4">
    <Box>
      {#if job.tags}
        <div class="mb-4">
          <Tag text={job.jobType} color="bg-primary" />
          {#each job.tags as tag}
            <Tag text={tag} color="bg-secondary" />
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
              {#if job.language == 'german'}
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
        <strong>{$t('access.deadline').text}:</strong>
        {job.procDeadline}
      </p>
    </Box>
  </div>
{/snippet}
{#snippet main()}
  <Html
    source={job.description}
    options={'mx-auto prose-li:my-1 prose-ul:my-1'}
  />
{/snippet}
<TextContainer title={job.title} teaser={job.summary} {sub_subtitle} {main} />
