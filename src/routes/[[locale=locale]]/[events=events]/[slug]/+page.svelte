<script>
  import { page } from "$app/stores";
  import Text from "$lib/components/Text.svelte";
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key.js";
  import { t, locale } from "$lib/stores/i18n.js";

  onMount(() => {
    $page_key = "navbar.events";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  
</script>

<div class="container mx-auto">  <Text source={data.translations[0].description} size={"base"} />
</div>