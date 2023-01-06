<script>
	import '../app.css';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
</script>

<!-- Footer on bottom of page if page is too short -->
<div class="flex flex-col items-center min-h-screen">
	<Header>
	<div id="grow" class="w-screen pt-2 px-5">
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