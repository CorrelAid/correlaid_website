<script>
  import LinkButton from './LinkButton.svelte';
  import {headerHeight} from '$lib/stores/dims';
  import Info from '$lib/svg/Info.svelte';
  import CorrelaidXLogo from '$lib/svg/CorrelaidXLogo.svelte';

  let {
    gradientOnly,
    height,
    text,
    subText,
    buttons = [],
    correlaidx = false,
    imageSrc = void 0,
    imageAlt = void 0,
    imageDesc = void 0,
  } = $props();

  let cHidden = $state('hidden');
  let aria = $state('false');

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
    : `height: calc((100vh - ${$headerHeight}px)/2)`}
>
  {#if gradientOnly === false}
    <span
      class="absolute top-0 h-full w-screen bg-cover bg-center bg-no-repeat"
      style={`background-image: url(${imageSrc})`}
      aria-label={imageAlt}
      role="img"
    ></span>

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
          onclick={handleHidden}
          aria-label="Credit"
          aria-expanded={aria}
          aria-controls="credit"
        >
          <Info height={23} width={23} />
        </button>
      </div>
    {/if}
  {/if}
  <div
    class="container z-[10] mx-auto flex h-full w-full items-center {correlaidx ===
    true
      ? 'justify-center'
      : ''} "
  >
    <div class="w-full">
      {#if correlaidx}
        <div class=" flex justify-center sm:landscape:hidden lg:landscape:flex">
          <CorrelaidXLogo width={230} height={230} />
        </div>
        <div
          class="z-[10] hidden justify-center sm:landscape:flex lg:landscape:hidden"
        >
          <CorrelaidXLogo width={100} height={100} />
        </div>
      {/if}
      <div class=" {correlaidx === true ? 'w-full' : 'md:w-8/12'}  px-4">
        <div
          class="z-[10] {correlaidx === true
            ? 'flex justify-center'
            : 'my-auto'}"
        >
          <h1
            class="font-bold tracking-wide text-white {correlaidx === true
              ? 'mb-8 inline-block bg-tertiary px-2 py-1 text-2xl text-4xl font-bold font-light tracking-wide text-white sm:landscape:text-xl md:landscape:text-2xl lg:landscape:text-3xl'
              : 'font-londrina text-3xl drop-shadow  md:text-4xl'} "
          >
            {text}
          </h1>
          {#if subText}
            <p class="pt-3.5 text-lg leading-[28px] text-white drop-shadow">
              {subText}
            </p>
          {/if}
        </div>
      </div>
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

  <div
    class="absolute inset-0 bg-gradient-to-r {!correlaidx
      ? 'from-secondary/75 to-primary/75'
      : 'from-tertiary/75 to-secondary/75'}"
  ></div>
</section>
