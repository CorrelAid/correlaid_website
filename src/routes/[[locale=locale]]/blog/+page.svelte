<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import {gen_img_url} from '$lib/js/helpers';
  import BlogCard from '$lib/components/Blog_Card.svelte';

  onMount(() => {
    $page_key = 'navbar.blog';
  });

  /** @type {import('./$types').PageData} */
  export let data;

  let posts;
  $: posts = data.posts;
</script>

<div class="grid gap-6 xl:grid-cols-2">
  {#each posts as post, i}
    <div class={i == 0 ? 'col-span-full' : 'col-span-1'}>
      <BlogCard
        {i}
        langs={post.langs}
        href={$t('navbar.blog').url + '/' + post.translations.slug}
        title={post.translations.title}
        teaser={post.translations.teaser}
        tags={post.translations.tags}
        image_url={post.title_image
          ? gen_img_url(
              post.title_image.id,
              'fit=inside&width=1200&height=675&format=png',
            )
          : null}
        pubdate={post.pubdate}
        content_creators={post.content_creators}
      />
    </div>
  {/each}
</div>
