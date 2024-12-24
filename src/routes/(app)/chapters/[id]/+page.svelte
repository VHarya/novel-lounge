<script lang="ts">
    import { formatChapterTitle } from '$lib/utils';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const chapter = data.chapter;
    const chapterContent = data.chapterContent;
    
    let isPreviousAvailable:boolean = $state(true);
</script>

<h1 class="mb-4 text-xl font-bold">{formatChapterTitle(chapter.volumeNumber, chapter.chapterNumber, chapter.chapterTitle)}</h1>

<article class="mb-6 prose">{@html chapterContent.content}</article>

<div class="flex justify-center space-x-6">
    <a href="#" class="px-6 py-2 flex rounded-md font-bold bg-foreground-alt/90 hover:bg-foreground-alt">Last Chapter</a>
    <a href="#" class="px-6 py-2 flex rounded-md font-bold bg-accent/90 hover:bg-accent">Next Chapter</a>
</div>

