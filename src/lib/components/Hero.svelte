<script>
  import LinkButton from './LinkButton.svelte';
  import {headerHeight} from '$lib/stores/dims';
  import Info from '$lib/svg/Info.svelte';
  import CorrelaidXLogo from '$lib/svg/CorrelaidXLogo.svelte';
  export let gradientOnly;
  export let height;
  export let imageSize = 'fullsize';
  export let text;
  export let subText;
  export let buttons = [];
  export let correlaidx = false;
  export let imageSrc = void 0;
  export let imageAlt = void 0;
  export let imageDesc = void 0;

  let cHidden = 'hidden';
  let aria = 'false';

  function handleHidden() {
    cHidden === 'inline-block'
      ? (cHidden = 'hidden')
      : (cHidden = 'inline-block');
    aria === 'false' ? (aria = 'true') : (aria = 'false');
  }
</script>

<section
  class="relative flex w-screen items-center justify-center"
  style={height === 'full'
    ? `height: calc(100vh - ${$headerHeight}px)`
    : height === 'half'
      ? `height: calc((100vh - ${$headerHeight}px)/2)`
      : `height: auto`}
>
  {#if gradientOnly === false}
    {#if imageSize === 'fullsize'}
      <span
        class="absolute top-0 h-full w-screen bg-cover bg-center bg-no-repeat"
        style={`background-image: url(${imageSrc})`}
        aria-label={imageAlt}
        role="img"
      />
    {/if}
    {#if imageDesc}
      <div class="absolute bottom-0 right-0 z-20 hidden opacity-100 lg:block">
        <span
          class="z-0 block rounded-tl px-1 py-1 text-xs text-white opacity-100"
          >{imageDesc}</span
        >
      </div>
      <div
        class="absolute bottom-0 left-0 z-20 max-w-80 overflow-hidden whitespace-nowrap pb-0.5 pl-2 md:max-w-none lg:hidden"
      >
        <p class="inline text-xs text-white {cHidden}" id="credit">
          {imageDesc}
        </p>
      </div>
      <div class="absolute bottom-0 right-0 z-20 lg:hidden">
        <button
          class="z-20 m-1 my-2 rounded-full bg-white p-0.5 text-sm lg:hidden"
          on:click={handleHidden}
          aria-label="Credit"
          aria-expanded={aria}
          aria-controls="credit"
        >
          <Info height={23} width={23} />
        </button>
      </div>
    {/if}
  {/if}
  <div class="container mx-auto h-full w-full">
    {#if correlaidx}
      <div class="flex justify-center sm:landscape:hidden lg:landscape:flex">
        <CorrelaidXLogo width={230} height={230} />
      </div>
      <div class="hidden justify-center sm:landscape:flex lg:landscape:hidden">
        <CorrelaidXLogo width={100} height={100} />
      </div>
    {/if}
    <div class="grid h-full w-full grid-cols-12 grid-rows-5 pt-9 lg:pt-12">
      <div
        class="z-[10] col-span-10 col-start-1 row-span-3 row-start-1 mx-4 my-auto rounded border border-neutral-25 px-4 py-4 md:col-span-8 md:col-start-1 md:row-span-full md:row-start-1 md:border-0 md:py-8 md:pr-8 {correlaidx ===
        true
          ? 'text-center'
          : ''} {imageSize === 'small_text_overlap'
          ? 'bg-white'
          : 'col-span-full lg:col-span-full'}"
      >
        <h1
          class="font-londrina text-2xl font-bold tracking-wide md:text-4xl {imageSize ===
          'small_text_overlap'
            ? 'text-[#3863a2]'
            : 'text-white'} {correlaidx === true
            ? 'bg-tertiary text-2xl font-light sm:landscape:text-xl md:landscape:text-2xl lg:landscape:text-4xl '
            : ''} "
        >
          {text}
        </h1>
        {#if subText}
          <p class="text-content text-md pt-3 leading-[28px]">
            {subText}
          </p>
        {/if}
      </div>
      {#if imageSize === 'small_text_overlap'}
        <div
          class="col-span-9 col-end-13 row-span-4 row-start-2 mr-4 mt-auto md:row-span-full md:row-start-1 lg:col-span-10 lg:col-end-13"
        >
          <div class="aspect-h-9 aspect-w-9">
            <img
              src={imageSrc}
              alt={imageAlt}
              class="h-full w-full rounded border border-neutral-25"
            />
          </div>
        </div>
      {/if}
    </div>

    {#if Array.isArray(buttons) && buttons.length !== 0}
      <div
        class="mt-16 inline-block space-y-6 px-4 md:mt-12 md:flex md:flex-row md:space-x-5 md:space-y-0"
      >
        {#each buttons as button}
          <LinkButton {...button} />
        {/each}
      </div>
    {/if}
  </div>
  {#if imageSize !== 'small_text_overlap'}
    <div
      class="absolute inset-0 bg-gradient-to-r {!correlaidx
        ? 'from-secondary/75 to-primary/75'
        : 'from-tertiary to-secondary'}"
    />
  {/if}
</section>
