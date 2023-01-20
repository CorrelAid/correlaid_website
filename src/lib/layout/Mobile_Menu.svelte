<script>
    import { drawer } from "$lib/stores/drawer.js";
    import { t, locale } from "$lib/stores/i18n.js";
    import DropdownIcon from "../svg/Dropdown_Icon.svelte";
    import { fly,fade } from 'svelte/transition';

   
    function changeLocale() {
        dispatch("message", {
            locale: $locale,
        });
    }

    function btnLocale(lc) {
        $locale = lc;
        active_language = lc;
        language_toggle = false;
        closeDrawer();
        changeLocale();
    }

    let language_toggle = false;
    let about_toggle = false;
    let data4good_toggle = false;
    let education_toggle = false;
    let community_toggle = false;

    function subnav(btn) {
        function closeall() {
            about_toggle = false;
            data4good_toggle = false;
            education_toggle = false;
            community_toggle = false;
        }
        if (btn === "about") {
            if (about_toggle == true) {
                closeall();
            } else {
                about_toggle = true;
                data4good_toggle = false;
                education_toggle = false;
                community_toggle = false;
            }
        }
        if (btn === "data4good") {
            if (data4good_toggle == true) {
                closeall();
            } else {
                about_toggle = false;
                data4good_toggle = true;
                education_toggle = false;
                community_toggle = false;
            }
        }
        if (btn === "education") {
            if (education_toggle == true) {
                closeall();
            } else {
                about_toggle = false;
                data4good_toggle = false;
                education_toggle = true;
                community_toggle = false;
            }
        }
        if (btn === "community") {
            if (community_toggle == true) {
                closeall();
            } else {
                about_toggle = false;
                data4good_toggle = false;
                education_toggle = false;
                community_toggle = true;
            }
        }
    }

    let active_language = "de";
    $: active_language = $locale;
    let sidenav_width;
</script>

