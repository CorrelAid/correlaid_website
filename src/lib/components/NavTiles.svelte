<script>
  const iconSize = 73;
  import {t} from '$lib/stores/i18n';
  let {navItems} = $props();
  const colorScale = ['#3864a3', '#538794', '#6fa07f', '#78a972', '#96c342'];

  function getText(translation) {
    let text = translation;

    if (text === 'Bildungsressourcen') {
      text = 'Ressourcen';
    } else if (text == 'Projektdatenbank') {
      text = 'ProjektDB';
    }
    return text;
  }
</script>

<div class="mx-4 flex flex-wrap gap-8">
  {#each navItems as item, i}
    <div class="flex">
      <a
        href={$t(item.key).url}
        class="flex h-36 w-36 items-center justify-center rounded opacity-80 md:h-44 md:w-44"
        style="background-color: {colorScale[i]};"
      >
        <div class="flex flex-col items-center justify-center opacity-100">
          <item.icon height={iconSize} width={iconSize} fill={'white'} />

          <h2
            class="w-42 mx-2 break-words pt-2 text-center font-londrina text-xl leading-6 tracking-[0.025em] text-white opacity-100 md:text-2xl md:leading-7"
          >
            {getText($t(item.key).text)}
          </h2>
        </div>
      </a>
    </div>
  {/each}
</div>
