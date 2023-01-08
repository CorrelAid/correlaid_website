<script>
    import Text from "$lib/components/Text.svelte"
    export let text;
    export let url;
</script>

<div
    class="hero min-h-screen"
    style="background-image: url({url});"
>
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content">
        <div class="max-w-md">
                <Text text={text} size={"base"} />
        </div>
    </div>
</div>
