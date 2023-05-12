<script>
  import LinkButton from './Link_Button.svelte';
  import {header_height} from '$lib/stores/dims';
  import {gen_img_url} from '$lib/js/helpers';
  import CorrelAidXLogo from '$lib/svg/CorrelAidX_Logo.svelte';
  export let gradient_only;
  export let height;
  export let text;
  export let image_alt;
  export let buttons = [];
  export let correlaidx = false;
  export let image = void 0;
  let image_id;
  // TODO: Image ID remains undefined if image is undefined or null
  // This will create an invalid URL below in gen_img_url which is hard
  // to distinguish from incorrect urls through id errors for instance
  $: if (image != null) {
    image_id = image.id;
  }
</script>

<section
  class="relative flex w-screen items-center justify-center"
  style="
    {height == 'full'
    ? `height: calc(100vh - ${$header_height}px)`
    : `height: calc((100vh - ${$header_height}px)/2)`}"
>
  {#if gradient_only}
    <span
      class="absolute top-0 h-full w-screen bg-cover bg-center bg-no-repeat"
      style={`background-image: url(${gen_img_url(image_id)})`}
      role="img"
      aria-label={image_alt}
    />
  {/if}
  <div class="z-20 w-full">
    <div class="text_width mx-auto">
      <div class="">
        {#if correlaidx}
          <div class="flex justify-center">
            <CorrelAidXLogo width={250} height={250} />
          </div>
        {/if}
        <div class={correlaidx == true ? 'text-center' : ''}>
          <h2
            class="mx-4 text-4xl font-bold tracking-wide text-white {correlaidx
              ? 'inline-block bg-tertiary px-2 py-1 font-light'
              : ''}"
          >
            {text}
          </h2>
        </div>
        {#if Array.isArray(buttons) && buttons.length !== 0}
          <div
            class="mt-16 flex flex-col space-y-6 px-4 md:mt-12 md:flex-row md:space-x-5 md:space-y-0"
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
