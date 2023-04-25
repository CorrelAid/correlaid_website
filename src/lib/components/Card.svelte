<script>
  export let title;
  export let subtitle;
  export let href = '';
  export let language = '';
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  $: console.log(language);
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
  {href}
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <div class="px-3 pt-4 pb-6">
    {#if href != ''}
      <a
        class="mb-3 block text-xl font-semibold text-base-content transition hover:text-primary"
        {href}>{title}</a
      >
    {:else}
      <h3
        class="mb-3 block text-xl font-semibold text-base-content transition line-clamp-3"
      >
        {title}
      </h3>
    {/if}
    {#if language != ''}
      <div class="pb-2">
        {#if language == 'de-DE'}
          <De height={25} width={25} />
        {:else if language == 'en-US'}
          <En height={25} width={25} />
        {/if}
      </div>
    {/if}
    <h4 class="text-md">{subtitle}</h4>
  </div>
</div>
