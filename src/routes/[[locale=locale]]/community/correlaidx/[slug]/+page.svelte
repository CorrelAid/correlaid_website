<script>
    import { onMount } from "svelte";
    import { page_key } from "$lib/stores/page_key";
    import { gen_date } from "$lib/js/helpers";
    import { locale } from "$lib/stores/i18n";
    import Html from "$lib/components/Html.svelte";
 
  
    onMount(() => {
      $page_key = "navbar.community.correlaidx";
    });
  
    /** @type {import('./$types').PageData} */
    export let data;
    let local_chapter;
    $: local_chapter = data.local_chapter;
   
  </script>
  
  <div class="container mx-auto">
    <h2>{local_chapter.translations[0].city}</h2>
    <Html
      source={local_chapter.translations[0].description}
      options={"prose-img:"}
      width={"text"}
    />
    
  </div>
  
  <style>
 
  </style>
  