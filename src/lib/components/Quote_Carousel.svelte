<script>
  import Carousel from '@wildfluss/svelte-carousel';
  import Html from '$lib/components/Html.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import {browser} from '$app/environment';
  import {gen_img_url} from '$lib/js/helpers';
  export let text_only = false;
  export let quotes;

  let carousel;

  function goTo(x) {
    carousel.goTo(x, {animated: true});
  }
</script>

<div class="border bg-gradient-to-r from-primary-75 to-secondary-75 text-white">
  <div class="container mx-auto">
    {#if browser}
      <!-- https://github.com/vadimkorr/svelte-carousel/issues/29 -->
      {#key quotes}
        <Carousel bind:this={carousel} arrows={true} dots={true}>
          {#each quotes as quote}
            <div class="">
              {#if text_only === false}
                <div class="grid xl:grid-cols-2">
                  <div class="flex flex-col items-center py-4 px-3">
                    {#if quote.quote_id.image}
                      <img
                        alt="Office"
                        src={gen_img_url(quote.quote_id.image.id)}
                        class="mb-3 h-36 w-36 rounded-full"
                      />
                      <p class="text-lg drop-shadow-md">
                        {quote.quote_id.translations[0].subtitle}
                      </p>
                    {:else}
                      <div class="h-36 w-36 rounded-full bg-neutral" />
                    {/if}
                  </div>
                  <div class="flex items-center justify-center py-4 px-3">
                    <p class="line-clamp-7 text-lg drop-shadow-md">
                      {quote.quote_id.translations[0].text}
                    </p>
                  </div>
                </div>
              {:else}
                <div class=" px-3">
                  <p class="line-clamp-7 pt-8 text-lg drop-shadow-md">
                    {quote.quote_id.translations[0].text}
                  </p>
                  <p
                    class="line-clamp-7 pt-6 text-right text-lg drop-shadow-md"
                  >
                    {quote.quote_id.translations[0].subtitle}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </Carousel>
      {/key}
    {/if}
  </div>
</div>
