<!-- https://svelte.dev/examples/modal -->
<script>
    import Close from "$lib/svg/Close.svelte";
    export let showModal; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    class=" relative overflow-y-scroll z-30"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <div
        class="sticky top-0 left-full p-0 cursor-pointer w-14 "
        autofocus
        on:click={() => dialog.close()}
    >
        <Close height={50} width={50} />
    </div>
    <div class="pb-8 pt-1 xl:px-12 px-4" on:click|stopPropagation>
        <slot />
    </div>
</dialog>

<style>
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
    dialog {
        left: 0%;
        transform: translateX(-0%);
    }
</style>
