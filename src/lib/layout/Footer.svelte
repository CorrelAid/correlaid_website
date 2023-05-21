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

  const socialMediaLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/correlaid',
      logo: Instagram,
    },
    {name: 'Twitter', url: 'https://twitter.com/correlaid', logo: Twitter},
    {name: 'Mastodon', url: 'https://masto.ai/@correlaid', logo: Mastodon},
    {
      name: 'LinkedIn',
      url: 'https://de.linkedin.com/company/correlaid',
      logo: Linkedin,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/WeAreCorrelAid',
      logo: Facebook,
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/channel/UCs_k9roCuWLy17xxpigrWbg',
      logo: Youtube,
    },
  ];
</script>

<footer class="w-screen border-t border-neutral-25">
  <div class=" flex pt-12">
    <ul
      class="mx-auto flex items-center gap-2 text-xs font-light text-base-content md:gap-4 md:text-base"
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
      {#each socialMediaLinks as linkDetails}
        <a
          href={linkDetails.url}
          aria-label={`CorrelAid ${linkDetails.name}`}
          target="_blank"
          rel="noreferrer"
        >
          <svelte:component
            this={linkDetails.logo}
            width={social_media_height}
            height={social_media_height}
          />
        </a>
      {/each}
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
