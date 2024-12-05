<script>
  import {t} from '$lib/stores/i18n';
  import {drawer} from '$lib/stores/drawer';
  import {locale} from '$lib/stores/i18n';
  import DropdownIcon from '$lib/svg/DropdownIcon.svelte';
  import LinkButton from '$lib/components/LinkButton.svelte';
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

  let sidenavWidth;

  export let topNav;
  export let botNav;

  const toggles = {};

  for (const navItem of botNav) {
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

<div class="dvh-100 absolute z-30 w-screen xl:hidden" id="drawer">
  <div
    class="dvh-100 absolute left-0 z-30 flex w-5/6 flex-col justify-between border-r bg-white"
    id="drawer-sidenav"
    bind:clientWidth={sidenavWidth}
    in:fly={{x: -sidenavWidth, duration: 250}}
    out:fly={{x: -sidenavWidth, duration: 250}}
  >
    <nav aria-label="Main" class="z-30 flex flex-col pl-7 pt-7">
      <ul class="space-y-3 text-2xl text-base-content">
        {#each botNav as navItem}
          <li>
            <div class="inline-flex items-center">
              <a class="w-56 tracking-wide" href={$t(navItem.key).url}>
                {$t(navItem.key).text}
              </a>
              <button
                aria-label="Dropdown: {$t(navItem.key).text}"
                aria-expanded={toggles[navItem.category] === true
                  ? 'true'
                  : 'false'}
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
        <li>
          <ul
            class="space-y-3 pt-3 text-lg font-light tracking-wide text-base-content"
          >
            {#each topNav as key}
              <li>
                <a class="transition hover:text-primary" href={$t(key).url}
                  >{$t(key).text}</a
                >
              </li>
            {/each}
          </ul>
        </li>
      </ul>
    </nav>

    <div class="flex items-center pb-7">
      <div class="mx-auto flex items-center justify-center gap-5">
        <LinkButton
          text={$t('navbar.support').text}
          href={$t('navbar.support').url}
          options={'text-sm min-w-[115px] !py-[6.5px]'}
          iconSize={17}
          color={'bg-secondary'}
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
  <button
    class="absolute z-20 h-screen w-screen bg-neutral opacity-80"
    id="drawer-overlay"
    aria-label={$t('access.close').text}
    on:click={() => ($drawer = !$drawer)}
    in:fade={{delay: 0}}
    out:fade={{delay: 0}}
  />
</div>
