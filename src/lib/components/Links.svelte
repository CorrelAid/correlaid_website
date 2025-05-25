<script>
  import Github from '../svg/Github.svelte';
  import Linkedin from '../svg/Linkedin.svelte';
  import Mastodon from '../svg/Mastodon.svelte';
  import ExternalLink from '../svg/External_Link.svelte';

  let {
    mastodon = void 0,
    website = void 0,
    linkedin = void 0,
    github = void 0,
    iconSize = 25,
  } = $props();
</script>

<div class="flex gap-x-2 text-base-content">
  {#if website}<a
      href={website}
      aria-label="Homepage"
      class=""
      target="_blank"
      rel="noreferrer"
      ><ExternalLink
        width={iconSize + 3}
        height={iconSize + 3}
        color={'rgb(60, 60, 59)'}
      /></a
    >{/if}
  {#if mastodon}<a
      href={mastodon}
      aria-label="Mastodon"
      target="_blank"
      rel="noreferrer"><Mastodon width={iconSize} height={iconSize} /></a
    >{/if}
  {#if linkedin}<a
      href={linkedin}
      aria-label="LinkedIn"
      target="_blank"
      rel="noreferrer"><Linkedin width={iconSize} height={iconSize} /></a
    >{/if}
  {#if github}<a
      href={github}
      aria-label="Github"
      target="_blank"
      rel="noreferrer"><Github width={iconSize} height={iconSize} /></a
    >{/if}
</div>
