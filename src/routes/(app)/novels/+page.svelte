<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import IconSearch from 'phosphor-svelte/lib/MagnifyingGlass';
    import IconCaretUpDown from 'phosphor-svelte/lib/CaretUpDown';
    import IconEmpty from 'phosphor-svelte/lib/WarningOctagon';

    import { fade, slide } from 'svelte/transition';
    import DefaultCover from '$lib/images/cover-placeholder.png';
    import { convertFilenameToFileURL } from '$lib/utils';

    let { data }: { data: PageData } = $props();

    let title:string = $state('');
    let filterCategories:string[] = $state([]);
    let releaseDate:string = $state('');
    let sorting:string = $state('newest');
    let showCategories:boolean = $state(false);

    if (data.paramData) {
        title = data.paramData.paramTitle || '';
        filterCategories = data.paramData.paramCategories || [];
        releaseDate = data.paramData.paramRelease || '';
        sorting = data.paramData.paramSort || 'newest';
    }

    function openCategories(e:MouseEvent) {
        e.stopPropagation();
        showCategories = !showCategories;
    }

    function closeCategories() {
        if (!showCategories) { return; }
        showCategories = false;
    }

    function onItemSelected(e:MouseEvent, id:string) {
        e.stopPropagation();
        if (filterCategories.includes(id)) {
            const index = filterCategories.indexOf(id);
            filterCategories.splice(index, 1);
        }
        else {
            filterCategories.push(id);
        }
    }
</script>

<svelte:window onclick={closeCategories}/>

<form method="get" class="mb-10 flex flex-col">
    <div class="h-fit mb-2 flex">
        <div class="w-full flex items-center relative">
            <IconSearch class="absolute left-[10px]" size={18} color="#ffffff" />
            <input type="search" placeholder="Search Title" name="title" value={title} class="w-full pl-8 pr-3 py-2 rounded-md border-transparent text-white placeholder:text-white focus:placeholder:text-transparent bg-foreground-alt">
        </div>
        <button type="submit" class="ml-4 px-3 py-2 flex items-center rounded bg-accent/80 hover:bg-accent">
            <span class="text-nowrap">Confirm Search</span>
        </button>
    </div>
    <div transition:slide class="flex space-x-4">
        <div class="w-full flex flex-col relative">
            <label for="categories" class="mb-1 font-semibold">Category</label>
            <input type="hidden" name="categories" value={filterCategories.toString()}>
            <button type="button" onclick={openCategories} class="px-3 py-2 flex justify-between items-center rounded-md border-transparent text-left text-white bg-foreground-alt">
                <span>Include {filterCategories.length > 0 ? `${filterCategories.length} Categories` : 'All'}</span>
                <IconCaretUpDown class="h-4"/>
            </button>
            {#if showCategories}
                <div onclick={(e) => e.stopPropagation()} role="button" tabindex={-1} onkeydown={(e) => e.preventDefault()} transition:fade={{ duration: 100 }} class="px-4 py-3 absolute top-20 z-50 rounded cursor-default bg-foreground-alt">
                    <h1 class="mb-2 font-bold">Categories</h1>
                    <div class="flex flex-wrap gap-2">
                        {#each data.categories as category}
                            <button 
                                type="button"
                                onclick={(e) => onItemSelected(e, category.id)}
                                class="px-2 py-1 text-sm font-bold rounded {filterCategories.includes(category.id) ? 'bg-accent' : 'bg-foreground'}"
                            >
                                {category.name}
                            </button>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
        <div class="w-full flex flex-col">
            <label for="release-date" class="mb-1 font-semibold">Release Date</label>
            <input type="date" name="release-date" value={releaseDate} class="px-3 py-2 rounded-md border-transparent text-white bg-foreground-alt">
        </div>
        <div class="w-full flex flex-col">
            <label for="sort" class="mb-1 font-semibold">Sort from</label>
            <select name="sort" value={sorting} class="pl-3 pr-10 py-2 rounded-md border-transparent text-white bg-foreground-alt">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    </div>
</form>

{#if data.novels.items.length > 0}
    <div class="grid 3xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-14">
        {#each data.novels.items as novel}
            <a href="/novels/{novel.id}" class="relative hover:scale-[101%]">
                <img src={novel.cover || DefaultCover} alt="Novel Cover" class="w-fit h-full aspect-[5/7] rounded object-contain object-center bg-foreground-alt">
                <span class="w-full p-4 absolute bottom-0 left-0 transition bg-gradient-to-t from-black/60 to-transparent">
                    {novel.title}
                </span>
            </a>
        {/each}
    </div>
{:else}
    <div class="w-full h-full py-8 flex flex-col justify-center items-center">
        <IconEmpty size="10rem"/>
        <span class="text-2xl font-bold">No Novels Found</span>
        <p>Sadly there's currently no novels here</p>
    </div>
{/if}