<script>
    import { drawer } from "$lib/stores/drawer";
    import { t, locale } from "$lib/stores/i18n";
    import { fly, fade } from "svelte/transition";
    import { page } from "$app/stores";
    import DropdownIcon from "../svg/Dropdown_Icon.svelte";
    import LinkButton from "$lib/components/Link_Button.svelte";

    function changeLocale() {
        dispatch("message", {
            locale: $locale,
        });
    }

    function btnLocale(lc) {
        $locale = lc;
        active_language = lc;
        language_toggle = false;
        changeLocale();
    }
   
    let language_toggle = false;
    let about_toggle = false;
    let data4good_toggle = false;
    let education_toggle = false;
    let community_toggle = false;

    function closeall() {
        about_toggle = false;
        data4good_toggle = false;
        education_toggle = false;
        community_toggle = false;
    }

    function subnav(btn) {
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
    $: $page.url && ($drawer = false);
    $: $drawer && closeall();
</script>

{#if $drawer}
    <div class="z-30 absolute w-screen h-screen lg:hidden" id="drawer">
        <div
            class="flex flex-col justify-between w-5/6 h-screen bg-white border-r absolute left-0  z-30"
            id="drawer-sidenav"
            bind:clientWidth={sidenav_width}
            in:fly={{ x: -sidenav_width, duration: 250 }}
            out:fly={{ x: -sidenav_width, duration: 250 }}
        >
            <nav aria-label="Main Nav" class="flex flex-col pt-7 pl-7">
                <ul class="text-base-content text-2xl space-y-3">
                    <li>
                        <div class="inline-flex items-center justify-center">
                            <a
                                class="tracking-wide"
                                href={$t("navbar.about").url}
                                on:click={() => subnav("about")}
                            >
                                {$t("navbar.about").text}
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="inline-flex items-center">
                            <a
                                class="tracking-wide w-56"
                                href={$t("navbar.data4good").url}
                            >
                                {$t("navbar.data4good").text}
                            </a>
                            <button on:click={() => subnav("data4good")}>
                                <DropdownIcon height={30} width={30} />
                            </button>
                        </div>
                    </li>
                    {#if data4good_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-3"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.data4good.projects").url}
                                >
                                    {$t("navbar.data4good.projects").text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.data4good.nonprofits").url}
                                >
                                    {$t("navbar.data4good.nonprofits").text}
                                </a>
                            </li>
                        </ul>
                    {/if}
                    <li>
                        <div class="inline-flex items-center">
                            <a
                                class="tracking-wide w-56"
                                href={$t("navbar.education").url}
                            >
                                {$t("navbar.education").text}
                            </a>
                            <button on:click={() => subnav("education")}>
                                <DropdownIcon height={30} width={30} />
                            </button>
                        </div>
                    </li>
                    {#if education_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-3"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.workshops").url}
                                >
                                    {$t("navbar.education.workshops").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.experts").url}
                                >
                                    {$t("navbar.education.experts").text}
                                </a>
                            </li>

                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.learning_r").url}
                                >
                                    {$t("navbar.education.learning_r").text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.knowledge_pool")
                                        .url}
                                >
                                    {$t("navbar.education.knowledge_pool").text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.tidy_tuesday")
                                        .url}
                                >
                                    {$t("navbar.education.tidy_tuesday").text}
                                </a>
                            </li>
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.education.mentoring").url}
                                >
                                    {$t("navbar.education.mentoring").text}
                                </a>
                            </li>
                        </ul>
                    {/if}
                    <li>
                        <div class="inline-flex items-center">
                            <a
                                class="tracking-wide w-56"
                                href={$t("navbar.community").url}
                            >
                                {$t("navbar.community").text}
                            </a>
                            <button on:click={() => subnav("community")}>
                                <DropdownIcon height={30} width={30} />
                            </button>
                        </div>
                    </li>
                    {#if community_toggle}
                        <ul
                            class="font-light text-base-content tracking-wide text-base space-y-3"
                        >
                            <li>
                                <a
                                    class="hover:text-primary transition"
                                    href={$t("navbar.community.correlaidx").url}
                                >
                                    {$t("navbar.community.correlaidx").text}
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
                    <div class="flex items-center gap-5 mx-auto">
                        <LinkButton
                            text={$t("navbar.donate").text}
                            href={$t("navbar.donate").url}
                            type={"external"}
                            color={"secondary"}
                        />
                        <div class="flex">
                            <button
                                class="pr-5 text-xl font-light"
                                on:click={() => btnLocale("de")}
                            >
                                de
                            </button>
                            <span class="border-l-2 border-neutral-25 pr-5" />
                            <button
                                class="text-xl font-light"
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
            on:click={() => ($drawer = !$drawer)}
            in:fade={{ delay: 0 }}
            out:fade={{ delay: 0 }}
        />
    </div>
{/if}

<style>
</style>
