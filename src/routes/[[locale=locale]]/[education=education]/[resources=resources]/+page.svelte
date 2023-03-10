<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import Card from "$lib/components/Card.svelte";

    onMount(() => {
        $page_key = "navbar.education.resources";
    });

    export let data;
    let workshops;
    $: workshops = data.workshops;
</script>

  <div class="grid grid-cols-2 gap-6">
    {#each workshops as workshop, i}
        <Card
            title={workshop.name}
            subtitle={workshop.teaser}
        />
    {/each}
</div>
