<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import IconSearch from 'phosphor-svelte/lib/MagnifyingGlass';
    import IconCaretUpDown from 'phosphor-svelte/lib/CaretUpDown';
    import IconCaretDown from 'phosphor-svelte/lib/CaretDown';
    import IconCaretUp from 'phosphor-svelte/lib/CaretUp';

    import { fade, fly, slide } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';

    let { data, form }: { data: PageData , form: ActionData} = $props();

    let showCategories:boolean = $state(false);
    let showFilters:boolean = $state(false);
    
    let formElement: HTMLFormElement;
    let filterCategories:string[] = $state([]);

    onMount(() => {
        enhance(formElement, ({ formData }) => {
            formData.set('categories', JSON.stringify(filterCategories));
        });
    });

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

<form bind:this={formElement} action="?/filter" method="get" class="flex flex-col">
    <div class="h-fit mb-2 flex">
        <div class="w-full flex items-center relative">
            <IconSearch class="absolute left-[10px]" size={18} color="#ffffff" />
            <input type="search" placeholder="Search" name="searchbar" class="w-full pl-8 pr-3 py-2 rounded-md border-transparent text-white placeholder:text-white focus:placeholder:text-transparent bg-foreground-alt">
        </div>
        <button type="button" onclick={() => showFilters = !showFilters} class="ml-4 px-3 py-2 flex items-center rounded bg-foreground-alt">
            <span>Filter</span>
            {#if showFilters}
                <IconCaretUp class="h-4 ml-2"/>
            {:else}
                <IconCaretDown class="h-4 ml-2"/>
            {/if}
        </button>
    </div>
    {#if showFilters}
        <div transition:slide class="flex space-x-4">
            <div class="w-full flex flex-col relative">
                <label for="filter-categories" class="mb-1 font-semibold">Category</label>
                <button type="button" onclick={openCategories} class="px-3 py-2 flex justify-between items-center rounded-md border-transparent text-left text-white bg-foreground-alt">
                    <span>Include {filterCategories.length > 0 ? `${filterCategories.length} Categories` : 'All'}</span>
                    <IconCaretUpDown class="h-4"/>
                </button>
                {#if showCategories}
                    <div onclick={(e) => e.stopPropagation()} role="button" tabindex={-1} onkeydown={(e) => e.preventDefault()} transition:fade={{ duration: 100 }} class="p-2 absolute top-20 rounded cursor-default bg-foreground-alt">
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
                <label for="release-date" class="mb-1 font-semibold">Publish Date</label>
                <input type="date" name="release-date" class="px-3 py-2 rounded-md border-transparent text-white bg-foreground-alt">
            </div>
            <div class="w-full flex flex-col">
                <label for="sort" class="mb-1 font-semibold">Sort from</label>
                <select name="sort" class="pl-3 pr-10 py-2 rounded-md border-transparent text-white bg-foreground-alt">
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        </div>
    {/if}
</form>