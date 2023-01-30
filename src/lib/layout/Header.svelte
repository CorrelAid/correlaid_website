<script>
	import CorrelAid_Logo from "$lib/svg/CorrelAid_Logo.svelte";
	import { t, locale } from "$lib/stores/i18n.js";
	import { page } from "$app/stores";
	import { drawer } from "$lib/stores/drawer.js";
	import { header_height } from "$lib/stores/dims.js";
	import { createEventDispatcher } from "svelte";
	import NavLink from "$lib/components/Nav_Link.svelte";
	import NavLinkButton from "$lib/components/Nav_Link_Button.svelte";
	import SubnavLink from "$lib/components/Subnav_Link.svelte";
	import MenuIcon from "../svg/Menu_Icon.svelte";
	import DropdownIcon from "../svg/Dropdown_Icon.svelte";
	import LinkButton from "$lib/components/Link_Button.svelte";
	import MobileMenu from "./Mobile_Menu.svelte";

	let language_toggle = false;
	let data4good_toggle = false;
	let education_toggle = false;
	let community_toggle = false;
	let active_language = "de";

	const dispatch = createEventDispatcher();

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

	function handle_dropdown(event) {
		subnav(event.detail.category);
	}

	function closeall() {
		data4good_toggle = false;
		education_toggle = false;
		community_toggle = false;
	}

	$: $page.url && closeall();

	function subnav(btn) {
		if (btn === "data4good") {
			data4good_toggle = true;
			education_toggle = false;
			community_toggle = false;
		}

		if (btn === "education") {
			data4good_toggle = false;
			education_toggle = true;
			community_toggle = false;
		}

		if (btn === "community") {
			data4good_toggle = false;
			education_toggle = false;
			community_toggle = true;
		}
	}
	$: active_language = $locale;
</script>

<svelte:window on:load={() => closeall} />

<header
	aria-label="Site Header"
	class="w-screen   z-10 border-b border-neutral-25"
	bind:clientHeight={$header_height}
