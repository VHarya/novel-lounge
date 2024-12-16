<script lang="ts">
    import type { PageData } from './$types';

    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import IconEye from 'phosphor-svelte/lib/Eye';
    import IconBookmark from 'phosphor-svelte/lib/BookmarkSimple';
    import IconStar from 'phosphor-svelte/lib/Star';
    import IconFlag from 'phosphor-svelte/lib/Flag';
    import IconBookOpen from 'phosphor-svelte/lib/BookOpen';
    import IconCoin from 'phosphor-svelte/lib/Coins';
    import IconSad from 'phosphor-svelte/lib/MaskSad';

    import PlaceholderImage from '$lib/images/cover-placeholder.png';
    import { formatToTimeAgo } from '$lib/utils';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let { data }: { data: PageData } = $props();
    
    const novel = data.novel;
    let chapters = $state(data.chapters);

    let backgroundImage = PlaceholderImage;

    function formatChapterTitle(volumeNumber:number|null, chapterNumber:number|null, chapterTitle:string) {
        const volume = volumeNumber ? `Vol. ${volumeNumber}` : '';
        const chapterNum = chapterNumber ? `Ch. ${chapterNumber}` : '';
        const dash = volume || chapterNum ? '-' : '';
        return `${volume} ${chapterNum} ${dash} ${chapterTitle}`.trim();
    }


    const searchParams = new URLSearchParams($page.url.searchParams);
    let currentSort = $state(searchParams.get('sort') || 'newest');
    let currentPage = $state(parseInt(searchParams.get('page') || '1'));
    $effect(() => {
        chapters = data.chapters
    })
    
    function fromOldest() {
        currentSort = 'oldest';
        searchParams.set('sort', 'oldest');
        goto(`?${searchParams}`);
    }
    function fromNewest() {
        currentSort = 'newest';
        searchParams.set('sort', 'newest');
        goto(`?${searchParams}`);
    }
    function changePage(page:number) {
        currentPage = page;
        searchParams.set('page', page.toFixed(0));
        goto(`?${searchParams}`);
    }
</script>

<div class="h-96 my-8 relative flex" style="--bg-image: url({backgroundImage})">
    <div class="h-full aspect-[5/7]">
        <img src="{novel.cover || PlaceholderImage}" alt="placeholder_image.png" class="h-full w-full rounded-xl">
    </div>
    
    <div class="h-full ml-4 flex flex-col">
        <h1 class="text-3xl font-bold">{novel.title}</h1>
        <a href="/user/{novel.expand.author.id}">
            <div class="mb-1 flex items-center">
                <IconPerson size={18} weight="bold" />
                <span class="ml-1 text-sm">{novel.expand.author.username}</span>
            </div>
        </a>
        <div class=" flex space-x-2">
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
        <div class="h-full my-2 overflow-scroll text-sm">
            {@html novel.synopsis}
        </div>
        <div class="flex space-x-2">
            <button class="p-2 flex items-center space-x-1 rounded bg-accent">
                <IconBookmark size="1.2rem"/>
                <span>Add to Bookmark</span>
            </button>
            <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                <IconBookOpen size="1.2rem"/>
                <span>Read First Chapter</span>
            </button>
            <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                <IconStar size="1.2rem"/>
                <span>Rate</span>
            </button>
            <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                <IconFlag size="1.2rem"/>
                <span>Report</span>
            </button>
        </div>
    </div>
</div>

<div class="my-8 p-4 rounded bg-background-alt">
    <div class="mb-4 flex items-center space-x-4">
        <span class="flex-grow font-bold">Total Chapters - {data.chapters.totalItems}</span>
        {#if currentSort === 'newest'}
            <button onclick={fromOldest} class="px-3 py-1 rounded bg-foreground">Newest</button>
        {:else}
            <button onclick={fromNewest} class="px-3 py-1 rounded bg-foreground">Oldest</button>
        {/if}
    </div>
    {#if chapters.items.length > 0}
        <ul class="mb-4 space-y-4">
            {#each chapters.items as chapter}
                <li class="px-4 py-2 flex items-center rounded bg-foreground">
                    <div class="mr-4 flex-grow flex flex-col">
                        <a href="/chapter/123" class="h-fit inline-block font-bold">
                            <h4>{formatChapterTitle(chapter.volumeNumber, chapter.chapterNumber, chapter.chapterTitle)}</h4>
                        </a>
                        <span class="text-sm">{formatToTimeAgo(chapter.created)}</span>
                    </div>
                    {#if chapter.price > 0}
                        <div class="h-fit px-2 py-1 flex items-center rounded bg-accent">
                            <IconCoin />
                            <span class="ml-1">{chapter.price}</span>
                        </div>
                    {:else}
                        <span class="h-fit px-2 py-1 flex items-center rounded font-bold bg-green-600">Free</span>
                    {/if}
                </li>
            {/each}
        </ul>
    {:else}
        <div class="my-10 flex flex-col items-center">
            <IconSad size="8rem" weight="light"/>
            <div class="w-[20rem] mt-4 flex flex-col items-center text-center">
                <h2 class="text-xl font-bold">No Chapters</h2>
                <p class="text-sm">The author hasn't uploaded any chapters yet, check back later.</p>
            </div>
        </div>
    {/if}

    <ul class="w-full flex justify-center space-x-2 overflow-scroll">
        {#each Array(data.chapters.totalPages) as _, index}
            {#if currentPage === index+1}
                <li class="min-w-8 min-h-8 rounded bg-accent">
                    <button onclick={() => changePage(index+1)} class="w-full h-full">{index+1}</button>
                </li>
            {:else}
                <li class="min-w-8 min-h-8 rounded bg-foreground">
                    <button onclick={() => changePage(index+1)} class="w-full h-full">{index+1}</button>
                </li>
            {/if}
        {/each}
    </ul>
</div>

<style>
    /* .section-popular::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0%;
        right: 0%;
        z-index: -1;
        background-image: var(--bg-image);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        opacity: 15%;
    } */
</style>