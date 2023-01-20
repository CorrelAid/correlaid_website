<script>
  import { page } from "$app/stores";
  import Text from "$lib/components/Text.svelte";
  import Content from "$lib/components/Content.svelte";
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key.js";
  import { t, locale } from "$lib/stores/i18n.js";

  onMount(() => {
    $page_key = "navbar.events";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  
</script>

<Content>
  <Text source={data.translations[0].description} size={"base"} />
</Content>
