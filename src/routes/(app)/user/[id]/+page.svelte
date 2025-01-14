<script lang="ts">
    import type { PageData } from './$types';
    
    import IconEdit from 'phosphor-svelte/lib/PencilSimple';
    import IconCoins from 'phosphor-svelte/lib/Coins';
    import { formatToShortDate } from '$lib/utils';

    import DefaultAvatar from '$lib/images/default-profile.png';
    import DefaultCover from '$lib/images/cover-placeholder.png';

    let { data }: { data: PageData } = $props();
</script>


<div class="h-full flex space-x-8">
    <div class="h-full p-6 flex flex-col items-center rounded-md text-center bg-background-alt">
        <div class="mb-2 min-w-40 h-40 relative">
            <img src={data.user.avatar || DefaultAvatar} alt="User's Avatar" class="w-full h-full rounded-full object-cover object-center">
            {#if data.profileOwner}
                <a href="/user/edit/{data.user.id}" class="p-2 absolute right-1 bottom-1 rounded-full bg-accent">
                    <IconEdit size="1.25rem"/>
                </a>
            {/if}
        </div>
        <span class="text-2xl">{data.user.username}</span>
        <span class="text-sm font-light">Joined {formatToShortDate(data.user.created)}</span>
        {#if data.user.balance === data.balance?.id}
            <span class="mt-2 px-2.5 py-1 flex items-center rounded-full text-sm bg-accent"><IconCoins class="mr-1"/> {data.balance?.coins}</span>
        {/if}
    </div>
    <div class="w-full flex flex-col">
        <h1 class="mb-4 text-3xl">{data.user.username}'s Novels</h1>
        {#if data.novels.items.length > 0}
            <div class="grid 3xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
                {#each data.novels.items as novel}
                    <a href="/novels/{novel.id}" class="relative hover:scale-[101%]">
                        <img src={novel.cover || DefaultCover} alt="Novel Cover" class="h-full rounded object-contain bg-foreground-alt">
                        <span class="w-full p-4 absolute bottom-0 left-0 transition bg-gradient-to-t from-black/60 to-transparent">
                            {novel.title}
                        </span>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="w-full h-full flex flex-col justify-center items-center">
                <span class="text-2xl font-bold">No Novels Found</span>
                <p>Currently this user hasn't written any novels yet.</p>
            </div>
        {/if}
    </div>
</div>
