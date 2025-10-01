<script>
  let {children, colors = 'correllab'} = $props();
</script>

<!-- either class lab or class lab-bg or class border -->
<div
  class="{colors === 'correllab'
    ? 'offset-right-lab'
    : 'offset-right'} z-1 container relative mx-auto mb-8 mt-8 flex flex-col gap-4 rounded rounded border border-neutral-25 bg-white p-4 md:flex-row"
>
  {@render children?.()}
</div>

<style>
  /* .lab {
    position: relative;
    width: 100%;
  }

  .lab-bg {
    background: linear-gradient(-11deg, #a7baeb, #f1c6db);
  }

  .lab::before {
    content: '';
    z-index: 0;
    position: absolute;
    inset: 0;
    border-radius: 2px;
    padding: 4px;
    background: linear-gradient(45deg, #ffa4be, #5582dc);
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: add, add;
    mask-composite: add, add;
    mask-composite: exclude;
  } */
</style>
