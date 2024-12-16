<script lang="ts">
    import type { PageData } from './$types';

    import IconCreate from 'phosphor-svelte/lib/Plus';
    import IconSearch from 'phosphor-svelte/lib/MagnifyingGlass';

    import DefaultCover from '$lib/images/cover-placeholder.png';
    import { formatToShortDate } from '$lib/utils';

    let { data }: { data: PageData } = $props();

    const novels = data.novels;
</script>

<div class="mb-5 flex justify-between items-center">
    <div class="flex flex-col">
        <h1 class="text-4xl font-bold font-lexend">Author Dashboard</h1>
        <span class="font-light font-lexend">Welcome to Author Dashboard</span>
    </div>
    <a href="/novel/create" class="h-fit p-2 flex items-center space-x-2 rounded bg-accent">
        <IconCreate size="1rem" weight="bold"/>
        <span>New Novel</span>
    </a>
</div>

<div class="flex flex-col">
    <div class="mb-2 flex items-center relative">
        <IconSearch class="absolute right-[10px]" size={18} color="#ffffff" />
        <input type="search" placeholder="Search" name="searchbar" class="w-full pl-3 pr-8 py-2 rounded-md border-transparent text-white placeholder:text-white focus:placeholder:text-transparent bg-foreground-alt">
    </div>
    <div class="flex space-x-4">
        <div class="flex-grow flex flex-col">
            <label for="filter-categories" class="mb-1 font-semibold">Category</label>
            <select name="filter-categories" class="pl-3 pr-10 py-2 rounded-md border-transparent text-white bg-foreground-alt">
                <option value="">All</option>
            </select>
        </div>
        <div class="flex-grow flex flex-col">
            <label for="filter-date" class="mb-1 font-semibold">Publish Date</label>
            <input type="date" name="filter-date" class="px-3 py-2 rounded-md border-transparent text-white bg-foreground-alt">
        </div>
        <div class="flex-grow flex flex-col">
            <label for="sort" class="mb-1 font-semibold">Sort from</label>
            <select name="sort" class="pl-3 pr-10 py-2 rounded-md border-transparent text-white bg-foreground-alt">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    </div>

    <ul class="my-10 flex flex-col space-y-4">
        {#each novels.items as novel}
            <li class="h-[18rem] flex space-x-4">
                <img src={novel.cover || DefaultCover} alt="'{novel.title}' Cover" class="h-full aspect-[5/7] object-cover rounded">
                <div class="h-[18rem] flex flex-col">
                    <h2 class="text-2xl font-bold">{novel.title}</h2>
                    <span>{formatToShortDate(novel.created)}</span>
                    <div class="my-2 overflow-y-scroll">{@html novel.synopsis}</div>
                    <div class="flex text-center">
                        <a href="/novel/{novel.id}" class="flex-grow">Show Page</a>
                        <a href="/novel/edit/{novel.id}" class="flex-grow">Edit Novel</a>
                        <a href="/novel/delete/{novel.id}" class="flex-grow">Delete Novel</a>
                    </div>
                </div>
            </li>
        {/each}
        <!-- <li class="h-[22rem] aspect-[5/7] relative">
            <img src="{DefaultCover}" alt="novel cover" class="rounded">
        </li> -->
    </ul>
</div>
