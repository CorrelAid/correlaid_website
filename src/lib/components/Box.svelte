<script>
  export let type = "primary";
</script>

<div class="w-full h-full rounded">
  {#if type == "primary"}
    <div
      class="w-full rounded-md bg-gradient-to-r from-primary-75 to-secondary-75 p-1"
    >
      <div
        class="h-full w-full items-center justify-center bg-white back px-3 py-5 space-y-2"
      >
        <slot />
      </div>
    </div>
  {:else if type == "correlaidx"}
    <div
      class="w-full rounded-md bg-gradient-to-r from-tertiary-75 to-secondary-75 p-1"
    >
      <div
        class="h-full w-full items-center justify-center  back px-3 py-5 text-white drop-shadow-md font-medium space-y-2"
      >
        <slot />
      </div>
    </div>
  {/if}
</div>
