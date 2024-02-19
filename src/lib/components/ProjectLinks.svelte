<script>
  import {t} from '$lib/stores/i18n';
  import ExternalLink from '../svg/External_Link.svelte';
  export let project_outputs = void 0;

  export let podcast_href = void 0;
  export let post_slug = void 0;
  export let horizontal = true;

  let main_css;
  if (horizontal === true) {
    main_css = 'flex flex-wrap items-center';
  } else {
    main_css = 'flex flex-col';
  }
</script>

<div class={main_css}>
  {#if post_slug}
    <a
      class="pb-1 pr-4 text-secondary underline"
      href={$t('navbar.blog').url + '/' + post_slug}
      >{$t('project_output.blogpost').text}</a
    >
  {/if}
  {#if podcast_href}
    <a
      target="__blank"
      rel="noreferrer"
      href={podcast_href}
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
  {#if project_outputs}
    {#each project_outputs as output}
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
