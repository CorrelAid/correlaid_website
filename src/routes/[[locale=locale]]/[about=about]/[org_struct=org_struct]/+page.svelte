<script>
  import { page_key } from "$lib/stores/page_key.js";
  import { onMount } from "svelte";
 import Mermaid from "$lib/components/Mermaid.svelte";


  onMount(() => {
   
    $page_key = "navbar.about.org_struct";
  });

  const callback = function () {
    alert('A callback was triggered');
  };
</script>

<div class="container mx-auto max-w-screen">
<div class="lg:w-6/12 mx-auto">
<Mermaid>
  {"%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%"}
  flowchart TB
  id1(General Assemly) 
  id2(Board)
  id3(Ethics Commitee)
  id1 --- id2
  id1 --- id3
  click id1 "https://www.github.com" "This is a link"
</Mermaid>
</div>
</div>