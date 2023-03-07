<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import Card from "$lib/components/Card.svelte";

    onMount(() => {
        $page_key = "navbar.projects_consulting.projects";
    });

    export let data;
    let projects;
    $: projects = data.projects;
</script>

    {#each projects as project, i}
     <Card/>
    {/each}

