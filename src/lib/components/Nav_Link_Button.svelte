<script>
    export let href;
    export let text;
    export let category;
    import DropdownIcon from "../svg/Dropdown_Icon.svelte";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function dropdown() {
		dispatch('message', {
			category: category
		});
	}
</script>

<a
    class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
    href={href}
    on:mouseover={dropdown}
    on:focus={dropdown}
>   
    {text}
    <DropdownIcon height={20} width={20} />
</a>
