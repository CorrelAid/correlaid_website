<script>
  import {browser} from '$app/environment';
  import {onMount} from 'svelte';
  import {fly, slide} from 'svelte/transition';
  import {bounceOut as easing} from 'svelte/easing';
  let {top = 0, children} = $props();
  let is_visible = $state(false);

  let has_seen = $state(true);

  export function dismiss() {
    if (browser && sessionStorage) {
      sessionStorage.setItem('lab_announcement_seen', 'true');
    }
    is_visible = false;
  }

  onMount(() => {
    if (browser && sessionStorage) {
      has_seen = sessionStorage.getItem('lab_announcement_seen') === 'true';
      if (has_seen) {
        is_visible = false;
        return;
      }
    }
    setTimeout(() => {
      is_visible = true;
    }, 1000);
  });
</script>

{#if is_visible}
  <div
    class="announcement-banner"
    class:visible={is_visible}
    in:slide={{axis: 'y', y: -100, duration: 600, easing}}
    out:slide={{axis: 'y', y: -100, duration: 200}}
    style="--top: {top}"
  >
    <div class="announcement-banner-content">
      {@render children?.()}
    </div>
    <button
      class="banner-exit-btn"
      style="color: #0f0f0f;"
      onclick={dismiss}
      aria-label="Schließen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-x"
        ><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg
      >
    </button>
  </div>
{/if}

<style>
  .announcement-banner {
    position: sticky;
    top: var(--top, 0);
    left: 0;
    width: 100%;
    background: linear-gradient(65deg, #a7baeb, #f1c6db);
    z-index: 1000;
    visibility: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem calc(1rem + 12px) 1rem 1rem;
    line-height: 1;
  }

  .announcement-banner.visible {
    visibility: visible;
  }

  .announcement-banner .announcement-banner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    position: relative;
  }

  .banner-exit-btn {
    color: #3c3c3c;
    position: absolute;
    top: 50%;
    right: 0;
    padding: 12px 6px; /* increase tap area for a11y */
    transform: translateY(-50%);
  }
</style>
