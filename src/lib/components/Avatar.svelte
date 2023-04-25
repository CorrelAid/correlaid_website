<script>
  export let src;
  export let alt;
  export let w = 56;
</script>

<div class="offset relative w-{w} mx-auto">
  <img class="h-56 w-56 rounded border-4 border-neutral" {src} {alt} />
</div>
