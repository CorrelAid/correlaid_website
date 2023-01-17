<script>
    import {page_key} from '$lib/stores/page_key.js';
    import { onMount } from 'svelte';
    import Text from "$lib/components/Text.svelte";
    import Content from '$lib/components/Content.svelte';

    onMount( () => {
		$page_key = 'footer.imprint';
	});
    
    export let data;
    
    const source = "# WIP";
</script>

<Text text={source} size={"base"}/>