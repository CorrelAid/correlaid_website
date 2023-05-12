<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import BlogCard from '$lib/components/Blog_Card.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  onMount(() => {
    $page_key = 'navbar.blog';
  });

  /** @type {import('./$types').PageData} */
  export let data;

  let posts;
  $: posts = parseEntries(data.posts, 'blog_posts');
</script>

<div class="space-y-8">
  {#each posts as post, i}
    <div class={i === 0 ? 'col-span-full' : 'col-span-1'}>
      <BlogCard {...post} />
    </div>
  {/each}
</div>
