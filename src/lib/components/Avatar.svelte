<script>
    export let src;
    export let alt;
    export let w = 56
</script>

<div class="relative offset w-{w} mx-auto" >
    <img class="w-56 h-56 border-4 border-neutral rounded" {src} {alt} />
</div>

<!-- <style>
    .offset::after {
        border-radius: 4px;
        border: 4px solid transparent;
        top: -8px;
        right: 8px;
        bottom: 8px;
        left: -8px;
    }
</style> -->
