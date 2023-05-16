<script>
  import {t} from '$lib/stores/i18n';
  import {drawer} from '$lib/stores/drawer';
  import {header_height} from '$lib/stores/dims';
  import HeaderBottomNavButton from './HeaderBottomNavButton.svelte';

  export let bot_nav;

  export let lastClickedLink = '';

  const toggles = {};
  for (const navItem of bot_nav) {
    toggles[navItem.category] = false;
  }

  function subnav(button) {
    closeall();
    toggles[button] = true;
  }

  export const closeall = () => {
    for (const key in toggles) {
      if (typeof key === 'string') {
        toggles[key] = false;
      }
    }
  };

  function handle_dropdown(event) {
    subnav(event.detail.category);
  }

  function isSubPage(pagePath, subPageCandidatePath) {
    const startIndex = subPageCandidatePath.indexOf(pagePath);
    return startIndex === 0;
  }

  $: $drawer && closeall();
</script>

<svelte:window on:load={closeall} />

<div class="mx-auto flex items-center gap-12">
  <div class="mx-auto hidden xl:block">
    <nav aria-label="Site Nav Bottom">
      <ul class="flex items-center gap-8 text-xl">
        {#each bot_nav as navItem}
          <li>
            <div
              class=""
              class:font-medium={isSubPage(navItem.key, lastClickedLink)}
              class:text-secondary={isSubPage(navItem.key, lastClickedLink)}
              data-testid={'navColoringTest-' + navItem.key}
            >
              <HeaderBottomNavButton
                href={$t(navItem.key).url}
                text={$t(navItem.key).text}
                category={navItem.category}
                on:message={handle_dropdown}
              />
            </div>
            {#if toggles[navItem.category]}
              <div
                class="absolute z-30 -ml-4 w-56"
                on:mouseleave={closeall}
                style="top: {$header_height + 1}px"
              >
                <ul
                  class="rounded-b border-x border-b border-neutral-25 bg-white pb-1 pt-2 text-base font-light text-base-content"
                >
                  {#each navItem.children as subnavItem}
                    <li class="px-4 pb-2">
                      <a
                        class="transition hover:text-primary"
                        href={$t(subnavItem).url}
                      >
                        {$t(subnavItem).text}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>
