<script>
	import "../app.css";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import Header from "$lib/layout/Header.svelte";
	import Footer from "$lib/layout/Footer.svelte";
	import { t, locale, locales } from "$lib/stores/i18n.js";
	import { page_key } from "$lib/stores/page_key.js";

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
	$: title_content = ($page.params.slug != null) ? `${$t($page_key).text + " - " + $page.params.slug}` : `${$t($page_key).text}`;
	$: title = ($page_key === "navbar.home") ? "CorrelAid" : title_content;	
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<!-- Footer on bottom of page if page is too short -->
<div class="flex flex-col items-center min-h-screen">
	<Header on:message={handleLocaleChange}>
		<div id="grow" class="w-screen">
			<slot />
		</div>
		<Footer />
	</Header>
</div>

<style>
	#grow {
		flex: 1 1 auto; /*grow vertically*/
		/* same padding as navbar */
	}
</style>
