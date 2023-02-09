<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";

  onMount(() => {
    $page_key = "navbar.education.mentoring";
  });
</script>
