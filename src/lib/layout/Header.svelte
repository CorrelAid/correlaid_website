<script>
	import Dropdown_Icon from "$lib/svg/Dropdown_Icon.svelte";
	import CorrelAidLogo from "$lib/svg/CorrelAidLogo.svelte";
	import { t, locale, locales } from "$lib/stores/i18n.js";
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Main Navbar -->
		<div class="navbar bg-base-200">
			<div class="navbar-start">
				<div class="flex-1 lg:flex-none px-2">
					<a href={$t("navbar.home").url}><CorrelAidLogo width="35" height="35" /></a>
				</div>
			</div>
			<div class="navbar-center">
				<ul class="menu menu-horizontal space-x-2 ml-2 hidden lg:flex">
					<li>
						<button class="text-xl"
							>{$t("navbar.about").text} <Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li>
								<a href={$t("navbar.about.landing").url}
									>{$t("navbar.about.landing").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.about.org_struct").url}
									>{$t("navbar.about.org_struct").text}</a
								>
							</li>
							<ul class="text-sm ">
								<li>
									<a
										href={$t(
											"navbar.about.org_struct.board"
										).url}
										class="block pl-6"
										>{$t("navbar.about.org_struct.board")
											.text}</a
									>
								</li>
								<li>
									<a
										href={$t(
											"navbar.about.org_struct.remote_office"
										).url}
										class="block pl-6"
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
										class="block pl-6"
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
										class="block pl-6"
										>{$t(
											"navbar.about.org_struct.data_privacy"
										).text}</a
									>
								</li>
							</ul>
							<li>
								<a href={$t("navbar.about.partners").url}
									>{$t("navbar.about.partners").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.about.coc").url}
									>{$t("navbar.about.coc").text}</a
								>
							</li>
						</ul>
					</li>
					<li>
						<button class="text-xl"
							>{$t("navbar.data4good").text} <Dropdown_Icon />
						</button>

						<ul class="p-2 bg-base-200 z-10">
							<li>
								<a href={$t("navbar.data4good.landing").url}
									>{$t("navbar.data4good.landing").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.data4good.projects").url}
									>{$t("navbar.data4good.projects").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.data4good.nonprofits").url}
									>{$t("navbar.data4good.nonprofits").text}</a
								>
							</li>
							<ul class="text-sm">
								<li>
									<a
										class="block pl-6"
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
										class="block pl-6"
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
										class="block pl-6"
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
										class="block pl-6"
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
						<button class="text-xl"
							>{$t("navbar.education").text} <Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li>
								<a href={$t("navbar.education.landing").url}
									>{$t("navbar.education.landing").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.education.nonprofits").url}
									>{$t("navbar.education.nonprofits").text}</a
								>
							</li>
							<ul class="text-sm">
								<li>
									<a
										class="block pl-6"
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
										class="block pl-6"
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
										class="block pl-6"
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
						<button class="text-xl"
							>{$t("navbar.community").text} <Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li>
								<a href={$t("navbar.community.landing").url}
									>{$t("navbar.community.landing").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.community.local_chapter").url}
									>{$t("navbar.community.local_chapter").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.community.founding_lc").url}
									>{$t("navbar.community.founding_lc").text}</a
								>
							</li>
							<li>
								<a href={$t("navbar.community.volunteer_journeys").url}
									>{$t("navbar.community.volunteer_journeys").text}</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="navbar-end ">
				<ul class="menu menu-horizontal px-1 hidden lg:flex">
					<li>
						<a href={$t("navbar.events").url}
							>{$t("navbar.events").text}</a
						>
					</li>
					<li>
						<a href={$t("navbar.blog").url}
							>{$t("navbar.blog").text}</a
						>
					</li>
					<li>
						<a href={$t("navbar.podcast").url}
							>{$t("navbar.podcast").text}</a
						>
					</li>
					<li>
						<a href={$t("navbar.newsletter").url}
							>{$t("navbar.newsletter").text}</a
						>
					</li>
					<li>
						<a href={$t("navbar.donate").url} class="btn btn-primary">{$t("navbar.donate").text}</a>
					</li>
				</ul>
				<form>
				<select class="select max-w-xs ml-2" bind:value={$locale}>
						<option selected value="de">de</option>
						<option value="en">en</option>
				</select>
			</form>
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" class="btn btn-square btn-ghost">
						<Dropdown_Icon />
					</label>
				</div>
			</div>
		</div>
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100">
			<!-- Sidebar content here -->
			<li><a>Data4Good</a></li>
			<li><a>Education</a></li>
		</ul>
	</div>
</div>
