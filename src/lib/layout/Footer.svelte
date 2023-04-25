<script>
  import {t} from '$lib/stores/i18n';
  import Facebook from '$lib/svg/Facebook.svelte';
  import Instagram from '../svg/Instagram.svelte';
  import Twitter from '../svg/Twitter.svelte';
  import Youtube from '../svg/Youtube.svelte';
  import Linkedin from '../svg/Linkedin.svelte';
  import Mastodon from '../svg/Mastodon.svelte';

  const social_media_height = 20;

  const links = [
    'footer.imprint',
    'footer.coc',
    'footer.coe',
    'navbar.about.team',
  ];
</script>

<footer class="w-screen border-t border-neutral-25">
  <div class=" flex pt-12">
    <ul
      class="mx-auto flex items-center gap-3 text-sm font-light text-base-content md:text-base"
    >
      {#each links as link}
        <li>
          <a class="transition hover:text-primary" href={$t(link).url}>
            {$t(link).text}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <div class=" mx-auto flex py-6">
    <div class="mx-auto grid grid-flow-col gap-6">
      <a href="https://www.instagram.com/correlaid" class=""
        ><Instagram
          width={social_media_height}
          height={social_media_height}
        /></a
      >
      <a href="https://twitter.com/correlaid" class=""
        ><Twitter width={social_media_height} height={social_media_height} /></a
      >
      <a href="https://masto.ai/@correlaid" class=""
        ><Mastodon
          width={social_media_height}
          height={social_media_height}
        /></a
      >
      <a href="https://de.linkedin.com/company/correlaid" class=""
        ><Linkedin
          width={social_media_height}
          height={social_media_height}
        /></a
      >
      <a href="https://facebook.com/WeAreCorrelAid" class=""
        ><Facebook
          width={social_media_height}
          height={social_media_height}
        /></a
      >
      <a
        href="https://www.youtube.com/channel/UCs_k9roCuWLy17xxpigrWbg"
        class=""
        ><Youtube width={social_media_height} height={social_media_height} /></a
      >
    </div>
  </div>

  <div class=" flex pb-10">
    <ul
      class="mx-auto flex items-center gap-6 text-sm font-light tracking-wide text-base-content md:text-base"
    >
      <li>CorrelAid. © {new Date().getFullYear()}</li>
    </ul>
  </div>
</footer>
