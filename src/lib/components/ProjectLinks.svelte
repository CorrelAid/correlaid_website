<script>
  import {t} from '$lib/stores/i18n';
  import ExternalLink from '../svg/External_Link.svelte';
  export let projectOutputs;
  export let horizontal = true;

  let mainCss;
  if (horizontal === true) {
    mainCss = 'flex flex-wrap items-center';
  } else {
    mainCss = 'flex flex-col';
  }
</script>

<div class={mainCss}>
  {#each projectOutputs as output}
    {#if output.outputType === 'blogPost'}
      <a class="pb-1 pr-4 text-secondary underline" href={output['url']}
        >{$t('project_output.blogpost').text}</a
      >
    {:else if output.outputType === 'podcastEpisode'}
      <a
        target="__blank"
        rel="noreferrer"
        href={output.url}
        class="pb-1 pr-4 capitalize text-secondary"
      >
        <span class="underline">
          {$t('project_output.podcast').text}
        </span>
        <span class="inline-block align-text-top" aria-label="External Link"
          ><ExternalLink height={17} width={17} color={'#3863a2'} /></span
        >
      </a>
    {:else}
      <a
        target="__blank"
        rel="noreferrer"
        href={output['url']}
        class="pb-1 pr-4 capitalize text-secondary"
      >
        <span class="underline"
          >{$t(`project_output.${output['outputType']}`).text}{output[
            'outputNumber'
          ] > 0
            ? ` ${output['outputNumber']}`
            : ''}
        </span>
        <span class="inline-block align-text-top" aria-label="External Link"
          ><ExternalLink height={17} width={17} color={'#3863a2'} /></span
        >
      </a>
    {/if}
  {/each}
</div>
