<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<!-- Footer on bottom of page if page is too short -->
<div class="flex flex-col items-center min-h-screen">
	<Header/>
	<div id="grow" class="w-screen px-5 py-5">
		<slot/>
	</div>
	<Footer />
</div>

<style>
	#grow {
		flex: 1 1 auto; /*grow vertically*/
    /* same padding as navbar */
    padding-left: var(--navbar-padding, 0.5rem);
    padding-right: var(--navbar-padding, 0.5rem);
	}

</style>