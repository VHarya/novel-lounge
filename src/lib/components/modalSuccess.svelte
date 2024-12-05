<script lang="ts">
    import Check from "phosphor-svelte/lib/Check";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    interface props {
        title:string,
        message:string,
        timeout?:number|null,
        onclick?:Function|null,
    }

    let { title, message, timeout, onclick } : props = $props();

    let showing = $state(true);

    let progressWidth: number = $state(100);

    function onClick() {
        if (onclick) {
            onclick();
        }
        showing = false;
    }

    function shrinkHr() {
        const duration = timeout ?? 2000;
        const steps = 100;
        const intervalTime = duration / steps;

        const interval = setInterval(() => {
            progressWidth -= 1;

            if (progressWidth <= 0) {
                clearInterval(interval);
            }
        }, intervalTime);
    }

    onMount(() => {
        shrinkHr()
    })
</script>

<button onclick={onClick} style:display={showing ? "flex" : "none"} class="lg:w-[24rem] w-[18rem] z-50 flex flex-col items-start rounded overflow-hidden bg-background-alt" transition:fly>
    <div class="flex items-center">
        <div class="w-fit h-fit m-2 p-2 rounded-full bg-green-300/25">
            <Check size="1em" weight="bold" />
        </div>
        <div class="w-full px-3 py-2 text-left text-white bg-foreground">
            <h4 class="font-bold">{title ?? "Title"}</h4>
            <p class="text-sm">{message ?? "Long message here..."}</p>
        </div>
    </div>
    <hr style="width: {progressWidth}%; transition-duration: {timeout}ms" class="border-2 transition-all duration-[2000ms] ease-out border-accent">
</button>

<style>
    .showing {
        display: flex;
    }

    .timer::before {
        width: 100%;
    }
    .timer {
        width: 0%;
        transition: width 3s;
    }
</style>