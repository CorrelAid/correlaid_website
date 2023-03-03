<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";

  onMount(() => {
    $page_key = "navbar.projects_consulting.consulting";
  });

  export let data;
  let experts;
  $: experts = data.experts;
</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
  <ul>
    {#each experts as expert, i}
      <li>
        {expert.person.name}
      </li>
    {/each}
  </ul>
</div>
