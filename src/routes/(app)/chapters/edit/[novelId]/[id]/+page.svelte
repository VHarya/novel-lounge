<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import TiptapEditor from '$lib/components/tiptapEditor.svelte';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import { enhance } from '$app/forms';

    let { data, form }: { data: PageData, form: ActionData } = $props();

    let chapterValue:number = $state(data.latestChapter);
    let titleValue:string = $state(data.chapter.title);
    let contentValue:string = $state(data.chapter.content);
    let priceValue:boolean = $state(true);

    let formElement: HTMLFormElement;
    
    onMount(() => {
        enhance(formElement, ({ formData }) => {
            formData.set('content_id', data.chapter.contentId);
            formData.set('content', contentValue);
        });
    })

    $effect(() => {
        if (form?.error === true) {
            chapterValue = form.data.chapter;
            titleValue = form.data.title;
            contentValue = form.data.content;
            priceValue = form.data.priced;

            toast.error(form.message, {
                class: 'bg-red-500 border-none'
            });
        }
    });

    function preventNonNumericalInput(e: KeyboardEvent) {
        if (e.key === 'Backspace') {
            return;
        }

        if (!e.key.match(/^[0-9]+$/)) {
            e.preventDefault();
        }
    }
</script>


<div class="mb-4">
    <h1 class="text-3xl font-bold font-lexend">Edit Chapter</h1>
    <div class="h-full py-4 flex flex-col justify-end border-b-[1px]">
        <h2 class="mb-1 text-lg font-bold font-lexend">Chapter Guidelines:</h2>
        <h3 class="text-sm font-semibold font-lexend">General:</h3>
        <ul class="ml-4 mb-1.5 list-disc text-sm font-medium">
            <li>Make sure to follow the community guidelines</li>
            <li>Do not create duplicate entries</li>
            <li>By default chapters have a 10 Coins price, untick the checkbox to make it free</li>
        </ul>
    </div>
</div>

<form bind:this={formElement} action="?/edit" method="post">
    <div class="flex flex-col space-y-2">
        <div class="flex flex-col">
            <label for="chapter">Chapter (Current Latest: {data.latestChapter})</label>
            <input type="number" name="chapter" min="0" bind:value={chapterValue} onkeydown={preventNonNumericalInput} required class="flex-grow appearance-none rounded border-transparent text-sm bg-foreground">
        </div>
        <div class="flex-grow flex flex-col">
            <label for="title">Title (optional)</label>
            <input type="text" name="title" bind:value={titleValue} class="appearance-none rounded border-transparent text-sm bg-foreground">
        </div>
        <div>
            <span>Content</span>
            <TiptapEditor bind:value={contentValue}/>
        </div>
        <div class="m-0 flex items-center">
            <input type="checkbox" name="paid_chapter" bind:checked={priceValue} class="w-4 h-4 mr-1.5 border-none rounded">
            <label for="paid_chapter" class="!m-0 font-medium">Is a paid chapter</label>
        </div>
    </div>
    <button type="submit" class="w-full mt-5 p-2 rounded font-bold bg-accent">Save Data</button>
</form>

<style>
    label {
        margin-bottom: .25rem;
    }
</style>
