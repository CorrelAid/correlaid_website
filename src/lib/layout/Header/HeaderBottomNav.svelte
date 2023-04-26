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

  $: $drawer && closeall();
</script>

<svelte:window on:load={closeall} />

<div class="mx-auto flex items-center gap-12">
  <div class="mx-auto hidden xl:block">
    <nav aria-label="Site Nav">
      <div class="flex items-center gap-6 text-xl text-base-content">
        {#each bot_nav as navItem}
          <div>
            <div
              class="pl-4"
              class:font-medium={lastClickedLink === navItem.key}
              class:text-secondary={lastClickedLink === navItem.key}
            >
              <HeaderBottomNavButton
                href={$t(navItem.key).url}
                text={$t(navItem.key).text}
                category={navItem.category}
                on:message={handle_dropdown}
                on:click={() => {
                  closeall();
                  lastClickedLink = navItem.key;
                }}
              />
            </div>
            {#if toggles[navItem.category]}
              <div
                class="absolute z-30 w-56"
                on:mouseleave={closeall}
                style="top: {$header_height + 1}px"
              >
                <ul
                  class="rounded-b border-x border-b border-neutral-25 bg-white py-2 text-base font-light text-base-content"
                >
                  {#each navItem.children as subnavItem}
                    <li class="px-4 pb-2">
                      <a
                        class="transition hover:text-primary"
                        href={$t(subnavItem).url}
                        on:click={() => {
                          closeall();
                          lastClickedLink = navItem.key;
                        }}
                      >
                        {$t(subnavItem).text}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </nav>
  </div>
</div>
