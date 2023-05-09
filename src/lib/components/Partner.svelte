<script>
  export let name;
  export let description;
  export let img;
  export let website = '';
</script>

<div class="text_width grid grid-cols-8 gap-x-12 rounded py-4">
  {#if img}
    <div class="col-span-full flex items-center justify-center xl:col-span-3">
      <div class="relative mx-auto flex h-36 w-56 items-center justify-center">
        {#if website !== ''}
          <a href={website} target="_blank" rel="noreferrer">
            <img class="" src={img} alt="Logo: {name}" />
          </a>
        {:else}
          <img class="" src={img} alt="Logo: {name}" />
        {/if}
      </div>
    </div>
  {/if}
  <div class="col-span-full pt-5 text-neutral xl:col-span-5 xl:pt-0">
    {#if website !== ''}
      <a
        class="block pb-3 text-2xl font-semibold text-primary drop-shadow-sm"
        href={website}
        target="_blank"
        rel="noreferrer">{name}</a
      >
    {:else}
      <h2 class="pb-3 text-2xl font-semibold text-primary drop-shadow-sm">
        {name}
      </h2>
    {/if}
    {#if description != ''}
      <p class="pb-3 text-justify">{description}</p>
    {/if}
  </div>
</div>
