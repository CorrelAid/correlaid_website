<script>
    export let href;
    export let text;
    export let category;
    import DropdownIcon from "../svg/Dropdown_Icon.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let menuEnterTimer, menuLeaveTimer;

    function dropdown() {
        dispatch("message", {
            category: category,
        });
    }

    function delay() {
        menuEnterTimer = setTimeout(function () {
            dropdown();
        }, 110);
    }
</script>

<a
    class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide"
    {href}
    on:mouseover={delay}
    on:mouseleave={() => clearTimeout(menuEnterTimer)}
    on:focus={dropdown}
>
    {text}
    <DropdownIcon height={20} width={20} />
</a>
