<script>
  import {t} from '$lib/stores/i18n';
  import {get_locale} from '$lib/js/helpers.js';
  import {page} from '$app/stores';
  import {page_key} from '$lib/stores/page_key';
  import {drawer} from '$lib/stores/drawer';
  import {no_scroll} from '$lib/stores/no_scroll';
  import {header_height} from '$lib/stores/dims';
  import CorrelAid_Logo from '$lib/svg/CorrelAid_Logo.svelte';
  import CorrelAid_Logo_min from '$lib/svg/CorrelAid_Logo_min.svelte';
  import MenuIcon from '$lib/svg/Menu_Icon.svelte';
  import LinkButton from '$lib/components/Link_Button.svelte';

  import HeaderTopNav from './Header/HeaderTopNav.svelte';
  import HeaderBottomNav from './Header/HeaderBottomNav.svelte';
  import MobileDrawer from './Header/MobileDrawer.svelte';
  import LanguageSelect from './Header/LanguageSelect.svelte';
  import {top_nav, bot_nav} from './Header/navConfig.js';

  let active_language;

  let botNavCloseAll;
  let lastClickedLink = '';

  function closeall() {
    if (typeof botNavCloseAll !== 'undefined') {
      botNavCloseAll();
    }
  }

  $: active_language = get_locale($page.params);
  $: $no_scroll = $drawer;
  $: lastClickedLink = $page_key;
  $: $page.url && closeall();
  $: $page.url && ($drawer = false);
</script>

<header
  class="fixed top-0 z-30 w-screen border-b border-neutral-25 bg-white xl:static"
  bind:clientHeight={$header_height}
  aria-label="Site Header"
>
  <div class="mx-auto px-4 sm:px-6 xl:px-8">
    <div class="flex grid-cols-10 items-center justify-between xl:grid">
      <!-- left part of navbar -->
      <div
        class="3xl:col-span-3 col-span-2 flex items-center justify-end gap-12"
      >
        <a class="hidden text-teal-600 xl:block" href={$t('navbar.home').url}>
          <span class="sr-only">Home</span>
          <CorrelAid_Logo width={100} height={100} />
        </a>
        <a class="block text-teal-600 xl:hidden" href={$t('navbar.home').url}>
          <span class="sr-only">Home</span>
          <CorrelAid_Logo_min width={60} height={60} />
        </a>
      </div>
      <!-- middle part of navbar -->
      <nav
        class="3xl:col-span-4 col-span-6 hidden flex-col xl:block"
        aria-label="Main"
      >
        <HeaderTopNav {top_nav} {lastClickedLink} />
        <HeaderBottomNav
          {bot_nav}
          {lastClickedLink}
          bind:closeall={botNavCloseAll}
        />
      </nav>
      <!-- right part of navbar -->
      <div
        class="3xl:col-span-3 col-span-2 hidden items-center justify-start gap-6 xl:flex"
      >
        <LinkButton
          text={$t('navbar.donate').text}
          href={$t('navbar.donate').url}
          type={'external'}
          color={`bg-secondary`}
        />
        <LanguageSelect bind:active_language on:changeLanguage />
      </div>
      <!-- Mobile menu button -->
      <div class="block xl:hidden">
        <button
          class="p-2 transition"
          aria-label={$t('access.open').text}
          on:click={() => ($drawer = !$drawer)}
        >
          <MenuIcon height={32} width={32} fill={'neutral-25'} />
        </button>
      </div>
    </div>
  </div>
</header>
<!-- Mobile Menu -->
{#if $drawer}
  <MobileDrawer {top_nav} {bot_nav} on:changeLanguage />
{/if}
