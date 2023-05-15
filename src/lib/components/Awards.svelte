<script>
  export let year;
  export let image;
  export let alt;
  export let title;
  export let image_desc;
  export let imageOnRightSide = false;
</script>

<div class="container mx-auto grid grid-cols-8 rounded pb-6 pt-8">
  <div
    class="{imageOnRightSide
      ? 'md:hidden'
      : 'md:visible'} col-span-full mx-auto flex items-center justify-center md:col-span-4"
  >
    <div>
      <div class="offset relative mx-auto mb-4 md:mb-0">
        {#if image}
          <img
            class="h-40 w-72 rounded border-4 border-neutral"
            src={image}
            {alt}
          />
        {/if}
      </div>
      {#if image_desc}
        <span class="text-xs"> {image_desc} </span>
      {/if}
    </div>
  </div>
  <div class="col-span-full px-4 text-neutral md:col-span-4 md:pt-0">
    {#if year}
      <h3 class="pb-3 text-lg font-medium text-base-content">{year}</h3>
    {/if}
    {#if title}
      <h2 class="pb-3 text-2xl font-medium text-primary drop-shadow-sm">
        {title}
      </h2>
    {/if}
  </div>
  <div
    class="col-span-full hidden items-center justify-center md:col-span-4 {imageOnRightSide
      ? 'md:visible md:flex'
      : 'md:hidden'}"
  >
    <div>
      <div class="offset relative mx-auto">
        {#if image}
          <img
            class="h-40 w-72 rounded border-4 border-neutral"
            src={image}
            {alt}
          />
        {/if}
      </div>
      {#if image_desc}
        <span class="text-xs"> {image_desc} </span>
      {/if}
    </div>
  </div>
</div>
