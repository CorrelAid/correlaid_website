<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";

    onMount(() => {
        $page_key = "navbar.projects_consulting.projects";
    });

    export let data;
    let projects;
    $: projects = data.projects;
</script>

<div class="container mx-auto pb-8 pl-4 pr-6 space-y-4">
    <ul>
    {#each projects as project, i}
    <li>
        {project.translations[0].title}
    </li>
    {/each}
</ul>
</div>
