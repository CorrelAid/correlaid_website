<script>
  import LinkButton from '$lib/components/LinkButton.svelte';
  import Html from '$lib/components/Html.svelte';
  let {buttonLink, buttonText, buttonColor, text, buttonType} = $props();
</script>

<div
  class="z-1 offset-right z-1 relative top-0 col-span-full rounded border border-neutral-25 bg-white py-4 lg:col-span-1"
>
  <div class="mb-8">
    <Html source={text} />
  </div>
  <div class="flex pb-10">
    <span class="mx-auto">
      <LinkButton
        href={buttonLink}
        text={buttonText}
        type={buttonType}
        color={buttonColor}
      />
    </span>
  </div>
</div>
