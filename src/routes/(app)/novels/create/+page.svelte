<script lang="ts">
    import type { Category } from '$lib/models/category';
    import type { ActionData, PageData } from './$types';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';

    import { toast } from 'svelte-sonner';

    import TiptapEditor from '$lib/components/tiptapEditor.svelte';
    import ImageField from '$lib/components/imageField.svelte';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    const categories:Category[] = data.categories;

    let formElement:HTMLFormElement;

    let titleValue:string = $state(form?.data.title || '');
    let selectedCategories:string[] = $state(form?.data.categories || []);
    let synopsisValue:string = $state(form?.data.synopsis || '');
    let coverValue:any = $state('');
    
    onMount(() => {
        enhance(formElement, ({ formData }) => {
            selectedCategories.forEach((category) => {
                formData.append('category[]', category);
            })
            formData.set('synopsis', synopsisValue);
        });
    });

    $effect(() => {
        if (form?.error) {
            titleValue = form.data.title;
            selectedCategories = form.data.categories;
            synopsisValue = form.data.synopsis;

            toast.error(form.message, {
                class: 'bg-red-500 border-none'
            });
        }
    });

    function onItemSelected(id:string) {
        if (selectedCategories.includes(id)) {
            const index = selectedCategories.indexOf(id);
            selectedCategories.splice(index, 1);
        }
        else {
            selectedCategories.push(id);
        }
    }
</script>

<div class="mb-4">
    <h1 class="text-3xl font-bold font-lexend">Create New Novel</h1>
    <div class="h-full py-4 flex flex-col justify-end border-b-[1px]">
        <h2 class="mb-1 text-lg font-bold font-lexend">Novel Guidelines:</h2>
        <h3 class="text-sm font-semibold font-lexend">General:</h3>
        <ul class="ml-4 mb-1.5 list-disc text-sm">
            <li>Make sure to follow the community guidelines</li>
            <li>Do not create duplicate entries (Search before creating)</li>
            <li>Synopsis are optional but it is recommended to have one</li>
        </ul>
        <h3 class="text-sm font-semibold font-lexend">Cover file requirements and limits:</h3>
        <ul class="ml-4 list-disc text-sm">
            <li>Portrait image is preffered</li>
            <li>Maximum image size is 5MB</li>
            <li>Supported image formats are JPEG & PNG</li>
        </ul>
    </div>
</div>

<form bind:this={formElement} action="?/create" method="post" enctype="multipart/form-data" class="flex flex-col items-end">
    <div class="w-full mb-4 flex flex-col space-x-0 space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
        <div class="w-fit flex flex-col">
            <label for="synopsis" class="mb-1 font-semibold">Cover</label>
            <ImageField name='cover' value={coverValue}/>
        </div>
        <div class="w-full flex flex-col space-y-4">
            <div class="flex flex-col">
                <label for="title" class="mb-1 font-semibold">Title</label>
                <input type="text" name="title" placeholder="Enter title" value={titleValue} class="border-none rounded-md bg-foreground-alt">
            </div>
        
            <div class="flex flex-col">
                <label for="title" class="mb-1 font-semibold">Categories</label>
                <div class="flex flex-wrap gap-2">
                    {#each categories as category}
                        <button 
                            type="button"
                            onclick={() => { onItemSelected(category.id) }}
                            class="px-2 py-1 text-sm font-bold rounded {selectedCategories.includes(category.id) ? 'bg-accent' : 'bg-foreground-alt'}"
                        >
                            {category.name}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="flex flex-col">
                <label for="synopsis" class="mb-1 font-semibold">Synopsis</label>
                <TiptapEditor bind:value={synopsisValue}/>
            </div>
        </div>
    </div>

    <button type="submit" class="w-fit p-2 rounded-md font-bold bg-accent">Save Changes</button>
</form>


