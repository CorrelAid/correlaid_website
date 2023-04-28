<script>
  import {t} from '$lib/stores/i18n';

  export let top_nav;

  export let lastClickedLink = '';
</script>

<div class="mb-3 mt-1 flex">
  <div class="mx-auto">
    <nav aria-label="Site Nav">
      <ul class="flex items-center gap-6 font-light tracking-wide">
        {#each top_nav as key}
          <li>
            <a
              class="transition hover:text-primary"
              on:click={() => (lastClickedLink = key)}
              class:text-primary={key === lastClickedLink}
              class:font-medium={key === lastClickedLink}
              href={$t(key).url}
            >
              {$t(key).text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>
