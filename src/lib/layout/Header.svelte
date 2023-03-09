<script>
	import { t, locale } from "$lib/stores/i18n";
	import { page } from "$app/stores";
	import { drawer } from "$lib/stores/drawer";
	import { header_height } from "$lib/stores/dims";
	import { page_key } from "$lib/stores/page_key";
	import { createEventDispatcher } from "svelte";
	import CorrelAid_Logo from "$lib/svg/CorrelAid_Logo.svelte";
	import NavLink from "$lib/components/Nav_Link.svelte";
	import NavLinkButton from "$lib/components/Nav_Link_Button.svelte";
	import SubnavLink from "$lib/components/Subnav_Link.svelte";
	import MenuIcon from "../svg/Menu_Icon.svelte";
	import DropdownIcon from "../svg/Dropdown_Icon.svelte";
	import LinkButton from "$lib/components/Link_Button.svelte";
	import MobileMenu from "./Mobile_Menu.svelte";

	let language_toggle = false;
	let projects_consulting_toggle = false;
	let education_toggle = false;
	let community_toggle = false;
	let active_language = "de";

	const dispatch = createEventDispatcher();

	function changeLocale() {
		dispatch("message", {});
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

	function handle_dropdown(event) {
		subnav(event.detail.category);
	}

	function closeall() {
		projects_consulting_toggle = false;
		education_toggle = false;
		community_toggle = false;
	}

	$: $page.url && closeall();

	function subnav(btn) {
		if (btn === "projects_consulting") {
			projects_consulting_toggle = true;
			education_toggle = false;
			community_toggle = false;
		}

		if (btn === "education") {
			projects_consulting_toggle = false;
			education_toggle = true;
			community_toggle = false;
		}

		if (btn === "community") {
			projects_consulting_toggle = false;
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
	<div class="mx-auto  px-4 sm:px-6 xl:px-8">
		<div class="flex items-center justify-between xl:grid grid-cols-10">
			<div class="flex items-center gap-12  3xl:col-span-3 col-span-2 justify-end">
				<a class="block text-teal-600" href={$t("navbar.home").url}>
					<span class="sr-only">Home</span>
					<CorrelAid_Logo width={100} height={100} />
				</a>
			</div>
			<div class="xl:block flex-col hidden 3xl:col-span-4 col-span-6">
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
									options={$page_key.startsWith("navbar.about") ? "font-medium text-secondary" : ""}
								/>
								<NavLinkButton
									href={$t("navbar.projects_consulting").url}
									text={$t("navbar.projects_consulting").text}
									category={"projects_consulting"}
									options={$page_key.startsWith("navbar.projects_consulting") ? "font-medium text-secondary" : ""}
									on:message={handle_dropdown}
								/>
								<NavLinkButton
									href={$t("navbar.education").url}
									text={$t("navbar.education").text}
									category={"education"}
									options={$page_key.startsWith("navbar.education") ? "font-medium text-secondary" : ""}
									on:message={handle_dropdown}
								/>
								<NavLinkButton
									href={$t("navbar.community").url}
									text={$t("navbar.community").text}
									category={"community"}
									options={$page_key.startsWith("navbar.community") ? "font-medium text-secondary" : ""}
									on:message={handle_dropdown}
								/>
							</div>
						</nav>
					</div>
				</div>
			</div>
			<div
				class="xl:flex items-center hidden gap-6  3xl:col-span-3 col-span-2 justify-start"
			>
				<LinkButton
					text={$t("navbar.donate").text}
					href={$t("navbar.donate").url}
					type={"external"}
					color={`bg-secondary`}
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
							class="inline-flex h-full items-center justify-center  rounded-r-md border-l border-neutral-25 px-2 z-10 "
							on:click={lang_dropdown}
						>
							<span class="sr-only">Language</span>

							<DropdownIcon height={20} width={20} />
						</button>
						{#if language_toggle}
							<div
								class="absolute right-0 z-10 mt-1 origin-top-right rounded-md border border-neutral-25 bg-white shadow-lg "
								role="menu"
								on:mouseleave={lang_dropdown}
							>
								<div class="p-2">
									<button
										class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:text-primary
										primary text-base-content"
										role="menuitem"
										on:click={() => btnLocale("de")}
									>
										Deutsch
									</button>
									<button
										class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:text-primary text-base-content"
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
{#if projects_consulting_toggle}
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
							href={$t("navbar.projects_consulting.projects").url}
							text={$t("navbar.projects_consulting.projects").text}
						/>
						<SubnavLink
							href={$t("navbar.projects_consulting.consulting").url}
							text={$t("navbar.projects_consulting.consulting").text}
						/>
						<SubnavLink
							href={$t("navbar.projects_consulting.hackathons").url}
							text={$t("navbar.projects_consulting.hackathons").text}
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
							href={$t("navbar.education.resources").url}
							text={$t("navbar.education.resources").text}
						/>
						<SubnavLink
							href={$t("navbar.education.learning_r").url}
							text={$t("navbar.education.learning_r").text}
						/>
						<SubnavLink
							href={$t("navbar.education.mentoring").url}
							text={$t("navbar.education.mentoring").text}
						/>
						<SubnavLink
							href={$t("navbar.education.tidy_tuesday").url}
							text={$t("navbar.education.tidy_tuesday").text}
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
						<SubnavLink
							href={$t("navbar.community.become_member").url}
							text={$t("navbar.community.become_member")
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
