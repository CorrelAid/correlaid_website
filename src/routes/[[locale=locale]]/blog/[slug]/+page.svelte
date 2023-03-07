<script>
  
  import Html from "$lib/components/Html.svelte";
  import { onMount } from "svelte";
  import { page_key } from "$lib/stores/page_key";
  import { gen_date } from "$lib/js/helpers";
  import { locale } from "$lib/stores/i18n";
  import _ from "lodash";
  import TextContainer from "$lib/components/Text_Container.svelte";

  onMount(() => {
    $page_key = "navbar.blog";
  });

  /** @type {import('./$types').PageData} */
  export let data;
  let pubdate;
  $: pubdate = data.pubdate;
  let lang_content;
  $: lang_content = data.lang_content;
  let content_creators;
  $: content_creators = data.content_creators;
  let proc_date;
  $: proc_date = gen_date(pubdate, $locale, true);
</script>

<TextContainer
  date={proc_date}
  title={lang_content.title}
  people={content_creators}
  title_image={lang_content.title_image}
  teaser={lang_content.teaser}
  content_creators={true}
>
  <Html source={lang_content.text} options={"prose-img:"} width={"text"} />
</TextContainer>
