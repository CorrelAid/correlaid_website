<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";

  onMount(() => {
    $page_key = "navbar.education.oer";
  });
  export let data;
    let oers;
    $: oers = data.oer;
</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
  <ul>
    {#each oers as oer, i}
      <li>
        {oer.translations[0].title}
      </li>
    {/each}
  </ul>
</div>

