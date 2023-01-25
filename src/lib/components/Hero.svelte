<script>
    import Text from "$lib/components/Text.svelte";
    export let text;
    export let image_id;
    import {header_height} from '$lib/stores/dims.js'

</script>

<section
  class="relative bg-cover bg-center bg-no-repeat" style="background-image: url({`https://6xdv3yb3.directus.app/assets/${image_id}`}); height: calc(100vh - {$header_height}px)"
>
  <div
    class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
  ></div>

  <div
    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div class="max-w-xl text-center sm:text-left">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Let us find your

        <strong class="block font-extrabold text-rose-700">
          Forever Home.
        </strong>
      </h1>

      <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>

      <div class="mt-8 flex flex-wrap gap-4 text-center">
        <a
          href="#"
          class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        >
          Get Started
        </a>

        <a
          href="#"
          class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

  

<style>
    .hero-overlay {
        background: linear-gradient(45deg,rgba(56, 99, 162, .82), rgba(146, 222, 63, .82));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .hero-text :global(h1) {
        color: white;
    }

</style>
