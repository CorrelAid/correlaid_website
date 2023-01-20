<script>
    export let href;
    export let title;
    export let teaser;
    export let image_url;
</script>

<article
                class="overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative"
            >
                <span
                    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary"
                />
                <img
                    alt="Office"
                    src={image_url}
                    class="w-full object-cover"
                    width=100p
                    height=100
                />

                <div class="p-4 sm:p-6">
                    <a
                        href={href}
                    >
                        <h3 class="text-lg font-medium text-base-content">
                            {title}
                        </h3>
                    </a>

                    <p
                        class="mt-2 text-sm leading-relaxed text-base-content line-clamp-3"
                    >
                    {teaser}
                       
                    </p>

                    <a
                        href={href}
                        class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-base-content"
                    >
                        Find out more

                        <span
                            aria-hidden="true"
                            class="block transition group-hover:translate-x-0.5"
                        >
                            &rarr;
                        </span>
                    </a>
                </div>
            </article>

<style>
    img{
        height: 50%;
        width: 100%;
    }
</style>