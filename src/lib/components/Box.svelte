<script>
  export let type = 'primary';
</script>

<div class="h-full w-full rounded">
  {#if type == 'primary'}
    <div
      class="w-full rounded-md bg-gradient-to-r from-primary-75 to-secondary-75 p-1"
    >
      <div
        class="back h-full w-full items-center justify-center space-y-2 bg-white px-4 py-4"
      >
        <slot />
      </div>
    </div>
  {:else if type == 'correlaidx'}
    <div
      class="w-full rounded-md bg-gradient-to-r from-tertiary-75 to-secondary-75 p-1"
    >
      <div
        class="back h-full w-full items-center justify-center p-4 font-medium text-white drop-shadow-md"
      >
        <slot />
      </div>
    </div>
  {/if}
</div>
