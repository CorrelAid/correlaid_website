<script>
  export let navItems;
  const icon_size = 73;
  import {t} from '$lib/stores/i18n';
  const colorScale = ['#3864a3', '#538794', '#6fa07f', '#78a972', '#96c342'];
</script>

<div
  class="mx-4 grid grid-cols-[repeat(auto-fit,minmax(144px,max-content))] justify-center gap-8 p-[initial] md:grid-cols-[repeat(auto-fit,minmax(176px,max-content))]"
>
  {#each navItems as item, i}
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
  {/each}
</div>
