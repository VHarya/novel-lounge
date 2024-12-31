<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import Logo from '$lib/images/logo-text.png';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<main class="h-screen flex flex-col items-center justify-center">
    <a href="/">
        <img src="{Logo}" alt="logo" class="w-[20rem] self-center mb-6">
    </a>
    <div class="w-[34%] flex flex-col">
        <div class="flex">
            <a href="/login" class="w-full p-3 text-center font-bold rounded-t bg-background-alt">Login</a>
            <a href="/register" class="w-full p-3 text-center font-bold transition-colors bg-background-alt/25 hover:bg-background-alt/60">Register</a>
        </div>
        <form method="post" class="p-6 bg-background-alt">
            <div class="mb-2">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" name="email" value="{form?.data?.email}" required class="w-full border-none rounded text-white bg-foreground-alt">
            </div>

            <div class="mb-4">
                <label for="password" class="font-semibold">Password</label>
                <input type="password" name="password" required class="w-full border-none rounded text-white bg-foreground-alt">
            </div>

            {#if form?.message}
                <span class="mb-1 inline-block text-red-400">{form?.message}</span>
            {/if}

            <input type="submit" value="Masuk ke Akun" class="w-full mb-2 p-2 rounded text-center font-bold cursor-pointer transition-colors bg-accent/90 hover:bg-accent">
            <a href="/" class="w-full p-2 inline-block rounded text-center font-bold cursor-pointer transition-colors hover:bg-foreground-alt">Back to home</a>
        </form>
    </div>
</main>
