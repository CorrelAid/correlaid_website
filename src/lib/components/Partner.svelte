<script>
  export let name;
  export let description;
  export let img;
  export let website = '';
</script>

<div class="text_width grid grid-cols-8 gap-x-12 rounded pb-6 pt-8">
  {#if img}
    <div class="col-span-full xl:col-span-3">
      <div class="relative mx-auto flex h-36 w-56 items-center justify-center">
        {#if website !== ''}
          <a href={website} target="_blank" rel="noreferrer">
            <img class="" src={img} alt={name} />
          </a>
        {:else}
          <img class="" src={img} alt={name} />
        {/if}
      </div>
    </div>
  {/if}
  <div class="col-span-full px-4 pt-5 text-neutral xl:col-span-5 xl:pt-0">
    {#if website !== ''}
      <a
        class="block pb-3 text-2xl text-primary"
        href={website}
        target="_blank"
        rel="noreferrer">{name}</a
      >
    {:else}
      <h2 class="pb-3 text-2xl text-primary">{name}</h2>
    {/if}
    {#if description != ''}
      <p class="pb-3 text-justify">{description}</p>
    {/if}
  </div>
</div>
