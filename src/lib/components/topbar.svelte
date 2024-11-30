<script>
	import Search from "phosphor-svelte/lib/MagnifyingGlass";
    import List from "phosphor-svelte/lib/List";

    const {
        sidebarShown = $bindable(),
        onShowButtonPressed,
    } = $props();
    
</script>

<div class="w-full px-8 py-4 border-b-2 border-accent sticky top-0 z-10 flex justify-between bg-background">
    <div class="flex items-center">
        {#if !sidebarShown}
            <button onclick="{onShowButtonPressed}" class="mr-4">
                <List size={24}/>
            </button>
        {/if}
        <div class="relative">
            <Search class="absolute right-[10px] translate-y-[50%]" weight="bold" size={18} />
            <input type="search" placeholder="Search" name="searchbar" class="w-80 pl-4 pr-8 py-1.5 rounded-md border-transparent placeholder:text-white bg-background-alt">
        </div>
    </div>
    <div class="flex">
        <a href="#" class="px-6 py-2 align-middle rounded-xl text-sm font-bold">Daftar</a>
        <a href="#" class="px-6 py-2 align-middle rounded-xl text-sm font-bold">Masuk</a>
    </div>
</div>