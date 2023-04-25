<!-- https://blog.openreplay.com/creating-a-svelte-tabs-component-with-slot-props/ -->
<script>
  export let id;
  export let activeTabValue;
</script>

<li class="" role="presentation">
  <button
    on:click
    class="active w-32 p-4 font-medium
      {id == 1 ? 'rounded-tl-lg' : 'rounded-tr-lg'}
      {activeTabValue == id ? 'bg-neutral-25 ' : 'bg-white'}"
    id="{id}-tabhead"
    type="button"
    role="tab"
  >
    <slot />
  </button>
</li>
