<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.education.workshops";
    });

    export let data;
    let workshops;
    $: workshops = data.workshops;
</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
    <ul>
      {#each workshops as workshop, i}
        <li>
          {workshop.name}
        </li>
      {/each}
    </ul>
  </div>
