<script lang="ts">
    import IconStar from 'phosphor-svelte/lib/Star';
    import IconClose from 'phosphor-svelte/lib/X';
    import { onMount } from 'svelte';

    let { show = $bindable(false), onSubmit }: { show: boolean, onSubmit: Function } = $props();
    let rating = $state();

    function closeModal() {
        show = false;
    }
</script>

{#if show}
    <div role="button" tabindex="-1" onkeydown={(e) => e.preventDefault()} onclick={closeModal} class="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center cursor-default bg-black/50">
        <div role="button" tabindex="-1" onkeydown={(e) => e.preventDefault()} onclick={(e) => e.stopPropagation()} class="w-fit h-fit p-4 flex flex-col rounded cursor-default bg-background-alt">
            <div class="mb-2 flex justify-between items-center">
                <span class="font-bold">Give your rating!</span>
                <!-- <button type="button" onclick={() => show = !show}><IconClose /></button> -->
            </div>
            <div class="mb-2 flex space-x-2">
                <button type="button" onclick={() => rating = 1} class:selected={rating == 1} class="w-10 aspect-square rounded border border-white/35 transition-colors hover:bg-white/10">1</button>
                <button type="button" onclick={() => rating = 2} class:selected={rating == 2} class="w-10 aspect-square rounded border border-white/35 transition-colors hover:bg-white/10">2</button>
                <button type="button" onclick={() => rating = 3} class:selected={rating == 3} class="w-10 aspect-square rounded border border-white/35 transition-colors hover:bg-white/10">3</button>
                <button type="button" onclick={() => rating = 4} class:selected={rating == 4} class="w-10 aspect-square rounded border border-white/35 transition-colors hover:bg-white/10">4</button>
                <button type="button" onclick={() => rating = 5} class:selected={rating == 5} class="w-10 aspect-square rounded border border-white/35 transition-colors hover:bg-white/10">5</button>
            </div>
            <div class="flex space-x-2">
                <button type="button" onclick={closeModal} class="w-full p-1 rounded transition-colors hover:bg-white/10">Cancel</button>
                <button type="button" onclick={() => onSubmit(rating)} class="w-full p-1 rounded transition-colors bg-accent/90 hover:bg-accent">Submit</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .selected {
        color: black;
        background-color: white;
    }
</style>
