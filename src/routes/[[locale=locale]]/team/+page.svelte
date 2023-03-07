<script>
    import { page_key } from "$lib/stores/page_key";
    import { onMount } from "svelte";
    import { gen_img_url } from "$lib/js/helpers";
    import Html from "$lib/components/Html.svelte";
    import Person from "$lib/components/Person.svelte";

    onMount(() => {
        $page_key = "footer.team";
    });
    export let data;
    let remote_office;
    let board;
    let ethics_commission;
    $: remote_office = data.remote_office;
    $: board = data.board;
    $: ethics_commission = data.ethics_commission;

    let organizational_structure;
    $: organizational_structure = data.organizational_structure;

</script>

<Html
    source={organizational_structure.translations[0].remote_office}
    options={""}
    width={"text"}
/>

<div class="container mx-auto flex flex-col gap-y-3 py-8 space-y-8">
    {#each remote_office as person}
        <Person
            name={person.person.name}
            img={gen_img_url(
                person.person.image.id,
                "fit=cover&width=200&height=200&quality=80"
            )}
            position={person.translations[0].position}
            description={person.translations[0].description}
        />
    {/each}
</div>

<Html
    source={organizational_structure.translations[0].board}
    options={""}
    width={"text"}
/>

<div class="container mx-auto flex flex-col gap-y-3 py-8 space-y-8">
    {#each board as person}
        <Person
            name={person.person.name}
            img={gen_img_url(
                person.person.image.id,
                "fit=cover&width=200&height=200&quality=80"
            )}
            position={person.translations[0].position}
            description={person.translations[0].description}
        />
    {/each}
</div>

<Html
    source={organizational_structure.translations[0].ethics_commission}
    options={""}
    width={"text"}
/>

<div class="container mx-auto flex flex-col gap-y-3 py-8 space-y-8">
    {#each ethics_commission as person}
        <Person
            name={person.person.name}
            img={gen_img_url(
                person.person.image.id,
                "fit=cover&width=200&height=200&quality=80"
            )}
            position={person.translations[0].position}
            description={person.translations[0].description}
        />
    {/each}
</div>
