<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import IconWarning from "phosphor-svelte/lib/WarningOctagon";

    interface props {
        title?:string,
        message?:string,
        timeout?:number|null,
    }

    let { title = '', message = 'An error occured!', timeout } : props = $props();

    let showing = $state(false);
    let progressWidth: number = $state(100);

    function shrinkHr() {
        const duration = timeout ?? 3000;
        const steps = 100;
        const intervalTime = duration / steps;

        const interval = setInterval(() => {
            progressWidth -= 1;

            if (progressWidth <= 0) {
                clearInterval(interval);
                showing = false;
            }
        }, intervalTime);
    }

    onMount(() => {
        shrinkHr()
    })
</script>

{#if showing}
<button onclick={() => showing = false} style:display={showing ? "flex" : "none"} class="lg:w-[24rem] w-[18rem] h-14 absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-start rounded overflow-hidden shadow bg-background-alt" transition:fly>
    <div class="w-full relative flex items-center">
        <div class="w-fit h-fit m-2 p-2 rounded-full bg-red-600">
            <IconWarning size="1.5em" weight="bold" />
        </div>
        <div class="w-full h-full px-3 py-2 text-left text-white bg-foreground-alt">
            {#if title.length > 0}
                <h4 class="font-bold">{title}</h4>
            {/if}
            <p class="text-sm">{message ?? "Long message here..."}</p>
        </div>
        <hr style="width: {progressWidth}%; transition-duration: 500ms;" class="absolute bottom-0 border-[1px] transition-all duration-[2000ms] ease-out border-accent">
    </div>
</button>
{/if}
