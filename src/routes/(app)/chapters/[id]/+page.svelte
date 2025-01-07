<script lang="ts">
    import type { PageData } from './$types';
    import IconBackArrow from 'phosphor-svelte/lib/ArrowLeft';
    import { formatChapterTitle } from '$lib/utils';

    let { data }: { data: PageData } = $props();
</script>


<svelte:head>
    <title>Ch. {data.chapter.chapter} | {data.novel.title}</title>
</svelte:head>

<div class="flex flex-col">
    <a href="/novels/{data.novel.id}" class="mb-2 flex items-center">
        <IconBackArrow weight="bold" class="w-5 h-5 mr-2"/>
        <h1 class="text-2xl font-bold">{data.novel.title}</h1>
    </a>
    <h2 class="mb-2 text-lg font-medium">{formatChapterTitle(data.chapter.chapter, data.chapter.title)}</h2>
    <article class="min-h-[50vh] mb-6 prose prose-p:mb-2">{@html data.chapterContent.content}</article>
</div>

<div class="flex justify-end space-x-4">
    <a href="/chapters/{data.previousChapter ? data.previousChapter.id : data.chapter.id}" class:disabled={data.previousChapter == null} class="w-40 px-3 py-1.5 flex justify-center text-center rounded-md bg-foreground/80 hover:bg-foreground">Previous Chapter</a>
    <a href="/chapters/{data.nextChapter ? data.nextChapter.id : data.chapter.id}" class:disabled={data.nextChapter == null} class="w-40 px-3 py-1.5 flex justify-center text-center rounded-md bg-accent/80 hover:bg-accent">Next Chapter</a>
</div>

<style>
    .disabled {
        opacity: 50%;
        cursor: default;
        pointer-events: none;
    }
</style>
