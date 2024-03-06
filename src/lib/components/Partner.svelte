<script>
  export let name;
  export let description;
  export let imageSrc;
  export let website;
</script>

<div class="container grid grid-cols-8 gap-x-12 rounded py-4">
  <div class="col-span-full flex items-center justify-center xl:col-span-3">
    <div class="relative mx-auto flex h-36 w-56 items-center justify-center">
      <a href={website} target="_blank" rel="noreferrer">
        <img class="" src={imageSrc} alt="Logo: {name}" />
      </a>
    </div>
  </div>
  <div class="col-span-full px-4 pt-5 text-neutral xl:col-span-5 xl:pt-0">
    {#if website !== ''}
      <a
        class="block pb-3 text-2xl font-medium text-primary drop-shadow-sm"
        href={website}
        target="_blank"
        rel="noreferrer">{name}</a
      >
    {:else}
      <h2 class="pb-3 text-2xl font-medium text-primary drop-shadow-sm">
        {name}
      </h2>
    {/if}
    {#if description != ''}
      <p class="pb-3">{description}</p>
    {/if}
  </div>
</div>
