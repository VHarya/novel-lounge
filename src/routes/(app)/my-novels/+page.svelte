<script lang="ts">
    import type { PageData } from './$types';

    import IconCreate from 'phosphor-svelte/lib/Plus';
    import IconSearch from 'phosphor-svelte/lib/MagnifyingGlass';

    import DefaultCover from '$lib/images/cover-placeholder.png';
    import { formatToShortDate } from '$lib/utils';
    import { toast } from 'svelte-sonner';

    let { data }: { data: PageData } = $props();

    const novels = data.novels;

    function deleteNovel(novelId:string) {
        const confirmed = confirm('Are you sure? The data will be lost permanently.');
        
        if (confirmed) {
            fetch(`/novel/delete/${novelId}`, { method: 'get' })
                .then((res) => {
                    if (!res.ok) {
                        toast.error(`Failed to delete ${res.text()}`);
                        return;
                    }
                    toast.success('Successfully Deleted!');
                    location.reload();
                });
        }
    }
</script>

<div class="mb-5 flex justify-between items-center">
    <h1 class="text-4xl font-bold font-lexend">My Novels</h1>
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

    <ul class="my-10 grid grid-cols-4 gap-4">
        {#each novels.items as novel}
            <li class="p-4 flex flex-col rounded bg-background-alt">
                <img src={novel.cover || DefaultCover} alt="'{novel.title}' Cover" class="h-fit w-full aspect-[5/7] object-cover rounded">
                <div class="h-full flex flex-col justify-between">
                    <div class="mb-2 flex flex-col">
                        <h2 class="text-xl font-bold line-clamp-1">{novel.title}</h2>
                        <span class="text-sm">{formatToShortDate(novel.created)}</span>
                    </div>
                    <div class="flex flex-col text-center space-y-2">
                        <a href="/novel/{novel.id}" class="w-full px-2 py-1 rounded text-sm font-bold bg-accent/95 hover:bg-accent">Show Details</a>
                        <div class="flex space-x-2">
                            <a href="/novel/edit/{novel.id}" class="w-full px-2 py-1 rounded text-sm font-bold bg-yellow-500/95 hover:bg-yellow-500">Edit Novel</a>
                            <!-- <form action="?/delete" method="post" onsubmit={onSubmit} class="w-full">
                                <input type="text" name="novel-id" value={novel.id} hidden>
                                <button type="submit" class="w-full px-2 py-1 rounded text-sm font-bold bg-red-500/95 hover:bg-red-500">Delete Novel</button>
                            </form> -->
                            <button type="button" onclick={() => deleteNovel(novel.id)} class="w-full px-2 py-1 rounded text-sm font-bold bg-red-500/95 hover:bg-red-500">Delete Novel</button>
                            <!-- <a href="/novel/delete/{novel.id}" class="w-full px-2 py-1 rounded text-sm font-bold bg-red-500/95 hover:bg-red-500">Delete Novel</a> -->
                        </div>
                    </div>
                </div>
            </li>
        {/each}
        <!-- <li class="h-[22rem] aspect-[5/7] relative">
            <img src="{DefaultCover}" alt="novel cover" class="rounded">
        </li> -->
    </ul>
</div>
