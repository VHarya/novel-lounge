<script lang="ts">
	import Search from "phosphor-svelte/lib/MagnifyingGlass";
    import Logo from "$lib/images/icon.png";
	import DefaultProfile from "$lib/images/placeholder-profile.png"
    import { currentUser } from "$lib/utils/pocketbase";
    import type { PageData } from "./$types";
    import type { Snippet } from "svelte";

	let { data, children }: {data: PageData, children: Snippet} = $props();
</script>

<div class="w-full max-w-screen">
	<nav class="w-full px-8 py-4 border-b-2 border-accent sticky top-0 z-10 flex justify-between bg-background">
		<img src="{Logo}" alt="logo.png" class="h-[2.5rem]">
		<div class="flex items-center relative">
			<Search class="absolute right-[10px]" weight="bold" size={18} color="#ffffff" />
			<input type="search" placeholder="Search" name="searchbar" class="w-[26rem] pl-3.5 pr-8 py-1.5 rounded-md border-transparent font-medium text-white placeholder:text-white focus:placeholder:text-transparent bg-background-alt">
		</div>
		<div class="flex items-center">
			<a href="/novels">All Novels</a>

			{#if currentUser}
				<div class="relative">
					<button>
						<img src="{data.user?.profilePicture ?? DefaultProfile}" alt="User's Profile" class="w-[2.4rem]">
					</button>
				</div>
			{:else}
				<div class="flex">
					<a href="/register" class="px-6 py-2 align-middle rounded-xl text-sm font-bold">Daftar</a>
					<a href="/login" class="px-6 py-2 align-middle rounded-xl text-sm font-bold">Masuk</a>
				</div>
			{/if}
		</div>
	</nav>

	{@render children()}
</div>