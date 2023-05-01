<script>
  import {t} from '$lib/stores/i18n';
  import {drawer} from '$lib/stores/drawer';
  import {locale} from '$lib/stores/i18n';
  import DropdownIcon from '$lib/svg/Dropdown_Icon.svelte';
  import LinkButton from '$lib/components/Link_Button.svelte';
  import {fly, fade} from 'svelte/transition';
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  function changeLocale() {
    dispatch('changeLanguage', {});
  }

  function btnLocale(lc) {
    $locale = lc;
    changeLocale();
  }

  let sidenav_width;

  export let top_nav;
  export let bot_nav;

  const toggles = {};
  for (const navItem of bot_nav) {
    toggles[navItem.category] = false;
  }

  function subnav(button) {
    closeall();
    toggles[button] = true;
  }

  function closeall() {
    for (const key in toggles) {
      if (typeof key === 'string') {
        toggles[key] = false;
      }
    }
  }
</script>

<div class="absolute z-30 h-screen w-screen xl:hidden" id="drawer">
  <div
    class="absolute left-0 z-30 flex h-screen w-5/6 flex-col justify-between border-r bg-white"
    id="drawer-sidenav"
    bind:clientWidth={sidenav_width}
    in:fly={{x: -sidenav_width, duration: 250}}
    out:fly={{x: -sidenav_width, duration: 250}}
  >
    <nav aria-label="Main Nav" class="flex flex-col pt-7 pl-7">
      <ul class="space-y-3 text-2xl text-base-content">
        {#each bot_nav as navItem}
          <li>
            <div class="inline-flex items-center">
              <a class="w-56 tracking-wide" href={$t(navItem.key).url}>
                {$t(navItem.key).text}
              </a>
              <button
                on:click={() =>
                  toggles[navItem.category]
                    ? (toggles[navItem.category] = false)
                    : subnav(navItem.category)}
              >
                <DropdownIcon height={30} width={30} />
              </button>
            </div>
          </li>
          {#if toggles[navItem.category]}
            <ul
              class="space-y-3 text-base font-light tracking-wide text-base-content"
            >
              {#each navItem.children as subnavItem}
                <li>
                  <a
                    class="transition hover:text-primary"
                    href={$t(subnavItem).url}
                  >
                    {$t(subnavItem).text}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        {/each}

        <ul
          class="space-y-3 pt-3 text-lg font-light tracking-wide text-base-content"
        >
          {#each top_nav as key}
            <li>
              <a class="transition hover:text-primary" href={$t(key).url}
                >{$t(key).text}</a
              >
            </li>
          {/each}
        </ul>
      </ul>
    </nav>

    <div class="">
      <div class="flex w-2/4 items-center pl-7 pb-7">
        <div class="mx-auto flex items-center gap-5">
          <LinkButton
            text={$t('navbar.donate').text}
            href={$t('navbar.donate').url}
            type={'external'}
            color={'secondary'}
          />
          <div class="flex">
            <button
              class="pr-5 text-xl font-light"
              on:click={() => btnLocale('de')}
            >
              de
            </button>
            <span class="border-l-2 border-neutral-25 pr-5" />
            <button class="text-xl font-light" on:click={() => btnLocale('en')}>
              en
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button
    class="absolute z-20 h-screen w-screen bg-neutral opacity-80"
    id="drawer-overlay"
    on:click={() => ($drawer = !$drawer)}
    in:fade={{delay: 0}}
    out:fade={{delay: 0}}
  />
</div>
