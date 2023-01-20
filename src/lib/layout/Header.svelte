<script>
	import CorrelAid_Logo_1 from "$lib/svg/CorrelAid_Logo_1.svelte";
	import { t, locale } from "$lib/stores/i18n.js";
	import { drawer } from "$lib/stores/drawer.js";
	import { header_height } from "$lib/stores/dims.js";
	import { createEventDispatcher } from "svelte";
	import DropdownIcon from "../svg/Dropdown_Icon.svelte";
	import ArrowRight from "../svg/Arrow_Right.svelte";
	import MenuIcon from "../svg/Menu_Icon.svelte";
	import MobileMenu from "./Mobile_Menu.svelte";

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
		handle_drawer();
		changeLocale();
	}

	let language_toggle = false;
	let about_toggle = false;
	let data4good_toggle = false;
	let education_toggle = false;
	let community_toggle = false;

	function handle_drawer() {
		$drawer = !$drawer;
	}

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
</script>

<header
	aria-label="Site Header"
	class="w-screen   z-10 border-b border-neutral-25"
	bind:clientHeight={$header_height}
>
	<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
		<div class="flex items-center justify-between">
			<div class="md:flex md:items-center md:gap-12">
				<a class="block text-teal-600" href={$t("navbar.home").url}>
					<span class="sr-only">Home</span>
					<CorrelAid_Logo_1 width={100} height={100} />
				</a>
			</div>
			<div class="lg:flex flex-col hidden">
				<div class="flex mb-3 mt-1">
					<div class="hidden md:block mx-auto">
						<nav aria-label="Site Nav">
							<ul
								class="flex items-center gap-6 font-light text-base-content tracking-wide"
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
					</div>
				</div>

				<div class="md:flex md:items-center md:gap-12">
					<div class="hidden md:block">
						<nav aria-label="Site Nav">
							<div
								class="flex items-center gap-6 text-xl text-base-content "
							>
								<button
									class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
									on:click={() => subnav("about")}
								>
									{$t("navbar.about").text}
									<DropdownIcon height={20} width={20} />
								</button>

								<button
									class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
									on:click={() => subnav("data4good")}
								>
									{$t("navbar.data4good").text}
									<DropdownIcon height={20} width={20} />
								</button>
								<button
									class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
									on:click={() => subnav("education")}
								>
									{$t("navbar.education").text}
									<DropdownIcon height={20} width={20} />
								</button>
								<button
									class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
									on:click={() => subnav("community")}
								>
									{$t("navbar.community").text}
									<DropdownIcon height={20} width={20} />
								</button>
							</div>
						</nav>
					</div>
				</div>
			</div>
			<div class="lg:flex items-center hidden gap-4">
				<a
					class="rounded-md bg-secondary px-4 py-2  text-white shadow"
					href={$t("navbar.donate").url}
				>
					{$t("navbar.donate").text}
				</a>
				<div
					class="inline-flex items-stretch rounded-md border-neutral-25 border "
				>
					<span
						href="/edit"
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
			<div class="block lg:hidden">
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
{#if about_toggle}
	<div class="w-screen  border-b border-neutral-25 bg-white hidden lg:block">
		<div class=" flex mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mx-auto block">
				<ul
					class="flex items-center xl:gap-6 gap-5 font-light text-base-content  mb-3 mt-4 text-sm xl:text-base"
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
						<span class="border-l border-neutral-25" />
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
						<ArrowRight
							height={20}
							width={20}
							fill={"neutral-25"}
						/>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.about.org_struct.board").url}
						>
							{$t("navbar.about.org_struct.board").text}
						</a>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.about.org_struct.remote_office")
								.url}
						>
							{$t("navbar.about.org_struct.remote_office").text}
						</a>
					</li>
					<li>
						<a
							class="hover:text-primary transition"
							href={$t(
								"navbar.about.org_struct.ethics_commission"
							).url}
						>
							{$t("navbar.about.org_struct.ethics_commission")
								.text}
						</a>
					</li>
					<li>
						<span class="border-l border-neutral-25" />
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
			</div>
		</div>
	</div>
{/if}
{#if data4good_toggle}
	<div class="w-screen border-b border-neutral-25 bg-white hidden lg:block">
		<div class=" flex mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mx-auto block">
				<ul
					class="flex items-center xl:gap-6 gap-5 font-light text-base-content mb-3 mt-4 text-sm xl:text-base"
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
						<span class="border-l border-neutral-25" />
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
						<ArrowRight
							height={20}
							width={20}
							fill={"neutral-25"}
						/>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.data4good.nonprofits.comission")
								.url}
						>
							{$t("navbar.data4good.nonprofits.comission").text}
						</a>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.data4good.nonprofits.data_hour")
								.url}
						>
							{$t("navbar.data4good.nonprofits.data_hour").text}
						</a>
					</li>
					<li>
						<a
							class="hover:text-primary transition"
							href={$t(
								"navbar.data4good.nonprofits.data_dialogues"
							).url}
						>
							{$t("navbar.data4good.nonprofits.data_dialogues")
								.text}
						</a>
					</li>
					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.data4good.nonprofits.hackathons")
								.url}
						>
							{$t("navbar.data4good.nonprofits.hackathons").text}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
{/if}
{#if education_toggle}
	<div class="w-screen border-b border-neutral-25 bg-white hidden lg:block">
		<div class=" flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto block">
				<ul
					class="flex items-center xl:gap-6 gap-5 font-light text-base-content  mb-3 mt-4 text-sm xl:text-base"
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
						<span class="border-l border-neutral-25" />
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
						<ArrowRight
							height={20}
							width={20}
							fill={"neutral-25"}
						/>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.education.nonprofits.workshops")
								.url}
						>
							{$t("navbar.education.nonprofits.workshops").text}
						</a>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.education.nonprofits.learning_r")
								.url}
						>
							{$t("navbar.education.nonprofits.learning_r").text}
						</a>
					</li>

					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.education.nonprofits.experts").url}
						>
							{$t("navbar.education.nonprofits.experts").text}
						</a>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
{/if}
{#if community_toggle}
	<div class="w-screen border-b border-neutral-25 bg-whitehidden lg:block">
		<div class=" flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto block">
				<ul
					class="flex items-center font-light xl:gap-6 gap-5 text-base-content  mb-3 mt-4 text-sm xl:text-base"
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
							href={$t("navbar.community.local_chapters").url}
						>
							{$t("navbar.community.local_chapters").text}
						</a>
					</li>
					
					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.community.founding_lc").url}
						>
							{$t("navbar.community.founding_lc").text}
						</a>
					</li>
					
					<li>
						<a
							class="hover:text-primary transition"
							href={$t("navbar.community.volunteer_journeys").url}
						>
							{$t("navbar.community.volunteer_journeys").text}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
{/if}

<MobileMenu />
