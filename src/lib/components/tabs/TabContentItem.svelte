<script lang="ts">
    export let activeTabValue;
    export let id;
   
  </script>
  

    <div class="h-full w-full {activeTabValue === id ? "" : "hidden"}" id="{id}-tabitem" role="tabpanel" aria-labelledby="{id}-tab">
      <slot />
    </div>
