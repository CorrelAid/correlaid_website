<script>
  import {locale} from '$lib/stores/i18n';
  import {createEventDispatcher} from 'svelte';
  import DropdownIcon from '$lib/svg/DropdownIcon.svelte';
  import {t} from '$lib/stores/i18n';

  let languageToggle = $state(false);

  const dispatch = createEventDispatcher();

  function changeLocale() {
    dispatch('changeLanguage', {});
  }

  function langDropdown() {
    languageToggle ? (languageToggle = false) : (languageToggle = true);
    aria === true ? (aria = false) : (aria = true);
  }

  function btnLocale(lc) {
    $locale = lc;
    activeLanguage = lc;
    languageToggle = false;
    changeLocale();
  }
  let aria = $state(false);
  let {activeLanguage = $bindable()} = $props();
</script>

<div class="inline-flex items-stretch rounded-md border border-neutral-25">
  <span class="rounded-l-md px-4 py-2 text-sm text-base-content">
    {activeLanguage}
  </span>

  <div class="relative">
    <button
      type="button"
      class="z-10 inline-flex h-full items-center justify-center rounded-r-md border-l border-neutral-25 px-2"
      onclick={langDropdown}
      aria-expanded={aria}
      aria-label={$t('access.language').text}
    >
      <DropdownIcon height={20} width={20} />
    </button>
    {#if languageToggle}
      <div
        class="absolute right-0 z-10 mt-1 origin-top-right rounded-md border border-neutral-25 bg-white shadow-lg"
        role="menu"
        tabindex="-1"
        onmouseleave={langDropdown}
      >
        <div class="p-2">
          <button
            class="primary flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm
                                text-base-content hover:text-primary"
            role="menuitem"
            onclick={() => btnLocale('de')}
          >
            Deutsch
          </button>
          <button
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-base-content hover:text-primary"
            role="menuitem"
            onclick={() => btnLocale('en')}
          >
            English
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
