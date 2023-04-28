<script>
  import LinkButton from './Link_Button.svelte';
  import {header_height} from '$lib/stores/dims';
  import {gen_img_url} from '$lib/js/helpers';
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
</script>

<section
  class="relative w-screen bg-cover bg-center bg-no-repeat"
  style="{gradient_only != true
    ? `background-image: url(${gen_img_url(image_id)});`
    : ''}
    {height == 'full'
    ? `height: calc(100vh - ${$header_height}px)`
    : `height: calc((100vh - ${$header_height}px)/2)`}"
>
  <div
    class="absolute inset-0 bg-gradient-to-r {correlaidx == false
      ? 'from-secondary/75 to-primary/75'
      : 'from-tertiary/75 to-secondary/75'}"
  />
  <div class="absolute bottom-2/4 w-full">
    <div class="text_width">
      <div class="">
        <h2 class="mx-4 text-4xl font-bold tracking-wide text-white">
          {text}
        </h2>
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
</section>
