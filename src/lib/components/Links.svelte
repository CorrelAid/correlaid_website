<script>
  import Twitter from '../svg/Twitter.svelte';
  import Github from '../svg/Github.svelte';
  import Linkedin from '../svg/Linkedin.svelte';
  import Mastodon from '../svg/Mastodon.svelte';
  import ExternalLink from '../svg/External_Link.svelte';
  export let mastodon = '';
  export let website = '';
  export let twitter = '';
  export let linkedin = '';
  export let github = '';
  export let name;
  const iconSize = 25;
</script>

<div class="flex gap-x-2 text-base-content">
  {#if website != ''}<a
      href={website}
      aria-label="{name} Website"
      class=""
      target="_blank"
      rel="noreferrer"
      ><ExternalLink
        width={iconSize + 3}
        height={iconSize + 3}
        color={'rgb(60, 60, 59)'}
      /></a
    >{/if}
  {#if twitter != ''}<a
      href={twitter}
      aria-label="{name} Twitter"
      target="_blank"
      rel="noreferrer"><Twitter width={iconSize} height={iconSize} /></a
    >{/if}
  {#if mastodon != ''}<a
      href={mastodon}
      aria-label="{name} Mastodon"
      target="_blank"
      rel="noreferrer"><Mastodon width={iconSize} height={iconSize} /></a
    >{/if}
  {#if linkedin != ''}<a
      href={linkedin}
      aria-label="{name} LinkedIn"
      target="_blank"
      rel="noreferrer"><Linkedin width={iconSize} height={iconSize} /></a
    >{/if}
  {#if github != ''}<a
      href={github}
      aria-label="{name} Github"
      target="_blank"
      rel="noreferrer"><Github width={iconSize} height={iconSize} /></a
    >{/if}
</div>
