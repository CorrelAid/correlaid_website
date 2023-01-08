<script>
    import Hero from "$lib/components/Hero.svelte";
    import {page_key} from '$lib/stores/page_key.js';
    import { onMount } from 'svelte';
    
    onMount( () => {
		$page_key = 'navbar.home';
	});

    /** @type {import('./$types').PageData} */  
    export let data;

</script>

<Hero text = {data.hero.text} url = {data.hero.url}/>
