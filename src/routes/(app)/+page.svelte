<script lang="ts">
    import type { PageData } from './$types';

    import { dragscroll } from "@svelte-put/dragscroll";

    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import IconEye from 'phosphor-svelte/lib/Eye';
    import IconBookmark from 'phosphor-svelte/lib/BookmarkSimple';
    import IconStar from 'phosphor-svelte/lib/Star';

    import PlaceholderImage from '$lib/images/cover-placeholder.png';

    import NovelWithChapterCard from '$lib/components/cards/novelWithChapter.svelte';
    import NovelCard from '$lib/components/cards/novel.svelte';
    
    let { data }: { data: PageData } = $props();
</script>

<main class="max-w-screen">
    <div class="section-popular h-fit 3xl:px-36 2xl:px-28 xl:px-20 lg:px-14 py-8 relative flex bg-gradient-to-t from-background from-10%">
        <div class="h-[24rem] aspect-[5/7]">
            <img src="{PlaceholderImage}" alt="placeholder_image.png" class="h-full w-full rounded-xl">
        </div>
        <div class="h-[24rem] ml-4 flex flex-col">
            <h3 class="text-3xl font-bold">Novel Title</h3>
            <div class="mb-1 flex items-center">
                <IconPerson size={18} weight="bold" />
                <span class="ml-1 text-sm">Writer Name</span>
            </div>
            <div class="mb-2 flex space-x-2">
                <div class="flex items-center">
                    <IconEye size={16} weight="bold" />
                    <span class="ml-1 text-sm">20k</span>
                </div>
                <div class="flex items-center">
                    <IconBookmark size={16} weight="bold" />
                    <span class="ml-1 text-sm">20k</span>
                </div>
                <div class="flex items-center">
                    <IconStar size={16} weight="bold" />
                    <span class="ml-1 text-sm">20k</span>
                </div>
            </div>
            <p class="overflow-scroll text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  non tempor lectus, ac malesuada nunc. Vivamus risus felis, vulputate ut  sodales eu, lobortis nec magna. Suspendisse sagittis felis eget purus  eleifend ultricies ac eu quam. Sed nulla felis, bibendum commodo lacus  vitae, vulputate feugiat est. Proin pellentesque nunc nec nibh  ullamcorper congue. Etiam et viverra ex, sit amet rutrum felis. Mauris  in ligula quis libero condimentum condimentum. Donec imperdiet ipsum eu  odio gravida, eget semper elit malesuada.
                <br>
                Suspendisse ullamcorper id tellus a dignissim. Sed facilisis quis elit a tincidunt. Nunc consequat vulputate elit, eget egestas turpis. Aenean  eu dolor sem. Pellentesque ac nunc tempus, ultrices sem vel, bibendum  elit. Nam vulputate eros quam, at rhoncus turpis condimentum sed.  Curabitur dignissim quis orci at elementum. Curabitur vitae est congue,  malesuada odio a, efficitur lorem. Aliquam erat volutpat. Maecenas  suscipit, dui eget dictum congue, massa ipsum viverra augue, venenatis  dapibus nisi metus eu lorem. Cras fringilla elementum vestibulum. Ut  euismod eleifend nisl, vitae luctus odio ultrices eu. Nullam id  vulputate ex, id scelerisque dolor. Vestibulum ante ipsum primis in  faucibus orci luctus et ultrices posuere cubilia curae; Praesent ut  gravida quam. Suspendisse ut elementum mi.
            </p>
        </div>
    </div>
    
    <div class="3xl:mx-36 2xl:mx-28 xl:mx-20 lg:mx-14 my-14 flex flex-col">
        <div class="flex flex-col">
            <h2 class="mb-4 text-4xl font-lexend">Rilisan Terbaru</h2>
            <div class="grid 3xl:grid-cols-3 3xl:grid-rows-3 2xl:grid-cols-2 2xl:grid-rows-2 grid-cols-1 grid-rows-1 gap-8 bg-background-alt">
                {#if data.newChapters != undefined}
                    {#each data.newChapters as item}
                        <NovelWithChapterCard novel={item} />
                    {/each}
                {/if}
            </div>
        </div>
    
        <div class="max-w-full mt-16 flex flex-col">
            <h2 class="mb-4 text-4xl font-lexend">Novel Baru</h2>
            <div class="max-w-full w-fit flex gap-8 overflow-x-scroll overflow-y-hidden" use:dragscroll>
                {#each data.newNovels as item}
                    <NovelCard novel={item} />
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    .section-popular::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0%;
        right: 0%;
        z-index: -1;
        background-image: url($lib/images/cover-placeholder.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        /* opacity: 15%; */
    }
</style>