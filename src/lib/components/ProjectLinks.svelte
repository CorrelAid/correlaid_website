<script>
  import {t} from '$lib/stores/i18n';

  export let href = void 0;
  export let repo = void 0;
  export let podcast_href = void 0;
  export let post_slug = void 0;
</script>

<div class="flex flex-wrap items-center">
  {#if href}
    <a class="pr-4 text-secondary underline" {href}
      >{$t('misc.read_more').text}</a
    >
  {/if}

  {#if repo}
    <a
      class="pr-4 text-secondary underline"
      target="_blank"
      rel="noreferrer"
      href={repo}>Repo</a
    >
  {/if}
  {#if podcast_href}
    <a
      class="pr-4 text-secondary underline"
      target="_blank"
      rel="noreferrer"
      href={podcast_href}>Podcast</a
    >
  {/if}
  {#if post_slug}
    <a
      class="pr-4 text-secondary underline"
      href={$t('navbar.blog').url + '/' + post_slug}>Blogpost</a
    >
  {/if}
</div>
