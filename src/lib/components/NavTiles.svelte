<script>
  export let navItems;
  const icon_size = 73;
  import {t} from '$lib/stores/i18n';
  const colorScale = ['#3864a3', '#538794', '#6fa07f', '#78a972', '#96c342'];
</script>

<div
  class="mx-4 flex flex-wrap md:grid {navItems.length % 2 == 0
    ? 'md:grid-cols-2'
    : 'md:grid-cols-3'} gap-8 md:place-content-center"
>
  {#each navItems as item, i}
    <div
      class="flex items-center {navItems.length % 2 == 0
        ? i % 2 == 0
          ? 'md:justify-end'
          : 'md:justify-start'
        : 'md:justify-center'}"
    >
      <a
        href={$t(item.key).url}
        class="flex h-36 w-36 items-center justify-center rounded opacity-80 md:h-44 md:w-44"
        style="background-color: {colorScale[i]};"
      >
        <div class="flex flex-col items-center justify-center opacity-100">
          <svelte:component
            this={item.icon}
            height={icon_size}
            width={icon_size}
            fill={'white'}
          />

          <h2
            class="break-word mx-2 pt-2 text-center font-londrina text-xl leading-6 tracking-[0.025em] text-white opacity-100 md:text-2xl md:leading-7"
          >
            {$t(item.key).text === 'Bildungsressourcen'
              ? 'Ressourcen'
              : $t(item.key).text}
          </h2>
        </div>
      </a>
    </div>
  {/each}
</div>
