<script>
  import { page_key } from "$lib/stores/page_key.js";
  import { onMount } from "svelte";
  import { gen_img_url } from "$lib/js/helpers";
  import { t, locale } from "$lib/stores/i18n.js";
  import ThumbmailAvatar from "$lib/components/Thumbmail_Avatar.svelte";

  onMount(() => {
    $page_key = "navbar.about";
  });
  export let data;
  let remote_office;
  $: remote_office = data.remote_office;
  let organizational_structure;
  $: organizational_structure = data.organizational_structure;

  $: console.log(remote_office);
</script>

<div class="container mx-auto py-6 px-4">
  <div class="grid xl:grid-cols-3 gap-4">
    <a
      class="col-span-1 border border-neutral-25 rounded"
      href={$t("navbar.about.board").url}
    >
      <div class="p-4">
        <h2 class=" ">{$t("navbar.about.board").text}</h2>
        <p class="">
          {organizational_structure.translations[0].board}
        </p>
      </div>
    </a>
    <a
      class="col-span-1 py-4 border border-neutral-25 rounded"
      href={$t("navbar.about.remote_office").url}
    >
      <div class="p-4">
        <h2 class=" ">{$t("navbar.about.remote_office").text}</h2>
        <p class="">
          {organizational_structure.translations[0].remote_office}
        </p>
        <div class="flex pt-5 w-2/4 mx-auto">
          {#each remote_office as person}
            <ThumbmailAvatar
              src={gen_img_url(
                person.person.image.id,
                "fit=cover&width=200&height=200&quality=80"
              )}
              alt={person.person.name}
            />
          {/each}
        </div>
      </div>
    </a>
    <a
      class="col-span-1 py-4 border border-neutral-25 rounded"
      href={$t("navbar.about.ethics_commission").url}
    >
      <div class="p-4">
        <h2 class=" ">Ethikkommission</h2>
        <p class="">
          {organizational_structure.translations[0].ethics_commission}
        </p>
      </div>
    </a>
    <a
      class="col-span-full py-4 border border-neutral-25 rounded"
      href={$t("navbar.community.correlaidx").url}
    >
      <div class="p-4 ">
        <h2 class=" ">{$t("navbar.community.correlaidx").text}</h2>
        <p class="">
          {organizational_structure.translations[0].correlaidx}
        </p>
      </div>
    </a>
  </div>
</div>
