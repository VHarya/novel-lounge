<script lang="ts">
    import Check from "phosphor-svelte/lib/Check";
    import { fly } from "svelte/transition";

    let { title, message, className } = $props();

    let showing = $state(true);
</script>

<button onclick="{() => showing = false}" style:display={showing ? "flex" : "none"} class="lg:w-[24rem] w-[18rem] absolute flex items-center rounded overflow-hidden bg-background-alt {className}" transition:fly>
    <div class="w-fit h-fit m-2 p-2 rounded-full bg-green-300/25">
        <Check size="1em" weight="bold" />
    </div>
    <div class="w-full px-3 py-2 text-left text-white bg-foreground">
        <h4 class="font-bold">{title ?? "Title"}</h4>
        <p class="text-sm">{message ?? "Long message here..."}</p>
    </div>
</button>