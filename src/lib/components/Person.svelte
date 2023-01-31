<script>
    export let name;
    export let position;
    export let description;
    export let img;
</script>

<div class="rounded grid grid-cols-4 mb-6">
    <div class="col-span-full xl:col-span-2  ">
        <div class="relative offset w-56 h-56 mx-auto">
            <img
                class="w-56 h-56 border-4 border-neutral rounded"
                src={img}
                alt={name}
            />
        </div>
    </div>
    <div class="col-span-full xl:col-span-2 xl:pt-0 pt-5 px-4 text-neutral">
        <h2 class="text-2xl text-primary">{name}</h2>
        <h3 class="text-lg pt-2 pb-3">{position}</h3>
        <p>{description}</p>
    </div>
</div>

<style>
    .offset::after {
        content: "";
        border-radius: 4px;
        border: 7px solid transparent;
        background: linear-gradient(to left, #3863a2, #96c342) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        top: -10px;
        right: 10px;
        bottom: 10px;
        left: -10px;
        position: absolute;
        z-index: 10;
        opacity: 0.8;
    }
</style>
