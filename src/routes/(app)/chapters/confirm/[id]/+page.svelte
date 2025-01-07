<script lang="ts">
    import type { PageData } from './$types';
    import DefaultCover from '$lib/images/cover-placeholder.png';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';

    let { data }: { data: PageData } = $props();

    function onBackButtonClicked(e: MouseEvent) {
        goto(`/novels/${data.chapter.novel}`);
    }

    async function onBuyButtonClicked(e: MouseEvent) {
        const result = await fetch(`/api/buy-chapter`, {
            method: 'post',
            body: JSON.stringify({ chapter: data.chapter }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!result.ok) {
            const body = await result.json();
            toast.error(body.message);
        }

        if (result.ok) {
            console.log("Success")
            goto(`/chapters/${data.chapter.id}`);
        }
    }
</script>

<div class="h-full flex flex-col items-center">
    <img src={data.novelCover || DefaultCover} alt="Novel Cover" class="w-48 lg:w-60 mb-4 rounded object-contain aspect-[5/7] bg-foreground-alt">
    <div>
        <h1 class="mb-2 text-center text-2xl lg:text-4xl font-bold">Warning!</h1>
        <p class="mb-2 text-center lg:text-lg">
            {data.chapter.expand.novel.title}'s Chapter {data.chapter.chapter} is a paid chapter.<br>
            Do you want to continue?
        </p>
        <div class="flex space-x-4">
            <button type="button" onclick={onBackButtonClicked} class="w-full p-1.5 text-sm lg:text-base rounded border border-white hover:bg-white/10">Go Back</button>
            <button type="button" onclick={onBuyButtonClicked} class="w-full p-1.5 text-sm lg:text-base rounded bg-accent hover:bg-accent/80">Spend {data.chapter.price} Coins</button>
        </div>
    </div>
</div>
