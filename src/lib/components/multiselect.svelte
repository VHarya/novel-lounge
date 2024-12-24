<script lang="ts">
    import IconCaretSelect from "phosphor-svelte/lib/CaretUpDown";

    interface Props {
        items: Map<string, string>[],
        placeholder: string,
        onSelected: Function,
        className?: string,
    }

    const { items, placeholder, onSelected, className } : Props = $props();

    let selectedItem:string[] = $state([]);
    let showMenu:boolean = $state(false);
    let outerDiv:HTMLDivElement|null = null;

    function on_click_outside(event: MouseEvent | TouchEvent) {
        if (outerDiv && !outerDiv.contains(event.target as Node)) {
            showMenu = false;
        }
    }
</script>

<svelte:window onclick={on_click_outside}/>

<div bind:this={outerDiv} class="relative {className}">
    <button type="button" onclick={() => showMenu = true } class="w-full p-1 pr-8 relative flex items-center space-x-2 {!showMenu ? 'rounded-md' : 'rounded-t-md'} text-left bg-foreground-alt">
        {#if selectedItem.length > 0}
            <div id="selected-items" class="flex space-x-2 overflow-x-scroll">
                {#each selectedItem as item}
                    <span class="w-fit m-1 p-1 whitespace-nowrap text-sm bg-background">{item}</span>
                {/each}
            </div>
        {:else}
            <span class="w-full m-1">{placeholder}</span>
        {/if}
        <IconCaretSelect size="1.2rem" weight="bold" class="absolute right-2"/>
    </button>
    
    {#if showMenu}
    <div class="w-full my-2 p-2 pt-4 absolute top-full left-0 shadow-lg bg-foreground-alt">
        {#if items.length > 0}
            {#each items as item}
                <button type="button" onclick={() => selectedItem.push('Option 1') } class="px-2 py-1 rounded-md bg-background">item</button>
            {/each}
        {:else}
            <span class="w-full m-1">No Items Found</span>
        {/if}
    </div>
    {/if}
</div>

<style>
    #selected-items {
        scrollbar-color: transparent;
        scrollbar-width: thin;
    }
</style>
