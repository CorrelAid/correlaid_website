<!-- https://svelte.dev/examples/modal -->
<script>
    import Close from "$lib/svg/Close.svelte";
    export let showModal; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    class="py-8 px-12"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <div on:click|stopPropagation>
        <div
            class="absolute top-0 right-0 p-0 cursor-pointer"
            autofocus
            on:click={() => dialog.close()}
        >
            <Close height={50} width={50} />
        </div>
        <slot />
    </div>
</dialog>

<style>
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
</style>
