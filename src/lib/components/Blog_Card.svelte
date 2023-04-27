<script>
  export let i;
  export let langs;
  export let image_url;
  export let href;
  export let title;
  export let teaser;
  import De from '../svg/DE.svelte';
  import En from '../svg/EN.svelte';
  export let tags;
  export let content_creators;
</script>

<article
  class="relative min-h-full overflow-hidden rounded-lg border border-neutral-25 shadow-sm"
  style={i == 0 ? '' : ''}
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"
  />
  <div class="aspect-w-16 aspect-h-9">
    {#if image_url != null}
      <a {href} class="">
        <img alt="Office" src={image_url} class="h-full w-full" />
      </a>
    {:else}
      <a {href} class="h-full w-full bg-neutral"><div /></a>
    {/if}
  </div>
  <div class="p-4 sm:p-6">
    <a {href}>
      <h3
        class="text-xl font-semibold text-base-content transition hover:text-primary"
      >
        {title}
      </h3>
      <p class="flex space-x-2 pt-2">
        {#each langs as lang}
          {#if lang == 'de-DE'}
            <De height={25} width={25} />
          {:else}
            <En height={25} width={25} />
          {/if}
        {/each}
      </p>
    </a>

    <p class="pt-2 pb-4">
      {#each content_creators as person, i}
        {person.Content_Creators_id.person
          .name}{#if i < content_creators.length - 1}{', '} {/if}
      {/each}
    </p>

    <div class="flex w-full flex-wrap gap-2">
      {#each tags as tag}
        <span
          class="inline-flex items-center rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
          >{tag}</span
        >
      {/each}
    </div>
    <div class="py-4">
      <p
        class="overflow-hidden text-justify leading-relaxed text-base-content line-clamp-3"
      >
        {teaser}
      </p>
    </div>
  </div>
</article>
