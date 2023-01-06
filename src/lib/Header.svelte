<script>
	import Dropdown_Icon from "$lib/svg/Dropdown_Icon.svelte";
	import CorrelAidLogo from "$lib/svg/CorrelAidLogo.svelte";

	const topnav = [{}];
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Main Navbar -->
		<div class="navbar bg-base-200">
			<div class="navbar-start">
				<div class="flex-1 lg:flex-none px-2">
					<a href="/"><CorrelAidLogo width="35" height="35" /></a>
				</div>
			</div>
			<div class="navbar-center">
				<ul class="menu menu-horizontal space-x-2 ml-2 hidden lg:flex">
					<li>
						<button class="text-xl" href="/events"
							>About us <Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li><a>What is CorrelAid?</a></li>
							<li><a>Organisational Structure</a></li>
							<ul class="text-sm ">
								<li>
									<a class="block pl-6">Board</a>
								</li>
								<li><a class="block pl-6">Remote Office</a></li>
								<li>
									<a class="block pl-6">Ethic Commitee</a>
								</li>
								<li>
									<a class="block pl-6"
										>Data Privacy Officer</a
									>
								</li>
							</ul>
							<li><a>Partners, Sponsors and Awards</a></li>
							<li><a>Code of Conduct</a></li>
						</ul>
					</li>
					<li>
						<button class="text-xl" href="/data4good"
							>Data4Good <Dropdown_Icon />
						</button>

						<ul class="p-2 bg-base-200 z-10">
							<li><a>What is Data4Good?</a></li>
							<li><a>Projects</a></li>
							<li><a>Offers for Nonprofits</a></li>
							<ul class="text-sm">
								<li>
									<a class="block pl-6">Comission a Project</a
									>
								</li>
								<li><a class="block pl-6">Data Hour</a></li>
								<li>
									<a class="block pl-6">Data Dialogues</a>
								</li>
								<li><a class="block pl-6">Hackathons</a></li>
							</ul>
						</ul>
					</li>
					<li>
						<button class="text-xl" href="/events"
							>Education <Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li><a>Data Literacy</a></li>
							<li><a>Offers for Nonprofits</a></li>
							<ul class="text-sm">
								<li>
									<a class="block pl-6">Workshops</a>
								</li>
								<li><a class="block pl-6">Learning R</a></li>
								<li><a class="block pl-6">Experts</a></li>
							</ul>
						</ul>
					</li>
					<li>
						<button class="text-xl" href="/events"
							>Community <Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li><a>A Remote Network</a></li>
							<li><a>Volunteering with CorrelAid</a></li>
							<li><a>Local Chapter</a></li>
							<li><a>Founding a Chapter</a></li>
							<li><a>Volunteer Journeys</a></li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="navbar-end">
				<ul class="menu menu-horizontal px-1 hidden lg:flex">
					<li><a class="text-md" href="/events">Events</a></li>
					<li><a class="text-md" href="/events">Blog</a></li>
					<li><a class="text-md">Podcast</a></li>
					<li><a class="text-md" href="/events">Newsletter</a></li>
					<li><a class="btn btn-primary">Donate</a></li>
				</ul>
				<ul class="menu menu-horizontal px-1 hidden lg:flex">
					<li>
						<button>
							Sprache
							<Dropdown_Icon />
						</button>
						<ul class="p-2 bg-base-200 z-10">
							<li><a>Deutsch</a></li>
							<li><a>English</a></li>
						</ul>
					</li>
				</ul>
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
