<script lang="ts">
    import type { PageData } from './$types';
    import BackgroundImage from '$lib/images/landing-bg.png';
    
    let { data }: { data: PageData } = $props();
</script>


<img src={BackgroundImage} alt="Background" class="sm:h-[32rem] md:h-[38rem] xl:h-[42rem] 3xl:h-[56rem] absolute -z-50 top-0 md:-top-48 md:-right-28 md:-rotate-[20deg] opacity-30">
<main class="mx-60 space-y-20">
    <div class="w-full py-60 h-screen flex flex-col justify-center">
        <h2 class="w-[34rem] mb-6 text-3xl font-lexend font-bold">Daftar dan mulai membaca novel dengan 5 Koin gratis</h2>
        <a href="#" class="w-fit px-8 py-2 rounded-full font-bold bg-accent text-primary">Buat Akun Baru</a>
    </div>
    
    <div class="w-full h-screen flex flex-col justify-center space-y-10 text-center">
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
    
    
    <div class="h-screen flex flex-col justify-center space-y-10 text-center">
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
    
    <div class="h-screen flex flex-col justify-center items-center text-center">
        <h2 class="mb-4 text-6xl font-bold font-lexend">Siap Memulai?</h2>
        <span class="mb-6 text-2xl font-bold">Masuki dunia novel yang tak terbatas!</span>
        <a href="#" class="w-fit px-8 py-2 rounded-full font-bold bg-accent text-primary">Buat Akun Baru</a>
    </div>
</main>


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