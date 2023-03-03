<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";
  import { gen_img_url } from "$lib/js/helpers";
  import { t} from "$lib/stores/i18n";
  import ThumbmailAvatar from "$lib/components/Thumbmail_Avatar.svelte";
  import CorrelAidXWhite from "$lib/svg/CorrelAid_X_White.svelte";

  onMount(() => {
    $page_key = "navbar.about";
  });
  
  /** @type {import('./$types').PageData} */
  export let data;

  let remote_office;
  $: remote_office = data.remote_office;
  let board;
  $: board = data.board;
  let organizational_structure;
  $: organizational_structure = data.organizational_structure;
  let ethics_commission;
  $: ethics_commission = data.ethics_commission;
</script>


<!-- <div class="container mx-auto mb-12 px-4">
  <h2 class="py-4 text-xl font-bold">
    {organizational_structure.translations[0].title}
  </h2>
  <div class="grid xl:grid-cols-3 gap-8">
    <a
      class="col-span-2 border border-neutral-25 rounded hover:shadow hover:border-primary"
      href={$t("navbar.about.board").url}
    >
      <div class="p-4">
        <h2 class="text-lg ">{$t("navbar.about.board").text}</h2>
        <p class="">
          {organizational_structure.translations[0].board}
        </p>
        <div class="flex flex-wrap py-8 w-full mx-auto justify-center">
          {#each board as person}
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
      class="col-span-1 border border-neutral-25 rounded hover:shadow hover:border-primary"
      href={$t("navbar.about.remote_office").url}
    >
      <div class="p-4">
        <h2 class=" text-lg">{$t("navbar.about.remote_office").text}</h2>
        <p class="">
          {organizational_structure.translations[0].remote_office}
        </p>
        <div class="flex flex-wrap py-8 w-full mx-auto justify-center">
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
      class="col-span-full border border-neutral-25 rounded hover:shadow hover:border-primary"
      href={$t("navbar.about.ethics_commission").url}
    >
      <div class="p-4">
        <h2 class=" text-lg">Ethikkommission</h2>
        <p class="">
          {organizational_structure.translations[0].ethics_commission}
        </p>
        <div class="flex flex-wrap py-8 w-full mx-auto justify-center">
          {#each ethics_commission as person}
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
      class="col-span-full border border-neutral-25 rounded hover:shadow hover:border-tertiary"
      href={$t("navbar.community.correlaidx").url}
    >
      <div class="p-4">
        <div class="w-full flex justify-center relative ">
          <CorrelAidXWhite height={100} width={100} />
        </div>
        <h2 class="text-lg">{$t("navbar.community.correlaidx").text}</h2>
        <p class="">
          {organizational_structure.translations[0].correlaidx}
        </p>
      </div>
    </a>
  </div>
</div> -->
