<script>
    export let href;
    export let text;
    export let category;
    import DropdownIcon from "../svg/Dropdown_Icon.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function dropdown() {
        dispatch("message", {
            category: category,
        });
    }
</script>

<a
    class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
    {href}
    on:mouseover={dropdown}
    on:focus={dropdown}
>
    {text}
    <DropdownIcon height={20} width={20} />
</a>

<style>
    a{
        transition: 0s background-color;
    }
    a:hover { 
        transition-delay: 1s 3s;
    }
</style>
