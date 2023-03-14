<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";

  onMount(() => {
    $page_key = "navbar.community.founding_lc";
  });
</script>

<div class="text_width px-4">
  <!-- First -->
  <div class="w-full relative ">
    <div
      class="w-3/4  left-1/4 xl:w-2/3 xl:left-1/3 grid grid-cols-3 xl:grid-cols-2  h-full absolute"
    >
      <div
        class="border-b-2 border-l-2 col-span-2 xl:col-span-1 border-neutral-25  relative py-12"
      >
        <span
          class="text-lg font-semibold absolute left-0 -ml-5 bg-tertiary top-1/4 rounded-full flex items-center justify-center w-10 h-10"
          >1</span
        >
      </div>
      <div />
    </div>
    <div
      class="w-3/4 left-1/4 xl:w-2/3 xl:left-1/3 h-full relative pl-10 py-8 xl:py-12 "
    >
      <h3 class="text-xl pb-3 font-semibold">Informieren</h3>
      <p class="">
        Ein Wasser-Quartier ist ein festgelegtes Gebiet in Eurer Kommune. Bisher
        gibt es bereits 19 Wasser-Quartiere im bundesweiten Netzwerk. Falls Ihr
        noch nicht unsere Wasser-Quartiere kennt, schaut Euch doch einmal in
        unserer Galerie der Bestehenden um.
      </p>
    </div>
  </div>
  <!-- Second -->
  <div class="w-full relative ">
    <div
      class="w-3/4 right-1/4 xl:w-2/3 xl:right-1/3 grid grid-cols-3 xl:grid-cols-2  h-full absolute "
    >
      <div />
      <div
        class="border-b-2 border-r-2 border-neutral-25  col-span-2 xl:col-span-1 relative py-12"
      >
        <span
          class="text-lg font-semibold absolute right-0 -mr-5 bg-neutral top-1/4 rounded-full flex items-center justify-center w-10 h-10 text-white"
          >2</span
        >
      </div>
    </div>
    <div class="w-3/4  xl:w-2/3  h-full pr-10 py-8 xl:py-12">
      <h3 class="text-xl pb-3 font-semibold">Kontakt aufnehmen</h3>
      <p class="">
        Ihr habt Euch entschieden, Leitungswasser ins Rampenlicht zu rücken?
        Dann schreibt uns eine Mail. Wir stehen Euch unterstützend und beratend
        zur Seite. Kontaktiert unsere Community Managerin Isabel.
      </p>
    </div>
  </div>
  <!-- First -->
  <div class="w-full relative ">
    <div
      class="w-3/4  left-1/4 xl:w-2/3 xl:left-1/3 grid grid-cols-3 xl:grid-cols-2  h-full absolute"
    >
      <div
        class="border-l-2 col-span-2 xl:col-span-1 border-neutral-25  relative py-12"
      >
        <span
          class="text-lg font-semibold absolute left-0 -ml-5 bg-tertiary top-1/4 rounded-full flex items-center justify-center w-10 h-10"
          >3</span
        >
      </div>
      <div />
    </div>
    <div
      class="w-3/4 left-1/4 xl:w-2/3 xl:left-1/3 h-full relative pl-10 py-8 xl:py-12 "
    >
      <h3 class="text-xl pb-3 font-semibold">Wasser-Quartier starten!</h3>
      <p class="">
        Die Wasserwende ist eine Gemeinschaftsaufgabe, die Ihr mit einem
        Netzwerk aus verschiedenen Partner*innen bei Euch im Wasser-Quartier
        umsetzt. In einem angemessenen Rahmen (z.B. am Weltwassertag,
        Weltumwelttag, Tag der Daseinsvorsorge) und mit einem
        zielgruppenorientierten Kommunikationsplan startet Ihr Euer
        Wasser-Quartier und sichert so von Beginn an eine erfolgreiche
        Umsetzung. Weltumwelttag, Tag der Daseinsvorsorge) und mit einem
        zielgruppenorientierten Kommunikationsplan startet Ihr Euer
        Wasser-Quartier und sichert so von Beginn an eine erfolgreiche
        Umsetzung. 
    </div>
  </div>
</div>
