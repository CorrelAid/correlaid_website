<script>
    import Text from "$lib/components/Text.svelte";
    export let text;
    export let url;
</script>

<div class="hero min-h-screen" style="background-image: url({url});">
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content">
        <div class="max-w-md hero-text">
            <Text {text} size={"base"} />
        </div>
    </div>
</div>

<style>
    .hero-overlay {
        background: linear-gradient(45deg,rgba(56, 99, 162, .82), rgba(146, 222, 63, .82));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .hero-text :global(h1) {
        color: white;
    }
</style>
