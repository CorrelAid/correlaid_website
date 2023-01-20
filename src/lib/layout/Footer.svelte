<script>
  import { t, locale } from "$lib/stores/i18n.js";
  import Facebook from "$lib/svg/Facebook.svelte";
  import Instagram from "../svg/Instagram.svelte";
  import Twitter from "../svg/Twitter.svelte";
  import Youtube from "../svg/Youtube.svelte";
  import Linkedin from "../svg/Linkedin.svelte";
  import Mastodon from "../svg/Mastodon.svelte";

  const social_media_height = 23;
</script>

<footer class="w-screen border-t border-neutral-25">
  <div class=" flex pt-4">
    <ul
      class="flex items-center gap-6 font-light text-base-content tracking-wide mx-auto"
    >
      <li>
        <a
          class="hover:text-primary transition"
          href={$t("footer.imprint").url}
        >
          {$t("footer.imprint").text}
        </a>
      </li>
      <li>
        <a
          class="hover:text-primary transition"
          href={$t("footer.contact").url}
        >
          {$t("footer.contact").text}
        </a>
      </li>
    </ul>
  </div>

  <div class=" flex mx-auto py-6">
    <div class="grid grid-flow-col gap-6 mx-auto">
      <a
        href="https://twitter.com/CorrelAid"
        class=""
        ><Instagram width={social_media_height} height={social_media_height} /></a
      >
      <a
        href="https://twitter.com/correlaid"
        class=""
        ><Twitter width={social_media_height} height={social_media_height} /></a
      >
      <a
      href="https://masto.ai/@correlaid"
        class=""
        ><Mastodon width={social_media_height} height={social_media_height} /></a
      >
      <a
        href="https://de.linkedin.com/company/correlaid"
        class=""
        ><Linkedin width={social_media_height} height={social_media_height} /></a
      >
      <a
        href="https://facebook.com/WeAreCorrelAid"
        class=""
        ><Facebook width={social_media_height} height={social_media_height} /></a
      >
      <a
        href="https://www.youtube.com/channel/UCs_k9roCuWLy17xxpigrWbg"
        class=""
        ><Youtube width={social_media_height} height={social_media_height} /></a
      >
      
    </div>
  </div>

  <div class=" flex pb-4">
    <ul
      class="flex items-center gap-6 font-light text-base-content tracking-wide mx-auto"
    >
      <li>CorrelAid. © {new Date().getFullYear()}</li>
    </ul>
  </div>
</footer>
