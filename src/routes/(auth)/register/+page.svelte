<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import Logo from '$lib/images/icon.png';
    import ModalSuccess from '$lib/components/modalSuccess.svelte';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

	let { data, form }: { data: PageData, form: ActionData } = $props();

    let timeout = 2000;
    if (browser && form?.success) {
        setTimeout(() => {
            goto('/login');
        }, timeout)
    }
</script>

<main class="h-screen flex flex-col items-center justify-center">
    {#if form?.success}
        <ModalSuccess timeout={timeout} title="Daftar Berhasil!" message="Pendaftaran berhasil, anda akan dipindahkan ke login!" />
    {/if}

    <img src="{Logo}" alt="logo" class="w-[24rem] self-center mb-6">
    <div class="w-[34%] flex flex-col">
        <div class="flex">
            <a href="/login" class="w-full p-3 text-center font-bold bg-background-alt/30">Login</a>
            <a href="/register" class="w-full p-3 text-center font-bold bg-background-alt">Register</a>
        </div>
        <form method="post" class="p-6 bg-background-alt">
            <div class="mb-2">
                <label for="username" class="font-semibold">Username</label>
                <input type="text" name="username" value="{form?.data?.username}" required class="w-full border-none rounded text-white bg-foreground">
            </div>

            <div class="flex space-x-4">
                <div class="mb-2">
                    <label for="firstName" class="font-semibold">Nama Depan</label>
                    <input type="text" name="firstName" value="{form?.data?.firstName}" required class="w-full border-none rounded text-white bg-foreground">
                </div>

                <div class="mb-2">
                    <label for="lastName" class="font-semibold">Nama Belakang</label>
                    <input type="text" name="lastName" value="{form?.data?.lastName}" required class="w-full border-none rounded text-white bg-foreground">
                </div>
            </div>

            <div class="mb-2">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" name="email" value="{form?.data?.email}" required class="w-full border-none rounded text-white bg-foreground">
            </div>

            <div class="mb-4">
                <label for="password" class="font-semibold">Kata Sandi</label>
                <input type="password" name="password" required class="w-full border-none rounded text-white bg-foreground">
            </div>

            <div class="mb-4">
                <label for="confirm-password" class="font-semibold">Ulangi Kata Sandi</label>
                <input type="password" name="confirmPassword" required class="w-full border-none rounded text-white bg-foreground">
            </div>
            
            {#if form?.message}
                <span class="text-sm text-red-300">{ form?.message }</span>
            {/if}

            <input type="submit" value="Daftar Akun Baru" class="w-full p-2 rounded text-center font-bold cursor-pointer bg-accent">
        </form>
    </div>
</main>
