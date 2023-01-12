<script>
  import { page } from "$app/stores";
  import CkEditor from "$lib/components/CKEditor.svelte";
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key.js";
  import { t, locale } from "$lib/stores/i18n.js";

  onMount(() => {
    $page_key = "navbar.blog";
  });

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<CkEditor source={data.text} />
