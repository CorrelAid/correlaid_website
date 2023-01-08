<script>
    import {page_key} from '$lib/stores/page_key.js';
    import { onMount } from 'svelte';
    import Text from "$lib/components/Text.svelte";

    onMount( () => {
		$page_key = 'navbar.about.partners';
	});
    
    const source = "# WIP";
</script>

<Text text={source} size={"base"}/>