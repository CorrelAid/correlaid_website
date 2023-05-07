<script>
  export let name;
  export let position = '';
  export let description = '';
  export let img = void 0;
  export let links;
  export let email = '';
  export let pronouns = '';
  import Avatar from '$lib/components/Avatar.svelte';
  import Links from '$lib/components/Links.svelte';
</script>

<div class="grid grid-cols-8 gap-x-12 rounded pb-6 pt-8">
  <div class="col-span-full md:col-span-3">
    <Avatar src={img} alt={name} />
  </div>

  <div class="col-span-full pt-5 text-neutral md:col-span-5 md:pt-0">
    <h2 class="pb-3 text-2xl text-primary">
      {name}
      {pronouns && pronouns != '' ? `(${pronouns})` : ''}
    </h2>
    {#if position}
      <h3 class="pb-3 text-lg">{position}</h3>
    {/if}
    {#if description}
      <p class="pb-3 text-justify">{description}</p>
    {/if}
    {#if email && email != ''}
      <p class="pb-5">
        <a
          class="font-normal text-secondary no-underline hover:underline"
          href="mailto:{email}">{email}</a
        >
      </p>
    {/if}

    <Links {...links} />
  </div>
</div>
