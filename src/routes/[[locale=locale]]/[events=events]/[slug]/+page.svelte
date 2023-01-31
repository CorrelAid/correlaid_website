<script>
  import { page } from "$app/stores";
  
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key.js";
  import { t, locale } from "$lib/stores/i18n.js";

  onMount(() => {
    $page_key = "navbar.events";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  
</script>

<div class="container mx-auto">  
</div>