<script>
	import "../app.css";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import Header from "$lib/layout/Header.svelte";
	import Footer from "$lib/layout/Footer.svelte";
	import Html from "$lib/components/Html.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import { t, locale, locales } from "$lib/stores/i18n.js";
	import { page_key } from "$lib/stores/page_key.js";
	export let data;

	if ($page.params.locale) {
		$locale = $page.params.locale;
	} else {
		$locale = "de";
	}

	function handleLocaleChange(event) {
		if ($page.params.slug != null) {
			const url = $t($page_key).url + "/" + $page.params.slug;
			goto(url);
		} else {
			const url = $t($page_key).url;
			goto(url);
		}
	}

	// Dynamic page title
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
<div class="flex flex-col items-center min-h-screen">
	<Header on:message={handleLocaleChange} />
	<div id="grow" class="w-screen">
		{#if content}
			{#each content as section}
				{#if section.collection == "heros"}
					<Hero builder={section.item.builder} image_id={section.item.image.id} />
				{:else if section.collection == "buttons"}
					<div class="container mx-auto ">
						<button>test</button>
					</div>
				{:else if section.collection == "wysiwyg"}
				<div class="container mx-auto">
					<Html source={section.item.translations[0].content} options={""} width={section.item.width}/>
				</div>
				{/if}
			{/each}
		{/if}

		<slot />
	</div>
	<Footer />
</div>

<style>
	#grow {
		flex: 1 1 auto; /*grow vertically*/
	}
</style>
