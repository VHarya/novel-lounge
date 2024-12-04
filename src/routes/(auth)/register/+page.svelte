<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import Logo from '$lib/images/icon.png';
    import ModalSuccess from '$lib/components/modalSuccess.svelte';
    import { fly } from 'svelte/transition';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<main class="h-screen flex flex-col items-center justify-center">
    <img src="{Logo}" alt="logo" class="w-[24rem] self-center mb-6">
    <div class="w-[34%] flex flex-col">
        <div class="flex">
            <a href="/login" class="w-full p-3 text-center font-bold bg-background-alt/30">Login</a>
            <a href="/register" class="w-full p-3 text-center font-bold bg-background-alt">Register</a>
        </div>
        <form method="post" class="p-6 bg-background-alt">
            <div class="mb-2">
                <label for="username" class="font-semibold">Username</label>
                <input type="text" name="username" value="{form?.username}" class="w-full border-none rounded text-white bg-foreground">
            </div>
            <div class="flex space-x-4">
                <div class="mb-2">
                    <label for="firstName" class="font-semibold">Nama Depan</label>
                    <input type="text" name="firstName" value="{form?.firstName}" class="w-full border-none rounded text-white bg-foreground">
                </div>
                <div class="mb-2">
                    <label for="lastName" class="font-semibold">Nama Belakang</label>
                    <input type="text" name="lastName" value="{form?.lastName}" class="w-full border-none rounded text-white bg-foreground">
                </div>
            </div>
            <div class="mb-2">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" name="email" value="{form?.email}" class="w-full border-none rounded text-white bg-foreground">
            </div>
            <div class="mb-4">
                <label for="password" class="font-semibold">Kata Sandi</label>
                <input type="password" name="password" class="w-full border-none rounded text-white bg-foreground">
            </div>
            <div class="mb-4">
                <label for="confirm-password" class="font-semibold">Ulangi Kata Sandi</label>
                <input type="password" name="confirmPassword" class="w-full border-none rounded text-white bg-foreground">
            </div>
            
            {#if form?.errors}
                <div class="mb-4 flex flex-col italic">
                    <span class="font-bold text-red-300">Errors</span>
                    {#if form?.errors.missingFields}
                        <span class="text-sm text-red-300">- Form belum lengkap, harap isi semua field yang ada!</span>
                    {/if}
                    {#if form?.errors.passwordTooShort}
                        <span class="text-sm text-red-300">- Kata sandi minimal 8 karakter!</span>
                    {/if}
                    {#if form?.errors.confirmPasswordWrong}
                        <span class="text-sm text-red-300">- Kata sandi yang dimasukkan tidak sama, ulangi pengisian password!</span>
                    {/if}
                </div>
            {/if}

            <input type="submit" value="Daftar Akun Baru" class="w-full p-2 rounded text-center font-bold bg-accent">
        </form>
    </div>

    {#if form?.success}
        <ModalSuccess title="Daftar Berhasil!" message="Pendaftaran anda telah berhasil, silahkan coba login!" className="top-4 shadow-lg" />
    {/if}
</main>
