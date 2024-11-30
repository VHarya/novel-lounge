<script lang="ts">
    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import IconBookmark from 'phosphor-svelte/lib/BookmarkSimple';
    import IconComment from 'phosphor-svelte/lib/Chat';
    import IconFlag from 'phosphor-svelte/lib/Flag';
    import IconCoins from 'phosphor-svelte/lib/Coins';

    import PlaceholderImage from '$lib/images/cover-placeholder.png';
    import { formatToTimeAgo } from '$lib/utils/relative-time-formatter';
    
    const { novel } = $props();

    function formatChapterTitle(volume:number, chapter:number, title:string) {
        const volumeNumber = volume != 0 ? `Vol. ${volume}` : '';
        const chapterNumber = chapter != 0 ? `Ch. ${chapter}` : '';
        const separator = volumeNumber || chapterNumber ? ' - ' : '';

        return volumeNumber + ' ' + chapterNumber + separator + title;
    }
</script>

<div class="h-64 w-full p-4 flex rounded bg-background-alt">
    <a href="/novel/{novel.id}" class="h-full aspect-[5/7] rounded">
        <img src="{PlaceholderImage}" alt="placeholder_image.png" class="rounded">
    </a>
    <div class="w-full ml-4 flex flex-col justify-between">
        <a href="/novel/{novel.id}">
            <h3 class="h-fit w-full truncate text-xl font-bold">{novel.title}</h3>
        </a>
        <a href="/" class="w-full mb-2 flex items-center">
            <IconPerson size={18} />
            <span class="ml-1 truncate">{novel.expand.author.username}</span>
        </a>
        {#each novel.chapters as chapter}
            <div class="w-full min-w-[4rem] h-fit mb-2 px-3 py-2 flex items-center rounded bg-foreground">
                <div class="w-full min-w-[1rem] flex flex-col grow">
                    <a href="/chapter/{chapter.id}" class="truncate text-sm font-bold">
                        {formatChapterTitle(chapter.volumeNumber, chapter.chapterNumber, chapter.chapterTitle)}
                    </a>
                    <span class="text-xs">{formatToTimeAgo(chapter.created)}</span>
                </div>
                <div class="h-fit ml-2 px-2 py-0.5 flex items-center rounded bg-accent">
                    <IconCoins size={14} />
                    <span class="ml-1 text-sm">{chapter.price}</span>
                </div>
            </div>
        {/each}
        <div class="flex space-x-2">
            <a href="#" class="p-2 flex grow items-center rounded bg-foreground">
                <IconComment size={20} />
                <span class="ml-2">Komentar</span>
            </a>
            <a href="#" class="p-2 aspect-square flex items-center justify-center rounded bg-foreground">
                <IconBookmark size={20} />
            </a>
            <a href="#" class="p-2 aspect-square flex items-center justify-center rounded bg-foreground">
                <IconFlag size={20} />
            </a>
        </div>
    </div>
</div>