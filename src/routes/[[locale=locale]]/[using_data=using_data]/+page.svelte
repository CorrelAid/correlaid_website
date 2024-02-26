<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {
    LampGears,
    HandDialogue,
    LaptopsTime,
    Database,
  } from '$lib/svg/nav_icons';
  import NavTiles from '$lib/components/NavTiles.svelte';

  onMount(() => {
    $pageKey = 'navbar.using_data';
  });

  $: navItems = [
    {key: 'navbar.using_data.projects', icon: LampGears},
    {key: 'navbar.using_data.project_database', icon: Database},
    {key: 'navbar.using_data.consulting', icon: HandDialogue},
    {key: 'navbar.using_data.hackathons', icon: LaptopsTime},
  ];
</script>

<NavTiles {navItems} />
