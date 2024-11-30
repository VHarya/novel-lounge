<script lang="ts">
    import { slide } from "svelte/transition";
    import { linear } from "svelte/easing";

    import House from "phosphor-svelte/lib/House";
    import Bookmark from "phosphor-svelte/lib/BookmarkSimple";
    import Megaphone from "phosphor-svelte/lib/Megaphone";
    import Question from "phosphor-svelte/lib/Question";
    import Close from "phosphor-svelte/lib/X";

    import Logo from "$lib/images/icon.png";

    const {
        show = $bindable(),
        onCloseButtonPressed,
    } = $props();
</script>

{#if show}
    <div class="w-fit h-screen top-0 sticky flex flex-col bg-background-alt" transition:slide={{axis: 'x', duration: 100, easing: linear}}>
        <div class=" mx-4 mt-4 flex justify-between items-center">
            <a href="/" class="w-[10rem]">
                <!-- <h1 class="w-full text-nowrap text-2xl leading-tight font-joan">Novel Lounge</h1> -->
                <img src="{Logo}" alt="icon.png" id="logo-image">
            </a>
            <button onclick="{onCloseButtonPressed}" class="ml-2 p-1">
                <Close size={18}/>
            </button>
        </div>
        <div class="px-4 pt-4 space-y-1 flex flex-col">
            <div class="flex flex-col">
                <a href="#" class="p-1.5 rounded flex items-center bg-accent">
                    <House weight="bold" size="1.2rem"/>
                    <span class="ml-2 text-sm font-semibold">Beranda</span>
                </a>
                <a href="#" class="p-1.5 rounded flex items-center">
                    <Bookmark weight="bold" size="1.2rem"/>
                    <span class="ml-2 text-sm font-semibold">Bookmark</span>
                </a>
            </div>
            <div class="border-b-[1px] border-foreground"></div>
            <div class="flex flex-col">
                <a href="#" class="p-1.5 rounded flex items-center">
                    <House weight="bold" size="1.2rem"/>
                    <span class="ml-2 text-sm font-semibold">Pengumuman</span>
                </a>
                <a href="#" class="p-1.5 rounded flex items-center">
                    <Megaphone weight="bold" size="1.2rem"/>
                    <span class="ml-2 text-sm font-semibold">Tentang Kami</span>
                </a>
                <a href="#" class="p-1.5 rounded flex items-center">
                    <Question weight="bold" size="1.2rem"/>
                    <span class="ml-2 text-sm font-semibold">Bantuan</span>
                </a>
            </div>
        </div>
        <div class="flex-grow"></div>
        <div class="px-6 pb-6 flex flex-col">
            <div class="mb-2 border-t-[1px] border-foreground"></div>
            <span class="text-xs text-center">V 1.0.0</span>
            <span class="text-xs text-center">© Novel Lounge 2024</span>
        </div>
    </div>
{/if}

<style>
    #logo-image {
        width: 12rem;
    }
</style>