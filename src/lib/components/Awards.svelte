<script>
  export let year;
  export let imageSrc;
  export let imageAlt;
  export let title;
  export let imageDesc;
  export let imageOnRightSide = false;
</script>

<div class="container mx-auto grid grid-cols-8 gap-x-6 rounded">
  <div
    class="{imageOnRightSide
      ? 'md:hidden'
      : 'md:visible'} col-span-full mx-4 flex-col justify-center md:col-span-4"
  >
    <div class="offset relative mx-auto w-full" style="padding-bottom: 56.25%;">
      {#if imageSrc}
        <img
          class="absolute left-0 top-0 z-0 h-full w-full rounded border-4 border-neutral"
          src={imageSrc}
          alt={imageAlt}
        />
      {/if}
    </div>
    {#if imageDesc}
      <span class="text-xs"> {imageDesc} </span>
    {/if}
  </div>
  <div class="col-span-full px-4 pt-4 text-neutral md:col-span-4 md:pt-0">
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
    class="{imageOnRightSide
      ? 'md:visible md:flex'
      : 'md:hidden'} col-span-full mx-4 hidden flex-col justify-center md:col-span-4"
  >
    <div class="offset relative mx-auto w-full" style="padding-bottom: 56.25%;">
      {#if imageSrc}
        <img
          class="absolute left-0 top-0 z-0 h-full w-full rounded border-4 border-neutral"
          src={imageSrc}
          alt={imageAlt}
        />
      {/if}
    </div>
    {#if imageDesc}
      <span class="text-xs"> {imageDesc} </span>
    {/if}
  </div>
</div>
