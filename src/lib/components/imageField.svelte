<script lang="ts">
    import DefaultImage from '$lib/images/cover-placeholder.png';
    import { onMount } from 'svelte';

    interface Props {
        class?:string,
        name?:string,
        value:string|File,
    }
    
    let {
        class:propClass = "",
        name:propName = "image-input",
        value,
    } : Props = $props();

    let fileInput:HTMLInputElement;
    let selectedFile:FileList|null|undefined = $state();
    let imagePreview:string = $state(value.toString() || '');
    
    onMount(() => {
        fileInput.addEventListener("change", (e:any) => {
            const selectedImage = e.target.files[0];
            imagePreview = URL.createObjectURL(selectedImage);
            value = selectedImage;
        });
    })
    
    function openFileDialog() {
        fileInput.click();
    }

    function deleteImage() {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            imagePreview = '';
            fileInput.value = '';
        }
    }
</script>


<input bind:this={fileInput} type="file" name={propName} bind:files={selectedFile} class="hidden">

<div class="w-fit flex flex-col space-y-2 {propClass}">
    <img src={imagePreview || DefaultImage} alt="Selected Preview" id="image-preview" class="min-w-40 w-40 h-fit aspect-[5/7] object-contain rounded bg-foreground">
    <button type="button" onclick={openFileDialog} class="p-1 rounded text-sm font-bold bg-accent">Change Image</button>
    <button type="button" onclick={deleteImage} class="p-1 rounded text-sm font-bold bg-red-500">Delete Image</button>
</div>
