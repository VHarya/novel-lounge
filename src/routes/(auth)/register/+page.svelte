<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import Logo from '$lib/images/icon.png';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<main class="h-screen flex flex-col items-center justify-center">
    <img src="{Logo}" alt="logo" class="w-[24rem] self-center mb-6">
    <div class="w-[34%] flex flex-col">
        <div class="flex">
            <a href="/login" class="w-full p-3 text-center font-bold bg-background-alt/30">Login</a>
            <a href="/register" class="w-full p-3 text-center font-bold bg-background-alt">Register</a>
        </div>
        <form method="post" action="?/register" class="p-6 bg-background-alt">
            <div class="mb-2">
                <label for="username" class="font-semibold">Username</label>
                <input type="text" name="username" value="{form?.data.username}" required class="w-full border-none rounded text-white bg-foreground-alt">
            </div>

            <div class="mb-2">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" name="email" value="{form?.data.email}" required class="w-full border-none rounded text-white bg-foreground-alt">
            </div>

            <div class="mb-4">
                <label for="password" class="font-semibold">Password</label>
                <input type="password" name="password" required class="w-full border-none rounded text-white bg-foreground-alt">
            </div>

            <div class="mb-2">
                <label for="confirm-password" class="font-semibold">Confirm Password</label>
                <input type="password" name="passwordConfirm" required class="w-full border-none rounded text-white bg-foreground-alt">
            </div>
            
            {#if form?.message}
                <span class="inline-block text-sm text-red-300">{ form?.message }</span>
            {/if}

            <input type="submit" value="Daftar Akun Baru" class="w-full mt-2 mb-4 p-2 rounded text-center font-bold cursor-pointer transition-colors bg-accent/90 hover:bg-accent">
            <a href="/" class="w-full p-2 inline-block rounded text-center font-bold cursor-pointer transition-colors hover:bg-foreground-alt">Back to home</a>
        </form>
    </div>
</main>
