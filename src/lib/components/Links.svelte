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
  const social_media_height = 25;
</script>

<div class="flex gap-x-2">
  {#if website != ''}<a href={website} class=""
      ><ExternalLink
        width={social_media_height + 3}
        height={social_media_height + 3}
        color={'rgb(60, 60, 59)'}
      /></a
    >{/if}
  {#if twitter != ''}<a href={twitter} class=""
      ><Twitter width={social_media_height} height={social_media_height} /></a
    >{/if}
  {#if mastodon != ''}<a href={mastodon} class=""
      ><Mastodon width={social_media_height} height={social_media_height} /></a
    >{/if}
  {#if linkedin != ''}<a href={linkedin} class=""
      ><Linkedin width={social_media_height} height={social_media_height} /></a
    >{/if}
  {#if github != ''}<a href={github} class=""
      ><Github width={social_media_height} height={social_media_height} /></a
    >{/if}
</div>