{#if $drawer}
    <div class="z-30 absolute w-screen h-screen lg:hidden" id="drawer" >
        <div
            class="flex flex-col justify-between w-5/6 h-screen bg-white border-r absolute left-0  z-30"
            id="drawer-sidenav" bind:clientWidth={sidenav_width} in:fly="{{ x: -sidenav_width, duration: 150 }}" out:fly="{{ x: -sidenav_width, duration: 150 }}"
        >
            <nav aria-label="Main Nav" class="flex flex-col pt-7 pl-7">
                <ul class="text-base-content text-2xl space-y-3">
                    <li>
                        <button
                            class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
                            on:click={() => subnav("about")}
                        >
                            {$t("navbar.about").text}
                            <DropdownIcon height={20} width={20} />
                        </button>
                    </li>
                    {#if about_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-2"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href="{$t('navbar.about.landing').url}</a"
                                >
                                    {$t("navbar.about.landing").text}</a
                                >
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.about.org_struct").url}
                                >
                                    {$t("navbar.about.org_struct").text}</a
                                >
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.about.org_struct.board")
                                        .url}
                                >
                                    {$t("navbar.about.org_struct.board").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.about.org_struct.remote_office"
                                    ).url}
                                >
                                    {$t("navbar.about.org_struct.remote_office")
                                        .text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.about.org_struct.ethics_commission"
                                    ).url}
                                >
                                    {$t(
                                        "navbar.about.org_struct.ethics_commission"
                                    ).text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.about.coc").url}
                                >
                                    {$t("navbar.about.coc").text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.about.partners").url}
                                >
                                    {$t("navbar.about.partners").text}
                                </a>
                            </li>
                        </ul>
                    {/if}
                    <li>
                        <button
                            class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
                            on:click={() => subnav("data4good")}
                        >
                            {$t("navbar.data4good").text}
                            <DropdownIcon height={20} width={20} />
                        </button>
                    </li>
                    {#if data4good_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-2"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.data4good.landing").url}
                                >
                                    {$t("navbar.data4good.landing").text}</a
                                >
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.data4good.projects").url}
                                >
                                    {$t("navbar.data4good.projects").text}</a
                                >
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.data4good.nonprofits").url}
                                >
                                    {$t("navbar.data4good.nonprofits").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.data4good.nonprofits.comission"
                                    ).url}
                                >
                                    {$t("navbar.data4good.nonprofits.comission")
                                        .text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.data4good.nonprofits.data_hour"
                                    ).url}
                                >
                                    {$t("navbar.data4good.nonprofits.data_hour")
                                        .text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.data4good.nonprofits.data_dialogues"
                                    ).url}
                                >
                                    {$t(
                                        "navbar.data4good.nonprofits.data_dialogues"
                                    ).text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.data4good.nonprofits.hackathons"
                                    ).url}
                                >
                                    {$t(
                                        "navbar.data4good.nonprofits.hackathons"
                                    ).text}
                                </a>
                            </li>
                        </ul>
                    {/if}
                    <li>
                        <button
                            class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
                            on:click={() => subnav("education")}
                        >
                            {$t("navbar.education").text}
                            <DropdownIcon height={20} width={20} />
                        </button>
                    </li>
                    {#if education_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-2"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.landing").url}
                                >
                                    {$t("navbar.education.landing").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.nonprofits").url}
                                >
                                    {$t("navbar.education.nonprofits").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.education.nonprofits.workshops"
                                    ).url}
                                >
                                    {$t("navbar.education.nonprofits.workshops")
                                        .text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.education.nonprofits.learning_r"
                                    ).url}
                                >
                                    {$t(
                                        "navbar.education.nonprofits.learning_r"
                                    ).text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.education.nonprofits.experts"
                                    ).url}
                                >
                                    {$t("navbar.education.nonprofits.experts")
                                        .text}
                                </a>
                            </li>
                        </ul>
                    {/if}
                    <li>
                        <button
                            class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
                            on:click={() => subnav("community")}
                        >
                            {$t("navbar.community").text}
                            <DropdownIcon height={20} width={20} />
                        </button>
                    </li>
                    {#if community_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-2"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.community.landing").url}
                                >
                                    {$t("navbar.community.landing").text}</a
                                >
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.community.local_chapters")
                                        .url}
                                >
                                    {$t("navbar.community.local_chapters").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.community.founding_lc")
                                        .url}
                                >
                                    {$t("navbar.community.founding_lc").text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t(
                                        "navbar.community.volunteer_journeys"
                                    ).url}
                                >
                                    {$t("navbar.community.volunteer_journeys")
                                        .text}
                                </a>
                            </li>
                        </ul>
                    {/if}
                </ul>
                <ul
                    class="font-light text-base-content tracking-wide text-lg space-y-3 pt-3"
                >
                    <li>
                        <a
                            class="hover:text-primary transition"
                            href={$t("navbar.events").url}
                            >{$t("navbar.events").text}</a
                        >
                    </li>

                    <li>
                        <a
                            class="hover:text-primary transition"
                            href={$t("navbar.blog").url}
                            >{$t("navbar.blog").text}</a
                        >
                    </li>

                    <li>
                        <a
                            class="hover:text-primary transition"
                            href={$t("navbar.podcast").url}
                            >{$t("navbar.podcast").text}</a
                        >
                    </li>

                    <li>
                        <a
                            class="hover:text-primary transition"
                            href={$t("navbar.newsletter").url}
                            >{$t("navbar.newsletter").text}</a
                        >
                    </li>
                </ul>
            </nav>

            <div class="sticky inset-x-0 bottom-0 ">
                <div class="flex items-center  mx-auto w-2/4 pb-7">
                    <div class="flex items-center gap-4 mx-auto">
                        <a
                            class="rounded-md bg-secondary px-4 py-2  text-white shadow"
                            href={$t("navbar.donate").url}
                        >
                            {$t("navbar.donate").text}
                        </a>
                        <div class="flex">
                            <button
                                class="pr-3 text-xl"
                                on:click={() => btnLocale("de")}
                            >
                                de
                            </button>
                            <span class="border-l-2 border-neutral-25 pr-3" />
                            <button
                                class="text-xl"
                                on:click={() => btnLocale("en")}
                            >
                                en
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button
            class="absolute h-screen w-screen bg-neutral z-20 opacity-80"
            id="drawer-overlay"
            on:click={() => ($drawer = !$drawer)} in:fade={{ delay: -150 }} out:fade={{ delay: -150 }}
        />
    </div>
{/if}


