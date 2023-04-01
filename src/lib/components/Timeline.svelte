<script>
    export let steps;
    import Html from "$lib/components/Html.svelte";
    function check_x(i) {
        i = i + 1;
        if (i & 1) {
            return "left";
        } else {
            return "right";
        }
    }

    function check_border(i) {
        i = i + 1;
        if (i & 1) {
            return "border-l-2";
        } else {
            return "border-r-2";
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
    <div class="w-full relative ">
        <div
            class="w-3/4  {check_x(i)}-1/4 xl:w-2/3 xl:{check_x(
                i
            )}-1/3 grid grid-cols-3 xl:grid-cols-2  h-full absolute"
        >
            {#if check_odd(i) == false}
                <div />
            {/if}
            <div
                class="{i+1 === steps.length ? "" : "border-b-2"} {check_border(
                    i
                )} col-span-2 xl:col-span-1 border-neutral-25  relative py-12"
            >
                <span
                    class="text-lg font-semibold absolute {check_x(
                        i
                    )}-0 {check_odd(i) ? '-ml-5' : '-mr-5'} {check_odd(i)
                        ? 'bg-tertiary'
                        : 'bg-neutral text-white'} top-1/4 rounded-full flex items-center justify-center w-10 h-10"
                    >{i + 1}</span
                >
            </div>
            {#if check_odd(i) == true}
                <div />
            {/if}
        </div>
        <div
            class="w-3/4 xl:w-2/3 {check_odd(i)
                ? 'left-1/4 xl:left-1/3 relative'
                : ''} h-full  px-8 py-8 xl:py-12 z-30"
        >
            <Html
                source={step.timeline_steps_id.translations[0].text}
                options={""}
            />
        </div>
    </div>
{/each}
