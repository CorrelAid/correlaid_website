<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {LampGears, HandDialogue, LaptopsTime} from '$lib/svg/nav_icons';
  import NavTiles from '$lib/components/NavTiles.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data';
  });

  const navItems = [
    {key: 'navbar.using_data.projects', icon: LampGears},
    {key: 'navbar.using_data.consulting', icon: HandDialogue},
    {key: 'navbar.using_data.hackathons', icon: LaptopsTime},
  ];
</script>

<NavTiles {navItems} />
