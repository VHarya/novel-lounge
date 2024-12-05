<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import Logo from '$lib/images/icon.png';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import ModalSuccess from '$lib/components/modalSuccess.svelte';
    import { fade, fly } from 'svelte/transition';

	let { data, form }: { data: PageData, form: ActionData } = $props();

    let timeout = 2000;
    if (browser && form?.success) {
        setTimeout(() => {
            goto('/');
        }, timeout)
    }
</script>

<main class="h-screen flex flex-col items-center justify-center">
    {#if form?.success}
        <div class="w-fit h-fit absolute top-10">
            <ModalSuccess timeout={timeout} title="Login Berhasil!" message="Selamat datang kembali, anda akan dipindahkan ke beranda!"/>
        </div>
    {/if}

    <img src="{Logo}" alt="logo" class="w-[20rem] self-center mb-6">
    <div class="w-[34%] flex flex-col">
        <div class="flex">
            <a href="/login" class="w-full p-3 text-center font-bold rounded-t bg-background-alt">Login</a>
            <a href="/register" class="w-full p-3 text-center font-bold bg-background-alt/30">Register</a>
        </div>
        <form method="post" class="p-6 bg-background-alt">
            <div class="mb-2">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" name="email" value="{form?.data?.email}" required class="w-full border-none rounded text-white bg-foreground">
            </div>

            <div class="mb-4">
                <label for="password" class="font-semibold">Password</label>
                <input type="password" name="password" required class="w-full border-none rounded text-white bg-foreground">
            </div>

            {#if form?.message}
                <span class="mb-1 inline-block text-red-400">{form?.message}</span>
            {/if}

            <input type="submit" value="Masuk ke Akun" class="w-full p-2 rounded text-center font-bold cursor-pointer bg-accent">
        </form>
    </div>
</main>
