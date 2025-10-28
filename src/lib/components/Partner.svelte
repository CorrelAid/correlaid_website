<script>
  let {name, description, imageSrc, link} = $props();
  import ExternalLink from '../svg/External_Link.svelte';
</script>

<div class="container grid grid-cols-8 gap-x-12 rounded py-4">
  <div class="col-span-full flex items-center justify-center xl:col-span-3">
    <div class="relative mx-auto flex h-36 w-56 items-center justify-center">
      {#if link}
        <a href={link}>
          <img class="" src={imageSrc} alt="Logo: {name}" />
        </a>
      {:else}
        <img class="" src={imageSrc} alt="Logo: {name}" />
      {/if}
    </div>
  </div>
  <div
    class="col-span-full flex items-center px-4 pt-5 text-neutral xl:col-span-5 xl:pt-0"
  >
    <div class="my-auto">
      {#if link}
        <a
          target="external"
          rel="noreferrer"
          class="block pb-3 text-2xl font-medium text-primary drop-shadow-sm hover:underline"
          href={link}
          ><span>
            {name}<span
              class="align-text-justify ml-1 inline-block whitespace-nowrap"
              ><ExternalLink
                height="20"
                width="20"
                color="rgb(150 195 66)"
              /></span
            >
          </span>
        </a>
      {:else}
        <h2 class="block pb-3 text-2xl font-medium text-primary drop-shadow-sm">
          {name}
        </h2>
      {/if}
      {#if description != ''}
        <p class="pb-3">{description}</p>
      {/if}
    </div>
  </div>
</div>
