<script lang="ts">
    import type { PageData } from './$types';
    
    let { data }: { data: PageData } = $props();
</script>



<svelte:head>
    <title>Novel Lounge</title>
</svelte:head>

<nav class="w-full px-28 py-4 flex justify-between items-center absolute top-0">
    <h1 class="font-joan text-4xl">Novel Lounge</h1>
    <div class="flex">
        <a href="#" class="px-4 py-1">Home</a>
        <a href="#" class="px-4 py-1">Novel List</a>
        <a href="#" class="px-4 py-1">Support</a>
        <div class="mx-4 border-l"></div>
        <a href="#" class="px-4 py-1 font-bold">Daftar</a>
        <a href="#" class="px-4 py-1 font-bold">Login</a>
    </div>
</nav>

<div class="landing-bg w-screen px-28 py-96 relative overflow-hidden">
    <h2 class="w-[34rem] mb-6 text-3xl font-lexend font-bold">Daftar dan mulai membaca novel dengan 5 Koin gratis</h2>
    <a href="#" class="px-8 py-2 rounded-full font-bold bg-accent text-primary">Buat Akun Baru</a>
</div>

<div class="px-28 py-60 flex flex-col justify-center space-y-10 text-center">
    <h2 class="text-5xl font-bold font-lexend">Kenapa Novel Lounge?</h2>
    <div class="flex justify-center space-x-8">
        <div class="w-80 min-h-60 p-6 flex flex-col justify-center rounded-2xl bg-foreground">
            <h3 class="mb-2 text-2xl font-bold font-lexend">Temukan Cerita Menarik</h3>
            <span>Nikmati novel-novel unik dibuat oleh penulis berbakat dengan chapter baru di upload secara reguler</span>
        </div>
        <div class="w-80 min-h-60 p-6 flex flex-col justify-center rounded-2xl bg-foreground">
            <h3 class="mb-2 text-2xl font-bold font-lexend">Dukung Penulis Favorit Anda</h3>
            <span>Gunakan Coin untuk membaca chapter baru dan mendukung penulis secara langsung</span>
        </div>
        <div class="w-80 min-h-60 p-6 flex flex-col justify-center rounded-2xl bg-foreground">
            <h3 class="mb-2 text-2xl font-bold font-lexend">Pembacaan Novel Fleksible</h3>
            <span>Gunakan Coin hanya pada chapter yang anda inginkan, memudahkan pembacaan novel sesuai keinginan</span>
        </div>
    </div>
</div>


<div class="px-28 py-60 flex flex-col justify-center space-y-10 text-center">
    <h2 class="text-5xl font-bold font-lexend">Dukung Penulis Favorit Anda</h2>
    <div class="flex justify-center space-x-10">
        <div class="p-10 flex flex-col justify-center rounded-2xl bg-foreground">
            <h3 class="mb-1 text-4xl font-bold font-lexend">10 Koin</h3>
            <span class="mb-6 text-xl">Rp 10.000,-</span>
            <a href="#" class="px-8 py-1.5 rounded-full font-bold bg-accent text-primary">Pilih</a>
        </div>
        <div class="p-10 flex flex-col justify-center rounded-2xl bg-foreground">
            <h3 class="mb-1 text-4xl font-bold font-lexend">30 Koin</h3>
            <span class="mb-6 text-xl">Rp 25.000,-</span>
            <a href="#" class="px-8 py-1.5 rounded-full font-bold bg-accent text-primary">Pilih</a>
        </div>
        <div class="p-10 flex flex-col justify-center rounded-2xl bg-foreground">
            <h3 class="mb-1 text-4xl font-bold font-lexend">50 Koin</h3>
            <span class="mb-6 text-xl">Rp 40.000,-</span>
            <a href="#" class="px-8 py-1.5 rounded-full font-bold bg-accent text-primary">Pilih</a>
        </div>
    </div>
</div>

<div class="px-28 py-60 flex flex-col justify-center items-center text-center">
    <h2 class="mb-4 text-6xl font-bold font-lexend">Siap Memulai?</h2>
    <span class="mb-6 text-2xl font-bold">Masuki dunia novel yang tak terbatas!</span>
    <a href="#" class="w-fit px-8 py-2 rounded-full font-bold bg-accent text-primary">Buat Akun Baru</a>
</div>

<footer class="px-28 py-10">
    <h2 class="mb-4 text-3xl font-joan">Novel Lounge</h2>
    <p>
        © 2024 Novel Lounge. Semua hak dilindungi. <br>
        Dilarang memperbanyak atau mendistribusikan isi situs ini tanpa izin tertulis. <br>
        Kebijakan Privasi | Syarat dan Ketentuan
    </p>
</footer>



<style>
    .landing-bg::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 200%;
        top: -45%;
        right: -64%;
        z-index: -1;
        background-image: url($lib/images/landing-bg.png);
        background-repeat: no-repeat;
        transform: rotate(-20deg);
        opacity: 60%;
    }
</style>