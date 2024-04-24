<script>
  export let name;
  export let description;
  export let imageSrc;
</script>

<div class="container grid grid-cols-8 gap-x-12 rounded py-4">
  <div class="col-span-full flex items-center justify-center xl:col-span-3">
    <div class="relative mx-auto flex h-36 w-56 items-center justify-center">
      <img class="" src={imageSrc} alt="Logo: {name}" />
    </div>
  </div>
  <div class="col-span-full px-4 pt-5 text-neutral xl:col-span-5 xl:pt-0">
    <h2 class="block pb-3 text-2xl font-medium text-primary drop-shadow-sm">
      {name}
    </h2>
    {#if description != ''}
      <p class="pb-3">{description}</p>
    {/if}
  </div>
</div>
