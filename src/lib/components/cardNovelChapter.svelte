<script lang="ts">
    import type { Novel } from '$lib/models/novel';
    import type { User } from '$lib/models/user';

    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import IconCoins from 'phosphor-svelte/lib/Coins';

    import PlaceholderImage from '$lib/images/cover-placeholder.png';
    import { formatChapterTitle, formatToTimeAgo } from '$lib/utils';
    
    const { novel, currentUser }: { novel: any, currentUser?: User } = $props();
</script>

<div class="max-h-64 w-full p-4 flex rounded bg-background-alt">
    <a href="/novels/{novel.id}" class="h-24 md:h-36 aspect-[5/7] inline-block">
        <img src="{novel.cover || PlaceholderImage}" alt="placeholder_image.png" class="h-full aspect-[5/7] object-contain rounded bg-foreground-alt">
    </a>
    <div class="w-full ml-4 flex flex-col overflow-hidden justify-between">
        <div class="w-full flex flex-col">
            <a href="/novels/{novel.id}">
                <h3 class="h-fit flex-grow truncate text-xl font-bold">{novel.title}</h3>
            </a>
            <a href="/" class="w-full mb-2 flex items-center">
                <IconPerson size={16} />
                <span class="ml-1 text-sm truncate">{novel.expand.author.username}</span>
            </a>
            <ul class="flex flex-col">
                {#each novel.chapters as chapter}
                    <li class="w-full h-fit mb-2 flex items-center">
                        <div class="w-full min-w-[1rem] flex flex-col grow">
                            <a href="/chapters/{chapter.id}" class="inline-block truncate text-sm font-bold">
                                {formatChapterTitle(chapter.chapter, chapter.title)}
                            </a>
                            <span class="text-xs">{formatToTimeAgo(chapter.created)}</span>
                        </div>
                        {#if chapter.price > 0 && !chapter.isOwned && novel.author !== currentUser?.id}
                            <div class="w-14 h-fit ml-2 px-2 py-1 flex justify-center items-center rounded bg-accent">
                                <IconCoins size={12} />
                                <span class="ml-1 text-sm">{chapter.price}</span>
                            </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>