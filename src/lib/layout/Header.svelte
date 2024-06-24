<script>
  import {t} from '$lib/stores/i18n';
  import {getLocale} from '$lib/js/helpers.js';
  import {page} from '$app/stores';
  import {pageKey} from '$lib/stores/pageKey';
  import {drawer} from '$lib/stores/drawer';
  import {noScroll} from '$lib/stores/noScroll';
  import {headerHeight} from '$lib/stores/dims';
  import CorrelaidLogo from '$lib/svg/CorrelaidLogo.svelte';
  import CorrelaidLogoMin from '$lib/svg/CorrelaidLogoMin.svelte';
  import MenuIcon from '$lib/svg/MenuIcon.svelte';
  import LinkButton from '$lib/components/LinkButton.svelte';

  import HeaderTopNav from './Header/HeaderTopNav.svelte';
  import HeaderBottomNav from './Header/HeaderBottomNav.svelte';
  import MobileDrawer from './Header/MobileDrawer.svelte';
  import LanguageSelect from './Header/LanguageSelect.svelte';
  import {topNav, botNav} from './Header/navConfig.js';

  let activeLanguage;

  let botNavCloseAll;
  let lastClickedLink = '';

  function closeall() {
    if (typeof botNavCloseAll !== 'undefined') {
      botNavCloseAll();
    }
  }

  $: activeLanguage = getLocale($page.params);
  $: $noScroll = $drawer;
  $: lastClickedLink = $pageKey;
  $: $page.url && closeall();
  $: $page.url && ($drawer = false);
</script>

<header
  class="fixed top-0 z-30 w-screen border-b border-neutral-25 bg-white xl:static"
  bind:clientHeight={$headerHeight}
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
          <CorrelaidLogo width={100} height={100} />
        </a>
        <a class="block text-teal-600 xl:hidden" href={$t('navbar.home').url}>
          <span class="sr-only">Home</span>
          <CorrelaidLogoMin width={63} height={63} />
        </a>
      </div>
      <!-- middle part of navbar -->
      <nav
        class="3xl:col-span-4 col-span-6 hidden flex-col xl:block"
        aria-label="Main"
      >
        <HeaderTopNav {topNav} {lastClickedLink} />
        <HeaderBottomNav
          {botNav}
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
        <LanguageSelect bind:activeLanguage on:changeLanguage />
      </div>

      <div class="block flex items-center justify-end xl:hidden">
        <span class="mr-4">
          <LinkButton
            text={$t('navbar.donate').text}
            href={$t('navbar.donate').url}
            options={'text-sm min-w-[115px] !py-[6.5px]'}
            iconSize={17}
            type={'external'}
            color={'bg-secondary'}
          />
        </span>
        <button
          class="p-2 transition"
          aria-label={$t('access.open').text}
          on:click={() => ($drawer = !$drawer)}
        >
          <MenuIcon height={37} width={37} fill={'neutral-25'} />
        </button>
      </div>
    </div>
  </div>
</header>
<!-- Mobile Menu -->

{#if $drawer}
  <MobileDrawer {topNav} {botNav} on:changeLanguage />
{/if}
