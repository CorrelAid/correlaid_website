<script>
    import {page_key} from '$lib/stores/page_key.js';
    import { onMount } from 'svelte';
    import Text from "$lib/components/Text.svelte";
    import Person from "$lib/components/Person.svelte";
    import { gen_img_url } from "$lib/js/helpers";

    onMount( () => {
		$page_key = 'navbar.community';
	});
    
    
</script>

