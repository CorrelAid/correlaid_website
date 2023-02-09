<script>
  import { page_key } from "$lib/stores/page_key.js";
  import { onMount } from "svelte";

  onMount(() => {
    $page_key = "navbar.education.knowledge_pool";
  });
</script>
