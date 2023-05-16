<script>
  import LinkButton from '$lib/components/Link_Button.svelte';
  import Html from '$lib/components/Html.svelte';
  export let button_link;
  export let button_text;
  export let button_color;
  export let text;
</script>

<!-- <div class="border bg-gradient-to-r from-primary-75 to-secondary-75 text-white">
  test
</div> -->

<div
  class="z-1 offset-right z-1 relative top-0 col-span-full rounded border border-neutral-25 bg-white py-4 lg:col-span-1"
>
  <div class="mb-8">
    <Html source={text} />
  </div>
  <div class="flex pb-10">
    <span class="mx-auto">
      <LinkButton
        href={button_link}
        text={button_text}
        type={'external'}
        color={`bg-${button_color}`}
      />
    </span>
  </div>
</div>
