<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { t, locale, locales } from "$lib/stores/i18n.js";
	import {page_key} from '$lib/stores/page_key.js'

	if($page.params.locale){
		$locale = $page.params.locale
	}
	else{
		$locale = "de"
	}

	function handleLocaleChange(event) {
		const url = $t($page_key).url
		goto(url)
	}

  	
</script>

<!-- Footer on bottom of page if page is too short -->
<div class="flex flex-col items-center min-h-screen">
	<Header on:message={handleLocaleChange}>
	<div id="grow" class="w-screen">
		<slot/>
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