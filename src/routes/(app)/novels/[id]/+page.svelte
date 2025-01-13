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
    import IconAdd from 'phosphor-svelte/lib/Plus';
    import IconEdit from 'phosphor-svelte/lib/Pencil';
    import IconDelete from 'phosphor-svelte/lib/Trash';

    import PlaceholderImage from '$lib/images/cover-placeholder.png';
    import ModalRating from '$lib/components/modalRate.svelte';
    import { formatChapterTitle, formatToTimeAgo } from '$lib/utils';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';


    let { data }: { data: PageData } = $props();
    const novel = data.novel;
    const user = data.user;

    let isBookmarked = $state(data.bookmark ? true : false);
    let chapters = $state(data.chapters);
    let showRatingModal = $state(false);

    const searchParams = new URLSearchParams(page.url.searchParams);
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

    async function addBookmark() {
        const response = await fetch("/api/bookmarks/add", {
            method: 'post',
            body: JSON.stringify({
                'novel_id': novel.id
            }),
            headers: {
                'content-type': 'application/json'
            },
        });
        
        const responseBody = await response.json();

        if (response.status != 200) {
            toast.error(responseBody['message']);
            isBookmarked = false;
            return;
        }
        
        isBookmarked = true;
    }
    async function deleteBookmark() {
        const response = await fetch("/api/bookmarks/remove", {
            method: 'post',
            body: JSON.stringify({
                'bookmark_id': data.bookmark?.id
            }),
            headers: {
                'content-type': 'application/json'
            },
        });
        
        const responseBody = await response.json();

        if (response.status != 200) {
            toast.error(responseBody['message']);
            isBookmarked = true;
            return;
        }
        
        isBookmarked = false;
    }
</script>


<svelte:head>
    <title>{novel.title}</title>
</svelte:head>

<ModalRating bind:show={showRatingModal} onSubmit={(rating: any) => {console.log(`Rating: ${rating}`)}}/>

<div class="xl:h-80 2xl:h-96 my-8 flex flex-col xl:flex-row">
    <div class="w-fit h-full aspect-[5/7]">
        <img src="{novel.cover || PlaceholderImage}" alt="placeholder_image.png" class="h-full w-full rounded-xl object-contain">
    </div>
    
    <div class="h-full mt-4 xl:mt-0 xl:ml-4 flex flex-col">
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
        <div class="h-full max-h-full my-2 pr-3.5 overflow-scroll prose prose-base sm:prose-sm prose-p:mb-2">
            {@html novel.synopsis}
        </div>
        <div class="flex space-x-2">
            {#if user && user.id === novel.author}
                <a href="/chapters/create/{novel.id}" class="p-2 flex items-center space-x-1 rounded bg-accent">
                    <IconAdd size="1.15rem" weight="bold"/>
                    <span>Create New Chapter</span>
                </a>
            {/if}
            {#if isBookmarked}
                <button onclick={deleteBookmark} class="p-2 flex items-center space-x-1 rounded bg-foreground">
                    <IconBookmark size="1.2rem" weight="fill"/>
                    <span>Remove Bookmark</span>
                </button>
            {:else}
                <button onclick={addBookmark} class="p-2 flex items-center space-x-1 rounded bg-foreground">
                    <IconBookmark size="1.2rem"/>
                    <span>Add to Bookmark</span>
                </button>
            {/if}
            <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                <IconBookOpen size="1.2rem"/>
                <span>Read First Chapter</span>
            </button>
            <button onclick={() => showRatingModal = !showRatingModal} class="p-2 relative flex items-center space-x-1 rounded bg-foreground">
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
                        <a href="/chapters/{chapter.id}" class="h-fit inline-block font-bold">
                            <h4>{formatChapterTitle(chapter.chapter, chapter.title)}</h4>
                        </a>
                        <span class="text-sm">{formatToTimeAgo(chapter.created)}</span>
                    </div>
                    {#if user && user.id === novel.author}
                        <div class="flex space-x-2">
                            <a href="/chapters/edit/{novel.id}/{chapter.id}" class="h-fit p-2 flex items-center rounded bg-warning">
                                <IconEdit />
                            </a>
                            <a href="/chapters/delete/{chapter.id}" class="h-fit p-2 flex items-center rounded bg-error">
                                <IconDelete />
                            </a>
                        </div>
                    {:else if chapter.price > 0 && !chapter.isOwned}
                        <div class="w-14 h-fit px-2 py-1 flex justify-center items-center rounded bg-accent">
                            <IconCoin />
                            <span class="ml-1">{chapter.price}</span>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    {:else}
        <div class="my-10 flex flex-col items-center">
            <IconSad class="w-16 h-16 mb-2" weight="light"/>
            <div class="w-96 flex flex-col items-center text-center">
                <h2 class="text-xl font-bold">No Chapters</h2>
                <p>The author hasn't uploaded any chapters yet, check back later.</p>
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