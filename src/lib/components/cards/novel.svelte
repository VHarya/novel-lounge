<script lang="ts">
    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import coverPlaceholder from '$lib/images/cover-placeholder.png';

    const { novel } = $props();
</script>

<div class="novel flex flex-col justify-end rounded">
    <a href="/novel/{novel.id}" class="h-[20rem] aspect-[5/7]">
        <img src="{coverPlaceholder}" alt="">
    </a>
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
