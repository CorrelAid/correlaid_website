<script>
  import {t} from '$lib/stores/i18n';
  import ExternalLink from '../svg/External_Link.svelte';
  export let projectOutputs = void 0;

  export let podcastHref = void 0;
  export let postSlug = void 0;
  export let horizontal = true;

  let mainCss;
  if (horizontal === true) {
    mainCss = 'flex flex-wrap items-center';
  } else {
    mainCss = 'flex flex-col';
  }
</script>

<div class={mainCss}>
  {#if postSlug}
    <a
      class="pb-1 pr-4 text-secondary underline"
      href={$t('navbar.blog').url + '/' + postSlug}
      >{$t('project_output.blogpost').text}</a
    >
  {/if}
  {#if podcastHref}
    <a
      target="__blank"
      rel="noreferrer"
      href={podcastHref}
      class="pb-1 pr-4 capitalize text-secondary"
    >
      <span class="underline">
        {$t('project_output.podcast').text}
      </span>
      <span class="inline-block align-text-top" aria-label="External Link"
        ><ExternalLink height={17} width={17} color={'#3863a2'} /></span
      >
    </a>
  {/if}
  {#if projectOutputs}
    {#each projectOutputs as output}
      <a
        target="__blank"
        rel="noreferrer"
        href={output['url']}
        class="pb-1 pr-4 capitalize text-secondary"
      >
        <span class="underline"
          >{$t(`project_output.${output['output_type']}`).text}{output[
            'output_number'
          ]
            ? ` ${output['output_number']}`
            : ''}
        </span>
        <span class="inline-block align-text-top" aria-label="External Link"
          ><ExternalLink height={17} width={17} color={'#3863a2'} /></span
        >
      </a>
    {/each}
  {/if}
</div>
