<script>
  import LinkButton from './LinkButton.svelte';
  import {headerHeight} from '$lib/stores/dims';
  import Info from '$lib/svg/Info.svelte';
  import CorrelaidXLogo from '$lib/svg/CorrelaidXLogo.svelte';
  export let gradientOnly;
  export let height;
  export let text;
  export let buttons = [];
  export let correlaidx = false;
  export let image = void 0;
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
  style="
    {height == 'full'
    ? `height: calc(100vh - ${$headerHeight}px)`
    : `height: calc((100vh - ${$headerHeight}px)/2)`}"
>
  {#if gradientOnly === false}
    <span
      class="absolute top-0 h-full w-screen bg-cover bg-center bg-no-repeat"
      style={`background-image: url(${image})`}
      aria-label={imageAlt}
      role="img"
    />
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
  <div class="z-10 w-full">
    <div class="container mx-auto">
      <div class="">
        {#if correlaidx}
          <div
            class="flex justify-center sm:landscape:hidden lg:landscape:flex"
          >
            <CorrelaidXLogo width={230} height={230} />
          </div>
          <div
            class="hidden justify-center sm:landscape:flex lg:landscape:hidden"
          >
            <CorrelaidXLogo width={100} height={100} />
          </div>
        {/if}
        <div class={correlaidx === true ? 'text-center' : ''}>
          <h1
            class="mx-4 text-4xl font-bold tracking-wide text-white {correlaidx ===
            true
              ? 'mb-8 inline-block bg-tertiary px-2 py-1 text-2xl font-light sm:landscape:text-xl md:landscape:text-2xl lg:landscape:text-3xl'
              : ''}"
          >
            {text}
          </h1>
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
    </div>
  </div>
  <div
    class="absolute inset-0 bg-gradient-to-r {!correlaidx
      ? 'from-secondary/75 to-primary/75'
      : 'from-tertiary/75 to-secondary/75'}"
  />
</section>
