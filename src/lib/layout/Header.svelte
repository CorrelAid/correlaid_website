<script>
	import { t, locale } from "$lib/stores/i18n";
	import { page } from "$app/stores";
	import { drawer } from "$lib/stores/drawer";
	import { no_scroll } from "$lib/stores/no_scroll";
	import { header_height } from "$lib/stores/dims";
	import { page_key } from "$lib/stores/page_key";
	import { createEventDispatcher } from "svelte";
	import CorrelAid_Logo from "$lib/svg/CorrelAid_Logo.svelte";
	import NavLinkButton from "$lib/components/Nav_Link_Button.svelte";
	import SubnavLink from "$lib/components/Subnav_Link.svelte";
	import MenuIcon from "../svg/Menu_Icon.svelte";
	import DropdownIcon from "../svg/Dropdown_Icon.svelte";
	import LinkButton from "$lib/components/Link_Button.svelte";
	import { fly, fade } from "svelte/transition";

	let language_toggle = false;
	let active_language = "de";

	let sidenav_width;

	let toggles = {
		about: false,
		using_data: false,
		education: false,
		community: false,
	};

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

	function subnav(button) {
		closeall();
		toggles[button] = true;
	}

	function closeall() {
		toggles.about = false;
		toggles.using_data = false;
		toggles.education = false;
		toggles.community = false;
	}

	$: active_language = $locale;
	$: $no_scroll = $drawer;
	$: $page.url && closeall();

	const top_nav = [
		"navbar.events",
		"navbar.blog",
		"navbar.podcast",
		"navbar.newsletter",
	];
	const bot_nav = [
		{
			key: "navbar.about",
			category: "about",
			children: [
				"navbar.about.team",
				"navbar.about.values",
				"navbar.about.partners",
			],
		},
		{
			key: "navbar.using_data",
			category: "using_data",
			children: [
				"navbar.using_data.projects",
				"navbar.using_data.consulting",
				"navbar.using_data.hackathons",
			],
		},
		{
			key: "navbar.education",
			category: "education",
			children: [
				"navbar.education.resources",
				"navbar.education.learning_r",
				"navbar.education.tidy_tuesday",
				"navbar.education.mentoring",
			],
		},
		{
			key: "navbar.community",
			category: "community",
			children: [
				"navbar.community.correlaidx",
				"navbar.community.founding_lc",
				"navbar.community.volunteer_journeys",
				"navbar.community.become_member",
			],
		},
	];
</script>

<svelte:window on:load={closeall} />

<header
	aria-label="Site Header"
	class="w-screen   z-10 border-b border-neutral-25"
	bind:clientHeight={$header_height}
>
	<div class="mx-auto  px-4 sm:px-6 xl:px-8">
		<div class="flex items-center justify-between xl:grid grid-cols-10">
			<!-- left part of navbar -->
			<div
				class="flex items-center gap-12  3xl:col-span-3 col-span-2 justify-end"
			>
				<a class="block text-teal-600" href={$t("navbar.home").url}>
					<span class="sr-only">Home</span>
					<CorrelAid_Logo width={100} height={100} />
				</a>
			</div>
			<!-- middle part of navbar -->
			<div class="xl:block flex-col hidden 3xl:col-span-4 col-span-6">
				<!-- Top Nav -->
				<div class="flex mb-3 mt-1">
					<div class="mx-auto">
						<nav aria-label="Site Nav">
							<ul
								class="flex items-center gap-6 font-light text-base-content tracking-wide"
							>
								{#each top_nav as key}
									<SubnavLink
										href={$t(key).url}
										text={$t(key).text}
									/>
								{/each}
							</ul>
						</nav>
					</div>
				</div>
				<!-- Bottom Nav -->
				<div class="flex items-center gap-12 mx-auto">
					<div class="hidden xl:block mx-auto">
						<nav aria-label="Site Nav">
							<div
								class="flex items-center gap-6 text-xl text-base-content "
							>
								{#each bot_nav as obj}
									<NavLinkButton
										href={$t(obj.key).url}
										text={$t(obj.key).text}
										category={obj.category}
										options={$page_key.startsWith(obj.key)
											? "font-medium text-secondary"
											: ""}
										on:message={handle_dropdown}
									/>
								{/each}
							</div>
						</nav>
					</div>
				</div>
			</div>
			<!-- right part of navbar -->
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
			<!-- Mobile menu button -->
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
{#each bot_nav as obj}
	{#if toggles[obj.category]}
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
							{#each obj.children as subnav}
								<SubnavLink
									href={$t(subnav).url}
									text={$t(subnav).text}
								/>
							{/each}
						</ul>
					</div>
					<div class="col-span-2" />
				</div>
			</div>
		</div>
	{/if}
{/each}


<!-- Mobile Menu -->
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
					{#each bot_nav as obj}
						<li>
							<div class="inline-flex items-center">
								<a
									class="tracking-wide w-56"
									href={$t(obj.key).url}
								>
									{$t(obj.key).text}
								</a>
								<button on:click={() => toggles[obj.category] ? toggles[obj.category] = false : subnav(obj.category)}>
									<DropdownIcon height={30} width={30} />
								</button>
							</div>
						</li>
						{#if toggles[obj.category]}
							<ul
								class="font-light text-base-content tracking-wide text-base space-y-3"
							>
								{#each obj.children as subnav}
									<li>
										<a
											class="hover:text-primary transition"
											href={$t(subnav).url}
										>
											{$t(subnav).text}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					{/each}

					<ul
						class="font-light text-base-content tracking-wide text-lg space-y-3 pt-3"
					>
						{#each top_nav as key}
							<li>
								<a
									class="hover:text-primary transition"
									href={$t(key).url}>{$t(key).text}</a
								>
							</li>
						{/each}
					</ul>
				</ul>
			</nav>

			<div class="">
				<div class="flex items-center  pl-7 w-2/4 pb-7">
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
