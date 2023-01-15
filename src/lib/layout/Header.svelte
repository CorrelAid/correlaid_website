<script>
	import Dropdown_Icon from "$lib/svg/Dropdown_Icon.svelte";
	import Menu_Icon from "$lib/svg/Menu_Icon.svelte";
	import CorrelAidLogo from "$lib/svg/CorrelAidLogo.svelte";
	import { t, locale } from "$lib/stores/i18n.js";
	import { header_height } from "$lib/stores/dims.js";

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function changeLocale() {
		dispatch("message", {
			locale: $locale,
		});
	}

	function btnLocale(lc) {
		$locale = lc;
		closeDrawer();
		changeLocale();
	}

	let drawer = false;
	let about_collapse = false;
	let data4good_collapse = false;
	let education_collapse = false;
	let community_collapse = false;

	function closeDrawer() {
		drawer = false;
		about_collapse = false;
		data4good_collapse = false;
		education_collapse = false;
		community_collapse = false;
	}
</script>

<div class="drawer">
	<input
		id="my-drawer-3"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={drawer}
	/>
	<div class="drawer-content flex flex-col">
		<!-- Main Navbar -->
		<div
			class="z-10 lg:divide-y divide-base-100"
			bind:clientHeight={$header_height}
		>
			<div class="navbar min-h-0 h-12 hidden lg:flex bg-neutral">
				<div class="navbar-start w-4/6">
					<ul
						class="menu menu-horizontal px-1 hidden lg:flex space-x-4 text-neutral-content"
					>
						<li>
							<a
								class="hover:text-primary hover:bg-neutral py-2 "
								href={$t("navbar.events").url}
								>{$t("navbar.events").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.blog").url}
								class="py-2 hover:text-primary hover:bg-neutral"
								>{$t("navbar.blog").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.podcast").url}
								class="py-2 hover:text-primary hover:bg-neutral"
								>{$t("navbar.podcast").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.newsletter").url}
								class="py-2 hover:text-primary hover:bg-neutral"
								>{$t("navbar.newsletter").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.donate").url}
								class="py-2 hover:text-primary hover:bg-neutral"
								>{$t("navbar.donate").text}</a
							>
						</li>
					</ul>
				</div>
				<div class="navbar-center" />
				<div class="navbar-end ">
					<select
						class="bg-neutral font-medium hover:text-primary hover:outline-none focus:outline-none active:outline-none mr-2"
						bind:value={$locale}
						on:change={changeLocale}
					>
						<option value="de">Deutsch</option>
						<option value="en">English</option>
					</select>
				</div>
			</div>
			<div class="navbar bg-neutral py-3">
				<div class="navbar-start w-5/6">
					<div class="flex-1 lg:flex-none pl-4 pr-4 py-1">
						<a href={$t("navbar.home").url}
							><CorrelAidLogo width="30" height="30" /></a
						>
					</div>
					<ul
						class="menu menu-horizontal space-x-2 ml-2 hidden lg:flex text-neutral-content"
					>
						<li class="">
							<button
								class="text-xl font-semibold hover:text-primary hover:bg-neutral"
								>{$t("navbar.about").text} <Dropdown_Icon />
							</button>
							<ul class="p-2 z-10 bg-neutral">
								<li>
									<a
										href={$t("navbar.about.landing").url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.about.landing").text}</a
									>
								</li>
								<li>
									<a
										href={$t("navbar.about.org_struct").url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.about.org_struct").text}</a
									>
								</li>
								<ul>
									<li>
										<a
											href={$t(
												"navbar.about.org_struct.board"
											).url}
											class="block ml-6 hover:text-primary hover:bg-neutral"
											>{$t(
												"navbar.about.org_struct.board"
											).text}</a
										>
									</li>
									<li>
										<a
											href={$t(
												"navbar.about.org_struct.remote_office"
											).url}
											class="block ml-6 hover:text-primary hover:bg-neutral"
											>{$t(
												"navbar.about.org_struct.remote_office"
											).text}</a
										>
									</li>
									<li>
										<a
											href={$t(
												"navbar.about.org_struct.ethics_commission"
											).url}
											class="block ml-6 hover:text-primary hover:bg-neutral"
											>{$t(
												"navbar.about.org_struct.ethics_commission"
											).text}</a
										>
									</li>
									<li>
										<a
											href={$t(
												"navbar.about.org_struct.data_privacy"
											).url}
											class="block ml-6 hover:text-primary hover:bg-neutral"
											>{$t(
												"navbar.about.org_struct.data_privacy"
											).text}</a
										>
									</li>
								</ul>
								<li>
									<a
										href={$t("navbar.about.partners").url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.about.partners").text}</a
									>
								</li>
								<li>
									<a
										href={$t("navbar.about.coc").url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.about.coc").text}</a
									>
								</li>
							</ul>
						</li>
						<li>
							<button
								class="text-lg font-semibold hover:text-primary hover:bg-neutral"
								>{$t("navbar.data4good").text} <Dropdown_Icon />
							</button>

							<ul class="p-2 bg-neutral z-10 ">
								<li>
									<a
										href={$t("navbar.data4good.landing")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.data4good.landing")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t("navbar.data4good.projects")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.data4good.projects")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t("navbar.data4good.nonprofits")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.data4good.nonprofits")
											.text}</a
									>
								</li>
								<ul>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.data4good.nonprofits.comission"
											).url}
											>{$t(
												"navbar.data4good.nonprofits.comission"
											).text}</a
										>
									</li>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.data4good.nonprofits.data_hour"
											).url}
											>{$t(
												"navbar.data4good.nonprofits.data_hour"
											).text}</a
										>
									</li>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.data4good.nonprofits.data_dialogues"
											).url}
											>{$t(
												"navbar.data4good.nonprofits.data_dialogues"
											).text}</a
										>
									</li>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.data4good.nonprofits.hackathons"
											).url}
											>{$t(
												"navbar.data4good.nonprofits.hackathons"
											).text}</a
										>
									</li>
								</ul>
							</ul>
						</li>
						<li>
							<button
								class="text-lg font-semibold hover:text-primary hover:bg-neutral"
								>{$t("navbar.education").text} <Dropdown_Icon />
							</button>
							<ul class="p-2 bg-neutral z-10">
								<li>
									<a
										href={$t("navbar.education.landing")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.education.landing")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t("navbar.education.nonprofits")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.education.nonprofits")
											.text}</a
									>
								</li>
								<ul>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.education.nonprofits.workshops"
											).url}
											>{$t(
												"navbar.education.nonprofits.workshops"
											).text}</a
										>
									</li>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.education.nonprofits.learning_r"
											).url}
											>{$t(
												"navbar.education.nonprofits.learning_r"
											).text}</a
										>
									</li>
									<li>
										<a
											class="block ml-4 hover:text-primary hover:bg-neutral"
											href={$t(
												"navbar.education.nonprofits.experts"
											).url}
											>{$t(
												"navbar.education.nonprofits.experts"
											).text}</a
										>
									</li>
								</ul>
							</ul>
						</li>
						<li>
							<button
								class="text-lg font-semibold hover:text-primary hover:bg-neutral"
								>{$t("navbar.community").text} <Dropdown_Icon />
							</button>
							<ul class="p-2 bg-neutral z-10">
								<li>
									<a
										href={$t("navbar.community.landing")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.community.landing")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t(
											"navbar.community.local_chapters"
										).url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.community.local_chapters")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t("navbar.community.founding_lc")
											.url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t("navbar.community.founding_lc")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t(
											"navbar.community.volunteer_journeys"
										).url}
										class="text-lg font-medium hover:text-primary hover:bg-neutral"
										>{$t(
											"navbar.community.volunteer_journeys"
										).text}</a
									>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="navbar-center" />
				<div class="navbar-end ">
					<ul class="menu menu-horizontal px-1 mr-4 hidden lg:flex">
						<li>
							<a
								href={$t("navbar.local_chapters").url}
								class="btn-secondary font-semibold"
								>{$t("navbar.local_chapters").text}</a
							>
						</li>
					</ul>

					<div class="flex-none lg:hidden">
						<label
							for="my-drawer-3"
							class="btn btn-square btn-ghost"
						>
							<Menu_Icon />
						</label>
					</div>
				</div>
			</div>
		</div>
		<slot />
	</div>
	<!---------------------------------------- Mobile Menu ------------------------------------->
	<!-- ------------------------------------------------------------------------------------ -->
	<div class="drawer-side ">
		<label for="my-drawer-3" class="drawer-overlay" />

		<ul class="menu p-3 w-80 bg-neutral">
			<div class="collapse collapse-plus">
				<input
					type="checkbox"
					class="peer"
					bind:checked={about_collapse}
				/>
				<div
					class="collapse-title text-xl font-semibold hover:text-primary hover:bg-neutral"
				>
					{$t("navbar.about").text}
				</div>
				<div class="collapse-content">
					<ul class="menu w-80 ">
						<li>
							<a
								href={$t("navbar.about.landing").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.landing").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.about.org_struct").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.org_struct").text}</a
							>
						</li>
						<!-- sub sub org struct -->
						<li class="pl-4">
							<a
								href={$t("navbar.about.org_struct.board").url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.org_struct.board").text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.about.org_struct.remote_office"
								).url} class="block ml-5 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.org_struct.remote_office")
									.text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.about.org_struct.ethics_commission"
								).url} class="block ml-5 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t(
									"navbar.about.org_struct.ethics_commission"
								).text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t("navbar.about.org_struct.data_privacy")
									.url} class="block ml-5 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.org_struct.data_privacy")
									.text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.about.partners").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.partners").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.about.coc").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.about.coc").text}</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="collapse collapse-plus">
				<input
					type="checkbox"
					class="peer"
					bind:checked={data4good_collapse}
				/>
				<div
					class="collapse-title text-xl font-semibold hover:text-primary hover:bg-neutral"
				>
					{$t("navbar.data4good").text}
				</div>
				<div class="collapse-content">
					<ul class="menu w-80 ">
						<li>
							<a
								href={$t("navbar.data4good.landing").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.data4good.landing").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.data4good.projects").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.data4good.projects").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.data4good.nonprofits").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.data4good.nonprofits").text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.data4good.nonprofits.comission"
								).url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.data4good.nonprofits.comission")
									.text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.data4good.nonprofits.data_hour"
								).url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.data4good.nonprofits.data_hour")
									.text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.data4good.nonprofits.data_dialogues"
								).url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t(
									"navbar.data4good.nonprofits.data_dialogues"
								).text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.data4good.nonprofits.hackathons"
								).url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.data4good.nonprofits.hackathons")
									.text}</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="collapse collapse-plus">
				<input
					type="checkbox"
					class="peer"
					bind:checked={education_collapse}
				/>
				<div
					class="collapse-title text-xl font-semibold hover:text-primary hover:bg-neutral"
				>
					{$t("navbar.education").text}
				</div>
				<div class="collapse-content">
					<ul class="menu w-80 ">
						<li>
							<a
								href={$t("navbar.education.landing").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.education.landing").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.education.nonprofits").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer} 
								>{$t("navbar.education.nonprofits").text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.education.nonprofits.workshops"
								).url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.education.nonprofits.workshops")
									.text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t(
									"navbar.education.nonprofits.learning_r"
								).url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.education.nonprofits.learning_r")
									.text}</a
							>
						</li>
						<li class="pl-4">
							<a
								href={$t("navbar.education.nonprofits.experts")
									.url} class="block ml-4 hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.education.nonprofits.experts")
									.text}</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="collapse collapse-plus">
				<input
					type="checkbox"
					class="peer"
					bind:checked={community_collapse}
				/>
				<div
					class="collapse-title text-xl font-semibold hover:text-primary hover:bg-neutral"
				>
					{$t("navbar.community").text}
				</div>
				<div class="collapse-content">
					<ul class="menu w-80 ">
						<li>
							<a
								href={$t("navbar.community.landing").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.community.landing").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.community.local_chapters").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.community.local_chapters").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.community.founding_lc").url} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								on:click={closeDrawer}
								>{$t("navbar.community.founding_lc").text}</a
							>
						</li>
						<li>
							<a
								href={$t("navbar.community.volunteer_journeys") 
									.url}
								on:click={closeDrawer} class="text-lg font-medium hover:text-primary hover:bg-neutral"
								>{$t("navbar.community.volunteer_journeys")
									.text}</a
							>
						</li>
					</ul>
				</div>
			</div>
			<li>
				<a href={$t("navbar.events").url} on:click={closeDrawer} class="hover:text-primary hover:bg-neutral"
					>{$t("navbar.events").text}</a
				>
			</li>
			<li> 
				<a href={$t("navbar.blog").url} on:click={closeDrawer} class="hover:text-primary hover:bg-neutral"
					>{$t("navbar.blog").text}</a
				>
			</li>
			<li>
				<a href={$t("navbar.podcast").url} on:click={closeDrawer} class="hover:text-primary hover:bg-neutral"
					>{$t("navbar.podcast").text}</a
				>
			</li>
			<li>
				<a href={$t("navbar.newsletter").url} on:click={closeDrawer} class="hover:text-primary hover:bg-neutral"
					>{$t("navbar.newsletter").text}</a
				>
			</li>
			<li>
				<a href={$t("navbar.donate").url} on:click={closeDrawer} class="hover:text-primary hover:bg-neutral"
					>{$t("navbar.donate").text}</a
				>
			</li>
			<li class="pl-2 mt-6">
				<a
					href={$t("navbar.local_chapters").url}
					class="btn-secondary font-semibold w-4/5"
					>{$t("navbar.local_chapters").text}</a
				>
			</li>
			<div class="flex w-full pl-4 my-6">
				<button class="" on:click={() => btnLocale("de")}> de </button>
				<div class="divider divider-horizontal mx-1" />
				<button class="" on:click={() => btnLocale("en")}> en </button>
			</div>
		</ul>
		
	</div>
</div>
