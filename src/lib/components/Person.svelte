<script>
  import Avatar from '$lib/components/Avatar.svelte';
  import Links from '$lib/components/Links.svelte';
  import Html from '$lib/components/Html.svelte';

  let {
    name,
    position = '',
    description = '',
    imageSrc = void 0,
    links,
    email = '',
    pronouns = '',
    imageDesc = void 0,
    imageAlt,
  } = $props();
</script>

<div class="grid grid-cols-8 gap-x-9 rounded pb-6 pt-2">
  <div class="col-span-full flex items-center justify-center md:col-span-3">
    <Avatar {imageSrc} {imageAlt} {imageDesc} />
  </div>

  <div class="col-span-full pt-5 text-neutral md:col-span-5 md:pt-0">
    <h2 class="pb-4 text-2xl font-normal text-primary drop-shadow-sm">
      {name}
      {pronouns && pronouns != '' ? `(${pronouns})` : ''}
    </h2>
    {#if position}
      <h3 class="pb-2 text-lg font-normal">{position}</h3>
    {/if}
    {#if description}
      <Html source={description} options={'!px-0 pb-2'} />
    {/if}
    {#if email && email != ''}
      <p class="pb-4">
        <a
          class="font-normal text-secondary underline drop-shadow-sm"
          href="mailto:{email}">{email}</a
        >
      </p>
    {/if}

    <Links {...links} />
  </div>
</div>
