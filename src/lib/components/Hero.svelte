<script>
  import LinkButton from './Link_Button.svelte';
  import {header_height} from '$lib/stores/dims';
  import Info from '$lib/svg/Info.svelte';
  import {gen_img_url} from '$lib/js/helpers';
  import CorrelAidXLogo from '$lib/svg/CorrelAidX_Logo.svelte';
  export let gradient_only;
  export let height;
  export let text;
  export let image_alt;
  export let buttons = [];
  export let correlaidx = false;
  export let image = void 0;
  export let image_desc = void 0;
  let image_id;
  // TODO: Image ID remains undefined if image is undefined or null
  // This will create an invalid URL below in gen_img_url which is hard
  // to distinguish from incorrect urls through id errors for instance
  $: if (image != null) {
    image_id = image.id;
  }

  let c_hidden = 'hidden';
  let aria = 'false';

  function handle_hide() {
    c_hidden === 'inline-block'
      ? (c_hidden = 'hidden')
      : (c_hidden = 'inline-block');
    aria === 'false' ? (aria = 'true') : (aria = 'false');
  }
  $: console.log(c_hidden);
</script>

<section
  class="relative flex w-screen items-center justify-center"
  style="
    {height == 'full'
    ? `height: calc(100vh - ${$header_height}px)`
    : `height: calc((100vh - ${$header_height}px)/2)`}"
>
  {#if gradient_only === false}
    <span
      class="absolute top-0 h-full w-screen bg-cover bg-center bg-no-repeat"
      style={`background-image: url(${gen_img_url(image_id)})`}
      role="img"
      aria-label={image_alt}
    />
    {#if image_desc}
      <div class="absolute bottom-0 right-0 z-20 hidden opacity-100 md:block">
        <span
          class="z-0 block rounded-tl px-1 py-1 text-xs text-white opacity-100"
          >{image_desc}</span
        >
      </div>
      <div class="absolute bottom-0 left-0 z-20 pb-2.5 pl-2 md:hidden">
        <p class="inline text-xs text-white {c_hidden}" id="credit">
          {image_desc}
        </p>
      </div>
      <div class="absolute bottom-0 right-0 z-20 md:hidden">
        <button
          class="z-20 m-1 my-2 rounded-full bg-white p-0.5 text-sm md:hidden"
          on:click={handle_hide}
          aria-label="Credit"
          aria-expanded={aria}
          aria-controls="credit"
        >
          <Info height={23} width={23} />
        </button>
      </div>
    {/if}
  {/if}
  <div class="z-20 w-full">
    <div class="container mx-auto">
      <div class="">
        {#if correlaidx}
          <div
            class="flex justify-center md:landscape:hidden lg:landscape:flex"
          >
            <CorrelAidXLogo width={250} height={250} />
          </div>
          <div
            class="hidden justify-center md:landscape:flex lg:landscape:hidden"
          >
            <CorrelAidXLogo width={100} height={100} />
          </div>
        {/if}
        <div class={correlaidx == true ? 'text-center' : ''}>
          <h1
            class="mx-4 text-4xl font-bold tracking-wide text-white {correlaidx
              ? 'inline-block bg-tertiary px-2 py-1 font-light landscape:md:text-sm landscape:lg:text-4xl'
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
