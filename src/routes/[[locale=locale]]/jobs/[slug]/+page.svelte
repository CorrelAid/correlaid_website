<script>
  import Html from '$lib/components/Html.svelte';
  import {locale} from '$lib/stores/i18n';
  import {onMount} from 'svelte';
  import {page_key} from '$lib/stores/page_key';
  import TextContainer from '$lib/components/Text_Container.svelte';
  import Box from '$lib/components/Box.svelte';
  import {toLocalDateString, convertContractType} from '$lib/js/helpers';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $page_key = 'navbar.jobs';
  });

  const listStyle = 'min-w-min mr-4 mb-2';
  const emojis = {
    '1oclock': '&#x1F550;',
    'money-bag': '&#x1F4B0;',
    'location-pin': '&#x1F4CD;',
    'speaking-head': '&#x1F5E3;',
  };

  let jobSummaryBoxContent;
  export let data;

  $: job = data;
  $: {
    jobSummaryBoxContent = {};
    if ($locale === 'de') {
      jobSummaryBoxContent['Bewerbungsschluss: '] = toLocalDateString(
        job.deadline,
        $locale,
        true,
      );
      jobSummaryBoxContent['Art: '] = convertContractType(job.type, $locale);
    } else {
      jobSummaryBoxContent['Application Deadline: '] = toLocalDateString(
        job.deadline,
        $locale,
        true,
      );
      jobSummaryBoxContent['Type: '] = convertContractType(job.type, $locale);
    }
    jobSummaryBoxContent[emojis['1oclock']] = job.FTE;
    jobSummaryBoxContent[emojis['location-pin']] = job.location;
    jobSummaryBoxContent[emojis['money-bag']] = job.salary;
    jobSummaryBoxContent[emojis['speaking-head']] = job.language;
  }
</script>

<TextContainer title={job.title} teaser={job.summary}>
  <div class="mx-4" slot="sub_subtitle">
    <Box slot="sub_subtitle">
      {#if job.tags}
        <div class="mb-4">
          {#each job.tags as tag}
            <span
              class="mr-2 line-clamp-1 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
              >{tag}</span
            >
          {/each}
        </div>
      {/if}
      <ul class="flex flex-wrap">
        {#each Object.keys(jobSummaryBoxContent) as key}
          <li class={listStyle}>
            <strong>{@html key}</strong>
            {jobSummaryBoxContent[key]}
          </li>
        {/each}
      </ul>
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
