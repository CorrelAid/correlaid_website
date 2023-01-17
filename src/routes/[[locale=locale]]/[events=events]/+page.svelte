<script>
    import { page_key } from "$lib/stores/page_key.js";
    import { onMount } from "svelte";
    import { t, locale } from "$lib/stores/i18n.js";
    import Content from "$lib/components/Content.svelte";

    onMount(() => {
        $page_key = "navbar.events";
    });
    export let data;
    let events = data.events;
</script>

<ul />
<Content>
    <div class="overflow-x-auto w-full">
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Language</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {#each events as event}
                    <tr>
                        <td>
                            {event.date}
                        </td>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div>
                                    <div class="font-bold">
                                        <a href={`${$t("navbar.events").url}/${
                                            event.slug
                                        }`}>{event.title}</a>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {event.tags}
                        </td>
                        <td style="text-transform: capitalize;">{event.language}</td>
                        
                    </tr>
                {/each}
            </tbody>
            <!-- foot -->
            <!-- <tfoot>
                <tr>
                    <th />
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th />
                </tr>
            </tfoot> -->
        </table>
    </div>
</Content>
