<script lang="ts">
	import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import coverPlaceholder from '$lib/images/cover-placeholder.png';

    const { novel } = $props();

    function dragStart(e:DragEvent) {
        e.preventDefault();
    }
</script>

<div class="h-fit flex flex-col justify-end">
    <a href="/novels/{novel.id}" draggable="false" ondragstart={dragStart} class="h-[18.5rem] aspect-[5/7] relative select-none">
        <img src="{novel.cover || coverPlaceholder}" alt="Novel Cover" id="{novel.id}" draggable="false" ondragstart={dragStart} class="novel-cover-img h-full aspect-[5/7] absolute top-0 rounded object-contain pointer-events-none bg-foreground-alt">
    </a>
    <div class="py-2">
        <a href="/novels/{novel.id}">
            <h3 class="text-lg font-bold">{novel.title}</h3>
        </a>
        <a href="/user/{novel.expand.author.id}" class="flex items-center">
            <IconPerson size={18} />
            <span class="ml-1 text-sm">{novel.expand.author.username}</span>
        </a>
    </div>
</div>
