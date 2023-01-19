<script>
  import { t, locale } from "$lib/stores/i18n.js";
</script>
<footer class="w-screen border-t-2 border-neutral-25">
  <div
    class=" flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-4 pt-5"
  >
    <div class="mx-auto block">
      <ul
        class="flex items-center gap-6 font-light text-base-content tracking-wide "
      >
        <li>
          <a class="hover:text-primary transition" href={$t("footer.imprint").url}> {$t("footer.imprint").text} </a>
        </li>
        <li>
          <a class="hover:text-primary transition" href={$t("footer.contact").url}> {$t("footer.contact").text} </a>
        </li>
      </ul>
    </div>
  </div>
  <div
    class=" flex mx-auto max-w-screen-xl pb-6 pt-2"
  >
    <div class="mx-auto block">
      <ul
        class="flex items-center gap-6 font-light text-base-content tracking-wide"
      >
        <li>CorrelAid. © {new Date().getFullYear()}</li>
      </ul>
      
    </div>
  </div>
  <div
    class=" flex mx-auto max-w-screen-xl pb-6 pt-2"
  >
    <div class="mx-auto block">
      
    
      
    </div>
  </div>
</footer>
