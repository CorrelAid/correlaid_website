<script>
  import {t, locale} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import {drawer} from '$lib/stores/drawer';
  import {no_scroll} from '$lib/stores/no_scroll';
  import {header_height} from '$lib/stores/dims';
  import {createEventDispatcher} from 'svelte';
  import CorrelAid_Logo from '$lib/svg/CorrelAid_Logo.svelte';
  import CorrelAid_Logo_min from '$lib/svg/CorrelAid_Logo_min.svelte';
  import MenuIcon from '../svg/Menu_Icon.svelte';
  import DropdownIcon from '../svg/Dropdown_Icon.svelte';
  import LinkButton from '$lib/components/Link_Button.svelte';
  import HeaderTopNav from './HeaderTopNav.svelte';
  import HeaderBottomNav from './HeaderBottomNav.svelte';
  import MobileDrawer from './MobileDrawer.svelte';

  let language_toggle = false;
  let active_language = $locale;
  let drawerLocale = $locale;
  let botNavCloseAll;

  const dispatch = createEventDispatcher();

  function changeLocale() {
    dispatch('message', {});
  }

  function btnLocale(lc) {
    $locale = lc;
    active_language = lc;
    language_toggle = false;
    changeLocale();
  }

  function lang_dropdown() {
    language_toggle ? (language_toggle = false) : (language_toggle = true);
  }

  function closeall() {
    if (typeof botNavCloseAll !== 'undefined') {
      botNavCloseAll();
    }
  }

  $: $no_scroll = $drawer;
  $: $page.url && closeall();
  $: $page.url && ($drawer = false);
  $: btnLocale(drawerLocale);

  const top_nav = [
    'navbar.events',
    'navbar.blog',
    'navbar.podcast',
    'navbar.newsletter',
  ];
  const bot_nav = [
    {
      key: 'navbar.about',
      category: 'about',
      children: [
        'navbar.about.team',
        'navbar.about.values',
        'navbar.about.partners',
      ],
    },
    {
      key: 'navbar.using_data',
      category: 'using_data',
      children: [
        'navbar.using_data.projects',
        'navbar.using_data.consulting',
        'navbar.using_data.hackathons',
      ],
    },
    {
      key: 'navbar.education',
      category: 'education',
      children: [
        'navbar.education.resources',
        'navbar.education.learning_r',
        'navbar.education.tidy_tuesday',
        'navbar.education.mentoring',
      ],
    },
    {
      key: 'navbar.community',
      category: 'community',
      children: [
        'navbar.community.correlaidx',
        'navbar.community.founding_lc',
        // "navbar.community.volunteer_journeys",
        'navbar.community.become_member',
      ],
    },
  ];
</script>

<header
  aria-label="Site Header"
  class="fixed top-0 z-30 w-screen border-b border-neutral-25 bg-white xl:static"
  bind:clientHeight={$header_height}
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
      <div class="3xl:col-span-4 col-span-6 hidden flex-col xl:block">
        <HeaderTopNav {top_nav} />
        <HeaderBottomNav {bot_nav} bind:closeall={botNavCloseAll} />
      </div>
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
        <div
          class="inline-flex items-stretch rounded-md border border-neutral-25"
        >
          <span class="rounded-l-md px-4 py-2 text-sm text-base-content">
            {active_language}
          </span>

          <div class="relative">
            <button
              type="button"
              class="z-10 inline-flex h-full items-center justify-center rounded-r-md border-l border-neutral-25 px-2"
              on:click={lang_dropdown}
            >
              <span class="sr-only">Language</span>

              <DropdownIcon height={20} width={20} />
            </button>
            {#if language_toggle}
              <div
                class="absolute right-0 z-10 mt-1 origin-top-right rounded-md border border-neutral-25 bg-white shadow-lg"
                role="menu"
                on:mouseleave={lang_dropdown}
              >
                <div class="p-2">
                  <button
                    class="primary flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm
										text-base-content hover:text-primary"
                    role="menuitem"
                    on:click={() => btnLocale('de')}
                  >
                    Deutsch
                  </button>
                  <button
                    class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-base-content hover:text-primary"
                    role="menuitem"
                    on:click={() => btnLocale('en')}
                  >
                    English
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
      <!-- Mobile menu button -->
      <div class="block xl:hidden">
        <button class="p-2 transition" on:click={() => ($drawer = !$drawer)}>
          <MenuIcon height={32} width={32} fill={'neutral-25'} />
        </button>
      </div>
    </div>
  </div>
</header>
<!-- Mobile Menu -->
{#if $drawer}
  <MobileDrawer {top_nav} {bot_nav} bind:buttonLocale={drawerLocale} />
{/if}
