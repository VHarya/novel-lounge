<script lang="ts">
    import type { PageData } from './$types';
    import { dragscroll } from "@svelte-put/dragscroll";

    import IconCaretLeft from 'phosphor-svelte/lib/CaretLeft';
    import IconCaretRight from 'phosphor-svelte/lib/CaretRight';
    import IconError from 'phosphor-svelte/lib/WarningOctagon';
    import IconBooks from 'phosphor-svelte/lib/Books';

    import NovelChapterCard from '$lib/components/cardNovelChapter.svelte';
    import NovelCard from '$lib/components/cardNovel.svelte';
    
    let { data }: { data: PageData } = $props();

    function scrollList(direction:string) {
        const list = document.getElementById('new-releases')!;
        const scrollAmount = 500; // How far the list should scroll when a button is pressed

        if (direction === 'left') {
            list.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth', // Optional: Smooth scroll
            });
        } else if (direction === 'right') {
            list.scrollBy({
                left: scrollAmount,
                behavior: 'smooth', // Optional: Smooth scroll
            });
        }
    }
</script>


<div class="max-w-full mb-16 flex flex-col">
    <h2 class="mb-4 text-4xl font-lexend">New Releases</h2>
    {#if data.newNovels.length > 0}
        <div class="w-full h-fit max-w-full relative">
            <div id="new-releases" class="w-fit h-fit max-w-full flex gap-x-6 overflow-x-scroll overflow-y-hidden" use:dragscroll>
                {#each data.newNovels as item}
                    <NovelCard novel={item} />
                {/each}
            </div>
            <button onclick={() => scrollList('left')} class="p-2 absolute top-1/3 -left-8 rounded-full shadow bg-foreground">
                <IconCaretLeft size="1.5rem" weight="bold"/>
            </button>
            <button onclick={() => scrollList('right')} class="p-2 absolute top-1/3 -right-8 rounded-full shadow bg-foreground">
                <IconCaretRight size="1.5rem" weight="bold"/>
            </button>
        </div>
    {:else}
        <div class="w-full flex flex-col justify-center items-center">
            <IconBooks class="w-16 h-16 mb-2" weight="light"/>
            <div class="w-96 text-center">
                <h3 class="text-xl font-bold">No New Novels Yet...</h3>
                <p>There's currently no new novels yet, let's wait for a new one OR try your hands on uploading one</p>
            </div>
        </div>
    {/if}
</div>

<div class="flex flex-col">
    <h2 class="mb-4 text-4xl font-lexend">Recently Updated</h2>
    {#if data.newChapters.length > 0}
        <div class="max-h-[50rem] grid 3xl:grid-cols-2 3xl:grid-rows-3 grid-cols-1 grid-rows-1 bg-background-alt">
            {#each data.newChapters as item}
                <NovelChapterCard novel={item} />
            {/each}
        </div>
    {:else}
        <div class="py-20 flex flex-col justify-center items-center bg-background-alt">
            <IconError class="w-16 h-16 mb-2" weight="light"/>
            <div class="w-96 text-center">
                <h2 class="text-xl font-bold">No Updates</h2>
                <p>There's currently no updates yet, make sure to check back soon for any new chapters.</p>
            </div>
        </div>
    {/if}
</div>


<style></style>