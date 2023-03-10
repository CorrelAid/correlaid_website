<script>
    export let href;
    export let text;
    export let options = "";
</script>

<a
    class="hover:text-secondary transition inline-flex items-center justify-center tracking-wide {options}"
    {href}
>
    {text}
</a>
