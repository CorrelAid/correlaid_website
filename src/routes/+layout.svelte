<script>
	import "../app.css";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { t, locale, locales } from "$lib/stores/i18n";
	import { page_key } from "$lib/stores/page_key";
	import { gen_img_url } from "$lib/js/helpers";
	import { header_height } from "$lib/stores/dims";
	import { drawer } from "$lib/stores/drawer";
	import Header from "$lib/layout/Header.svelte";
	import Person from "$lib/components/Person.svelte";
	import Footer from "$lib/layout/Footer.svelte";
	import Html from "$lib/components/Html.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import Carousel from "$lib/components/Carousel.svelte";

	export let data;

	if ($page.params.locale) {
		$locale = $page.params.locale;
	} else {
		$locale = "de";
	}

	// Forwarding the user to the equivalent of the current page in the language selected in the laguage dropdown in the header
	function handleLocaleChange(event) {
		
		// if the page contains a slug, get the root url and add the slug
		if ($page.params.slug != null) {
			const url = $t($page_key).url + "/" + $page.params.slug;

			goto(url);
		} else {
			const url = $t($page_key).url;

			goto(url);
		}
	}

	// Setting page title by retreiving translations from translations and conditionally taking into account dynamic pages by using the page title attribute from the page data,
	// assigned in the dynamic pages +page.server
	let title;
	let title_content;
	$: title_content =
		$page.data.title != null
			? `${$t($page_key).text + " - " + $page.data.title}`
			: `${$t($page_key).text}`;
	$: title = $page_key === "navbar.home" ? "CorrelAid" : title_content;

	let content;
	$: content = data.builder;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<!-- Footer on bottom of page if page is too short -->
<div
	class="flex flex-col items-center min-h-screen text-neutral"
	style={$drawer ? "max-height: 100vh; overflow-y:hidden" : ""}
>
	<Header on:message={handleLocaleChange} />
	<div id="grow" class="w-screen">
		{#if $header_height}
			{#if content}
				{#each content as section}
					{#if section.collection == "heros"}
						<Hero
							image={section.item.image}
							text={section.item.translations[0].text}
							height={section.item.height}
							gradient_only={section.item.gradient_only}
							buttons={section.item.buttons}
						/>
					{:else if section.collection == "buttons"}
						<div class="container mx-auto ">
							<button>test</button>
						</div>
					{:else if section.collection == "wysiwyg"}
						<div class="container mx-auto">
							<div class="py-10 px-4">
								<Html
									source={section.item.translations[0]
										.content}
									options={""}
									width={section.item.width}
								/>
							</div>
						</div>
					{:else if section.collection == "contacts"}
						<div class="container mx-auto">
							<Person
								name={section.item.person.name}
								img={gen_img_url(
									section.item.person.image.id,
									"fit=cover&width=200&height=200&quality=80"
								)}
								position={section.item.translations[0].position}
								description={section.item.translations[0]
									.description}
							/>
						</div>
					{:else if section.collection == "carousel"}
						<div class="mb-10">
							<Carousel carousel_elements={section.item.carousel_elements}/>
						</div>
					{:else if section.collection == "custom_sections"}
					<div class="container mx-auto py-8">
						<slot />
					</div>
					{/if}
				{/each}
				<!-- if collection doesnt contain a custom section, load page anyways (but must be empty in this case) to write page key to store -->
				{#if !content.find((e) => e.collection === "custom_sections")}
					<slot />
				{/if}
			{:else}
			<!-- not part of pages collection -->
			<div class="container mx-auto py-8">
				<slot />
			</div>
			{/if}
		{/if}
	</div>
	<Footer />
</div>

<style>
	#grow {
		flex: 1 1 auto; /*grow vertically*/
	}
</style>
