<script lang="ts">
    import { preventDefault, stopPropagation } from "$lib/utils";

    let {
        show = $bindable(),
        coins,
        onConfirm,
    } : {
        show: boolean,
        coins: number,
        onConfirm: Function,
    } = $props();

    function closeModal() {
        show = false;
    }
</script>

{#if show}
    <div role="button" tabindex="-1" onkeydown={preventDefault} onclick={closeModal} class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50">
        <div role="button" tabindex="-1" onkeydown={preventDefault} onclick={stopPropagation} class="p-4 flex flex-col rounded bg-background-alt">
            <h1 class="text-center text-2xl font-bold">Hold on!</h1>
            <p class="mb-4 text-center">The next chapter needs {coins} coins to open.<br>Would you like to continue?</p>
            <div class="flex flex-col lg:flex-row space-x-4">
                <button type="button" onclick={closeModal} class="w-full p-1 border rounded border-white">Cancel</button>
                <button type="button" onclick={() => onConfirm()} class="w-full p-1 rounded bg-accent">Spend {coins} Coins</button>
            </div>
        </div>
    </div>
{/if}
