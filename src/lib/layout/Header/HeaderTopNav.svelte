<script>
  import {t} from '$lib/stores/i18n';

  export let topNav;

  export let lastClickedLink = '';
</script>

<div class="mb-3 mt-1 flex">
  <div class="mx-auto">
    <nav aria-label="Top Navigation">
      <ul
        class="flex items-center gap-6 font-light tracking-wide text-base-content"
      >
        {#each topNav as key}
          <li>
            <a
              class="transition hover:text-primary"
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
