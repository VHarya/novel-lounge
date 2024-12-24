<script lang="ts">
    import DefaultImage from '$lib/images/cover-placeholder.png';

    interface Props {
        class?:string,
        value:string|File,
    }
    
    let { class:propClass = "", value = $bindable() } : Props = $props();

    let fileInput:HTMLInputElement;
    let selectedFile:FileList|null|undefined = $state();
    let imagePreview:string = $state(value.toString() || '');

    $effect(() => {
        if (selectedFile) {
            if (selectedFile[0]) {
                imagePreview = URL.createObjectURL(selectedFile[0]);
                value = selectedFile[0];
            }
        }
    });
    
    function openFileDialog() {
        fileInput.click();
    }

    function deleteImage() {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            imagePreview = '';
            selectedFile = null;
        }
    }
</script>


<input bind:this={fileInput} type="file" name="image-input" bind:files={selectedFile} hidden>

<div class="w-fit flex flex-col space-y-2 {propClass}">
    <img src={imagePreview || DefaultImage} alt="Selected Preview" id="image-preview" class="min-w-40 w-40 h-fit aspect-[5/7] object-contain rounded bg-foreground-alt">
    <button type="button" onclick={openFileDialog} class="p-1 rounded text-sm font-bold bg-accent">Change Image</button>
    <button type="button" onclick={deleteImage} class="p-1 rounded text-sm font-bold bg-red-500">Delete Image</button>
</div>