>
	<div class="mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 ">
		<div class="flex items-center justify-between xl:grid grid-cols-10">
			<div class="flex items-center gap-12  col-span-2">
				<a
					class="block text-teal-600 mx-auto"
					href={$t("navbar.home").url}
				>
					<span class="sr-only">Home</span>
					<CorrelAid_Logo width={100} height={100} />
				</a>
			</div>
			<div class="xl:block flex-col hidden col-span-6">
				<div class="flex mb-3 mt-1">
					<div class="mx-auto">
						<nav aria-label="Site Nav">
							<ul
								class="flex items-center gap-6 font-light text-base-content tracking-wide"
							>
								<SubnavLink
									href={$t("navbar.events").url}
									text={$t("navbar.events").text}
								/>
								<SubnavLink
									href={$t("navbar.blog").url}
									text={$t("navbar.blog").text}
								/>
								<SubnavLink
									href={$t("navbar.podcast").url}
									text={$t("navbar.podcast").text}
								/>
								<SubnavLink
									href={$t("navbar.newsletter").url}
									text={$t("navbar.newsletter").text}
								/>
							</ul>
						</nav>
					</div>
				</div>

				<div class="flex items-center gap-12 mx-auto">
					<div class="hidden xl:block mx-auto">
						<nav aria-label="Site Nav">
							<div
								class="flex items-center gap-6 text-xl text-base-content "
							>
								<NavLink
									href={$t("navbar.about").url}
									text={$t("navbar.about").text}
								/>
								<NavLinkButton
									href={$t("navbar.data4good").url}
									text={$t("navbar.data4good").text}
									category={"data4good"}
									on:message={handle_dropdown}
								/>
								<NavLinkButton
									href={$t("navbar.education").url}
									text={$t("navbar.education").text}
									category={"education"}
									on:message={handle_dropdown}
								/>
								<NavLinkButton
									href={$t("navbar.community").url}
									text={$t("navbar.community").text}
									category={"community"}
									on:message={handle_dropdown}
								/>
							</div>
						</nav>
					</div>
				</div>
			</div>
			<div class="xl:flex items-center hidden gap-4 mx-auto col-span-2">
				<LinkButton
					text={$t("navbar.donate").text}
					href={$t("navbar.donate").url}
					type={"external"}
					color={"secondary"}
				/>
				<div
					class="inline-flex items-stretch rounded-md border-neutral-25 border "
				>
					<span
						class="rounded-l-md px-4 py-2 text-sm text-base-content"
					>
						{active_language}
					</span>

					<div class="relative">
						<button
							type="button"
							class="inline-flex h-full items-center justify-center  rounded-r-md border-l border-neutral-25 px-2 hover:bg-neutral-25"
							on:click={() =>
								(language_toggle = !language_toggle)}
						>
							<span class="sr-only">Language</span>
							<DropdownIcon height={20} width={20} />
						</button>
						{#if language_toggle}
							<div
								class="absolute right-0 z-10 mt-2 origin-top-right rounded-md border border-neutral-25 bg-white shadow-lg "
								role="menu"
							>
								<div class="p-2">
									<button
										class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:bg-neutral-25 text-base-content"
										role="menuitem"
										on:click={() => btnLocale("de")}
									>
										Deutsch
									</button>
									<button
										class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:bg-neutral-25 text-base-content"
										role="menuitem"
										on:click={() => btnLocale("en")}
									>
										English
									</button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="block xl:hidden">
				<button
					class="p-2 transition"
					on:click={() => ($drawer = !$drawer)}
				>
					<MenuIcon height={32} width={32} fill={"neutral-25"} />
				</button>
			</div>
		</div>
	</div>
</header>
{#if data4good_toggle}
	<div
		class="w-screen hidden absolute z-20 xl:block"
		style="top: {$header_height + 1}px"
		on:mouseleave={closeall}
	>
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 ">
			<div
				class="px-4 sm:px-6 xl:px-8 items-center justify-between grid grid-cols-10 "
			>
				<div class="col-span-2" />
				<div class=" col-span-6">
					<ul
						class="flex items-center justify-center xl:gap-6 gap-5 font-light  text-base-content py-3 text-base bg-white border-b border-x border-neutral-25 rounded-b  "
					>
						<SubnavLink
							href={$t("navbar.data4good.projects").url}
							text={$t("navbar.data4good.projects").text}
						/>
						<SubnavLink
							href={$t("navbar.data4good.nonprofits").url}
							text={$t("navbar.data4good.nonprofits").text}
						/>
					</ul>
				</div>
				<div class="col-span-2" />
			</div>
		</div>
	</div>
{/if}
{#if education_toggle}
	<div
		class="w-screen hidden absolute z-20 xl:block"
		style="top: {$header_height + 1}px"
		on:mouseleave={closeall}
	>
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 ">
			<div
				class="px-4 sm:px-6 xl:px-8 items-center justify-between grid grid-cols-10 "
			>
				<div class="col-span-2" />
				<div class=" col-span-6">
					<ul
						class="flex items-center justify-center xl:gap-6 gap-5 font-light  text-base-content py-3 text-base bg-white border-b border-x   border-neutral-25 rounded-b"
					>
						<SubnavLink
							href={$t("navbar.education.workshops").url}
							text={$t("navbar.education.workshops").text}
						/>
						<SubnavLink
							href={$t("navbar.education.learning_r").url}
							text={$t("navbar.education.learning_r").text}
						/>
						<SubnavLink
							href={$t("navbar.education.experts").url}
							text={$t("navbar.education.experts").text}
						/>
						<SubnavLink
							href={$t("navbar.education.tidy_tuesday").url}
							text={$t("navbar.education.tidy_tuesday").text}
						/>
						<SubnavLink
							href={$t("navbar.education.knowledge_pool").url}
							text={$t("navbar.education.knowledge_pool").text}
						/>
					</ul>
				</div>
				<div class="col-span-2" />
			</div>
		</div>
	</div>
{/if}
{#if community_toggle}
	<div
		class="w-screen hidden absolute z-20 xl:block"
		style="top: {$header_height + 1}px"
		on:mouseleave={closeall}
	>
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 ">
			<div
				class="px-4 sm:px-6 xl:px-8 items-center justify-between grid grid-cols-10 "
			>
				<div class="col-span-2" />
				<div class=" col-span-6">
					<ul
						class="flex items-center justify-center xl:gap-6 gap-5 font-light  text-base-content py-3 text-base bg-white border-b border-x border-neutral-25 rounded-b"
					>
						<SubnavLink
							href={$t("navbar.community.correlaidx").url}
							text={$t("navbar.community.correlaidx").text}
						/>
						<SubnavLink
							href={$t("navbar.community.founding_lc").url}
							text={$t("navbar.community.founding_lc").text}
						/>
						<SubnavLink
							href={$t("navbar.community.volunteer_journeys").url}
							text={$t("navbar.community.volunteer_journeys")
								.text}
						/>
					</ul>
				</div>
				<div class="col-span-2" />
			</div>
		</div>
	</div>
{/if}

<MobileMenu />
