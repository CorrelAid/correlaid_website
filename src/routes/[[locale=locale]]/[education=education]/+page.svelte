<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {Lamp, ReportCycle, Graph, DialogueLaptop} from '$lib/svg/nav_icons';
  import NavTiles from '$lib/components/NavTiles.svelte';

  onMount(() => {
    $page_key = 'navbar.education';
  });
  const navItems = [
    {key: 'navbar.education.resources', icon: Lamp},
    {key: 'navbar.education.learning_r', icon: ReportCycle},
    {key: 'navbar.education.tidy_tuesday', icon: Graph},
    {key: 'navbar.education.mentoring', icon: DialogueLaptop},
  ];
</script>

<NavTiles {navItems} />
