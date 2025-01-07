<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    import Logo from '$lib/images/logo-text.png'

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>


<svelte:head>
    <title>Novel Lounge</title>
</svelte:head>


<nav class="w-screen px-60 py-4 flex justify-between items-center overflow-hidden">
    <a href="/">
        <img src={Logo} alt="Novel Lounge's Logo" class="h-12">
    </a>
    <div class="flex">
        <a href="/" class="px-4 py-1">Home</a>
        <a href="/novel" class="px-4 py-1">Novel List</a>
        <a href="/" class="px-4 py-1">Support</a>
        <div class="mx-4 border-l"></div>
        <a href="/login" class="px-4 py-1 font-bold">Daftar</a>
        <a href="/register" class="px-4 py-1 font-bold">Login</a>
    </div>
</nav>

{@render children()}

<footer class="px-60 py-10">
    <h2 class="mb-4 text-3xl font-joan">Novel Lounge</h2>
    <p>
        © 2024 Novel Lounge. Semua hak dilindungi. <br>
        Dilarang memperbanyak atau mendistribusikan isi situs ini tanpa izin tertulis. <br>
        Kebijakan Privasi | Syarat dan Ketentuan
    </p>
</footer>
