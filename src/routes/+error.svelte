<script lang="ts">
    import { page } from '$app/stores';
    import IconError from 'phosphor-svelte/lib/WarningOctagon';
</script>

<div class="w-screen h-screen flex flex-col items-center justify-center">
    <h1 class="text-8xl font-bold font-lexend">{$page.status}</h1>
    <span class="text-2xl">{$page.error?.message}</span>
</div>