<script lang="ts">
	import { fly, fade } from 'svelte/transition';

    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import coverPlaceholder from '$lib/images/cover-placeholder.png';

    const { novel } = $props();

    let showDescription = $state(false);
</script>

<div class="h-fit flex flex-col justify-end">
    <div class="h-[18rem] aspect-[5/7] relative" onpointerover="{() => {showDescription = true;}}" onpointerleave="{() => {showDescription = false;}}">
        <img src="{novel.cover || coverPlaceholder}" alt="Novel Cover" draggable="false" ondragstart="{() => null}" class="h-full aspect-[5/7] absolute top-0 rounded">
        {#if showDescription}
            <div transition:fade={{ duration: 300 }} class="w-full h-full p-4 absolute top-0 flex flex-col space-y-2 bg-background/80">
                <div transition:fly={{ y: 10, duration: 250 }} class="h-full overflow-y-scroll select-none text-sm">{@html novel.synopsis}</div>
                <a href="/novel/{novel.id}" transition:fly={{ y: 10, duration: 250 }} class="px-2 py-1 rounded font-bold bg-accent">Read More</a>
            </div>
        {/if}
    </div>
    <div class="py-2">
        <a href="/novel/{novel.id}">
            <h3 class="text-lg font-bold">{novel.title}</h3>
        </a>
        <a href="/user/{novel.expand.author.id}" class="flex items-center">
            <IconPerson size={18} />
            <span class="ml-1 text-sm">{novel.expand.author.username}</span>
        </a>
    </div>
</div>
