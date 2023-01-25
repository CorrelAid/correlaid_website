<script>
  import { page_key } from "$lib/stores/page_key.js";
  import { onMount } from "svelte";
  import Mermaid from "$lib/components/Mermaid.svelte";

  onMount(() => {
    $page_key = "navbar.about.org_struct";
  });

  const callback = function () {
    alert("A callback was triggered");
  };
</script>

<div class="container  max-w-screen mx-auto py-6 px-6">
  <div class="grid lg:grid-cols-3 gap-4 px-6">
    <div class="col-span-1 border border-neutral-25 rounded">
      <div class="p-4">
        <h2 class=" ">Board</h2>
        <p class="">
          Der gewählte Vorstand von CorrelAid e.V., dem gemeinnützigen Verein,
          besteht aus CorrelAid Ehrenamtlichen. Sie arbeiten mit dem remote Büro
          zusammen und entwickeln die langfristige Strategie für CorrelAid.
        </p>
      </div>
    </div>
    <div class="col-span-1 py-4 border border-neutral-25 rounded">
      <div class="p-4">
        <h2 class=" ">Remote Office</h2>
        <p class="">
          Unsere Mitarbeiter*innen organisieren und koordinieren die tägliche
          Arbeit des CorrelAid Netzwerks.
        </p>
      </div>
    </div>
    <div class="col-span-1 py-4 border border-neutral-25 rounded">
      <div class="p-4">
        <h2 class=" ">Ethikkommission</h2>
        <p class="">
          Die Ethikkommission ist eine Arbeitsgruppe von CorrelAid e.V. Sie
          überprüft die Vereinstätigkeit hinsichtlich allgemeiner ethischer
          Werte und wird auf Verlangen tätig. Die Ethikkommission prüft das
          Verlangen und gibt eine schriftliche Stellungnahme zu ethischen
          Gesichtspunkten der Vereinstätigkeit ab.
        </p>
      </div>
    </div>
    <div class="col-span-full py-4 border border-neutral-25 rounded">
      <div class="p-4 ">
        <h2 class=" ">CorrelAidX</h2>
        <p class="">
          Im Rahmen von CorrelAidX haben wir - in Ergänzung zu unserem Remote
          Netzwerk - Local Chapter in einigen deutschen Städten sowie in den
          Niederlanden und in Paris gegründet. In einem Local Chapter können
          Data Scientists eigene Workshops und Hackathons organisieren sowie
          Projekte mit lokalen NPOs organisieren.
        </p>
      </div>
    </div>
    <div class="col-span-full border border-neutral-25 rounded">
      <div class="p-4 ">
        <h2 class=" ">General Assembly</h2>
        <p class="">
          That potentially includes you! Become a member now.
        </p>
      </div>
    </div>
  </div>
  <div class="lg:w-6/12 ">
    <!-- <Mermaid>
  {"%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%"}
  flowchart TB
  id1(General Assemly) 
  id2(Board)
  id3(Ethics Commitee)
  id1 --- id2
  id1 --- id3
  click id1 "https://www.github.com" "This is a link"
</Mermaid> -->
  </div>
</div>
