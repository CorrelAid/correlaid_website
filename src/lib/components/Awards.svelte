<script>
  export let year;
  export let image;
  export let alt;
  export let title;
  export let imageOnRightSide = false;
</script>

<div
  class="text_width grid grid-cols-1 rounded pb-6 pt-8 md:grid-cols-3 md:gap-x-12"
>
  <div
    class="{imageOnRightSide ? 'md:hidden' : 'md:visible'} w-392 mx-auto pt-8"
  >
    <div class="offset w-392 relative mx-auto">
      {#if image && image != ''}
        <img class="w-392 rounded border-4 border-neutral" src={image} {alt} />
      {/if}
    </div>
  </div>
  <div class="col-span-2 px-4 pt-5 text-neutral">
    {#if year && year != ''}
      <h3 class="pb-3 text-2xl text-neutral">{year}</h3>
    {/if}
    {#if title && title != ''}
      <h2 class="pb-3 text-3xl text-primary">{title}</h2>
    {/if}
  </div>
  <div
    class="w-392 h-240 hidden pt-8 {imageOnRightSide
      ? 'md:visible md:flex'
      : 'md:hidden'}"
  >
    <div class="offset w-392 relative mx-auto">
      {#if image && image != ''}
        <img class="w-392 rounded border-4 border-neutral" src={image} {alt} />
      {/if}
    </div>
  </div>
</div>
