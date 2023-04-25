<script>
  export let steps;
  import Html from '$lib/components/Html.svelte';
  function check_x(i) {
    i = i + 1;
    if (i & 1) {
      return 'left';
    } else {
      return 'right';
    }
  }

  function check_border(i) {
    i = i + 1;
    if (i & 1) {
      return 'border-l-2';
    } else {
      return 'border-r-2';
    }
  }
  function check_odd(i) {
    i = i + 1;
    if (i & 1) {
      return true;
    } else {
      return false;
    }
  }
</script>

{#each steps as step, i}
  <div class="relative w-full">
    <div
      class="w-3/4 {check_x(i)}-1/4 xl:w-2/3 xl:{check_x(
        i,
      )}-1/3 absolute grid h-full grid-cols-3 xl:grid-cols-2"
    >
      {#if check_odd(i) == false}
        <div />
      {/if}
      <div
        class="{i + 1 === steps.length ? '' : 'border-b-2'} {check_border(
          i,
        )} relative col-span-2 border-neutral-25 py-12 xl:col-span-1"
      >
        <span
          class="absolute text-lg font-semibold {check_x(i)}-0 {check_odd(i)
            ? '-ml-5'
            : '-mr-5'} {check_odd(i)
            ? 'bg-tertiary'
            : 'bg-neutral text-white'} top-1/4 flex h-10 w-10 items-center justify-center rounded-full"
          >{i + 1}</span
        >
      </div>
      {#if check_odd(i) == true}
        <div />
      {/if}
    </div>
    <div
      class="w-3/4 xl:w-2/3 {check_odd(i)
        ? 'relative left-1/4 xl:left-1/3'
        : ''} z-20 h-full px-8 py-8 xl:py-12"
    >
      <Html source={step.timeline_steps_id.translations[0].text} options={''} />
    </div>
  </div>
{/each}
