<script>
    import Hero from "$lib/components/Hero.svelte";

    /** @type {import('./$types').PageData} */  
    export let data;

</script>

<Hero text = {data.hero.text} url = {data.hero.url}/>
