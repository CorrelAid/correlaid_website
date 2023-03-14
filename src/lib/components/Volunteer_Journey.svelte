<script>
    import Modal from "./Modal.svelte";
    import { no_scroll } from "$lib/stores/no_scroll";
    import Html from "$lib/components/Html.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import { gen_img_url } from "$lib/js/helpers";

    let showModal = false;
    $: $no_scroll = showModal;

    export let name;
    export let subtitle;
    export let text;
    export let image;
</script>

<div class="mx-auto" style="width: max-content;">
    <div class="cursor-pointer"
        on:click={() => (showModal = true)}
        on:keydown={() => (showModal = true)}
    >
        <Avatar src={gen_img_url(image.id)} alt={name} />
    </div>
    <div class="p-4 mx-auto">
        <h2 class="text-xl font-semibold pb-3 pt-1">
            {name}
        </h2>
        <h3 class="text-lg">{subtitle}</h3>
    </div>
</div>

<Modal bind:showModal>
    <Html
        source={`<h2>${name}: ${subtitle}</h2>${text}`}
        options={""}
        width={"text"}
    />
</Modal>
