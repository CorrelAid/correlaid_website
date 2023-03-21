<script>
    import { page_key } from "$lib/stores/page_key";
    import { t } from "$lib/stores/i18n";
    import { onMount } from "svelte";
    import Card from "$lib/components/Card.svelte";

    onMount(() => {
        $page_key = "navbar.using_data.projects";
    });

    export let data;
    let projects;
    $: projects = data.projects;
</script>

<div class="grid grid-cols-2 gap-6">
    {#each projects as project, i}
        <Card
            href={$t("navbar.using_data.projects").url + "/" + project.project_id}
            title={project.translations[0].title}
            subtitle={project.organizations[0].Projects_Organization_id.translations[0].name}

        />
    {/each}
</div>
