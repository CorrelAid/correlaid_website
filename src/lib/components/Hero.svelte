<script>
  import LinkButton from './Link_Button.svelte';
  import {header_height} from '$lib/stores/dims';
  import {gen_img_url} from '$lib/js/helpers';
  import CorrelAidXLogo from '$lib/svg/CorrelAidX_Logo.svelte';
  export let image;
  export let gradient_only;
  export let height;
  export let text;
  export let buttons = [];
  export let correlaidx = false;

  let image_id;
  $: if (image != null) {
    image_id = image.id;
  }

  $: console.log(image);
</script>

<section
  class="relative flex w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
  style="{gradient_only != true
    ? `background-image: url(${gen_img_url(image_id)});`
    : ''}
    {height == 'full'
    ? `height: calc(100vh - ${$header_height}px)`
    : `height: calc((100vh - ${$header_height}px)/2)`}"
>
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
        {#if buttons != []}
          <div
            class="mt-16 flex flex-col space-y-6 px-4 md:mt-12 md:flex-row md:space-x-5 md:space-y-0"
          >
            {#each buttons as button}
              <LinkButton
                text={button.buttons_id.translations[0].text}
                href={button.buttons_id.translations[0].link}
                color={`bg-${button.buttons_id.color}`}
              />
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
