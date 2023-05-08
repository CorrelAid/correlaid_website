<script>
  export let href;
  export let repo;
  export let podcast_href;
  export let post_slug;
  import {t} from '$lib/stores/i18n';
</script>

<div class="flex flex-wrap items-center">
  {#if href}
    <a class="pr-4 text-secondary hover:underline" {href}
      >{$t('misc.read_more').text}</a
    >
  {/if}

  {#if repo}
    <a class="pr-4 text-secondary hover:underline" href={repo}>Repo</a>
  {/if}
  {#if podcast_href}
    <a class="pr-4 text-secondary hover:underline" href={podcast_href}
      >Podcast</a
    >
  {/if}
  {#if post_slug}
    <a
      class="pr-4 text-secondary hover:underline"
      href={$t('navbar.blog').url + '/' + post_slug}>Blogpost</a
    >
  {/if}
</div>
