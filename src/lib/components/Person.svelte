<script>
  export let name;
  export let position = '';
  export let description;
  export let img;
  export let mastodon = '';
  export let website = '';
  export let twitter = '';
  export let linkedin = '';
  export let github = '';
  export let email = '';
  import Avatar from '$lib/components/Avatar.svelte';
  import Links from '$lib/components/Links.svelte';
</script>

<div class="text_width grid grid-cols-8 gap-x-12 rounded pb-6 pt-8">
  {#if img}
    <div class="col-span-full xl:col-span-3">
      <Avatar src={img} alt={name} />
    </div>
  {/if}
  <div class="col-span-full px-4 pt-5 text-neutral xl:col-span-5 xl:pt-0">
    <h2 class="pb-3 text-2xl text-primary">{name}</h2>
    {#if position != ''}
      <h3 class="pb-3 text-lg">{position}</h3>
    {/if}
    {#if description != ''}
      <p class="pb-3">{description}</p>
    {/if}
    {#if email != ''}
      <p><a class="text-secondary" href="mailto:{email}">{email}</a></p>
    {/if}

    <Links {website} {mastodon} {twitter} {linkedin} {github} />
  </div>
</div>
