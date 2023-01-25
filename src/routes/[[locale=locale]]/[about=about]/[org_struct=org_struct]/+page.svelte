<script>
    import {page_key} from '$lib/stores/page_key.js';
    import { onMount } from 'svelte';

    onMount( () => {
		$page_key = 'navbar.about.org_struct';
	});
    

</script>
<div class="container mx-auto p-6">
  
  <div class="grid grid-cols-6 grid-flow-row gap-4 border w-full bg-gradient-to-r from-secondary to-primary p-4">
    <div class="col-span-2 bg-neutral rounded">Board</div>
    <div class="col-span-2 bg-neutral rounded">Remote Office</div>
    <div class="col-span-2 bg-neutral rounded">Ethics Comission</div>
    <div class="col-span-6 bg-tertiary-75 rounded">Local Chapters</div>
  </div>
</div>

