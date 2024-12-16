<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import IconSearch from "phosphor-svelte/lib/MagnifyingGlass";
    import Logo from "$lib/images/icon.png";
	import DefaultProfile from "$lib/images/placeholder-profile.png"
    import type { PageData } from "./$types";
    import type { Snippet } from "svelte";
    import { browser } from '$app/environment';

	let { data, children }: {data: PageData, children: Snippet} = $props();
	let showMenu = $state(false);

	// ClickOutside
	let parentNode: HTMLElement;
	function closeModal() {
		showMenu = false;
	}

	async function logout() {
		const res = await fetch('/logout', { method: 'POST' });
		if (browser && res.ok) {
			location.reload();
		}
	}
</script>

<div class="w-full max-w-screen">
	{#if showMenu}
		<div bind:this={parentNode} class="w-screen h-screen z-50 absolute bg-black/35"></div>
		<div use:clickoutside={{ limit: { parent: parentNode } }} onclickoutside={closeModal} class="w-[12rem] p-4 absolute top-16 right-[20rem] z-50 flex flex-col rounded shadow bg-foreground">
			<a href="/user/{data.user.id}" class="flex flex-col items-center">
				<img src="{data.user.avatar ?? DefaultProfile}" alt="User's Profile" class="w-20 h-20 mb-2 object-cover rounded-full">
				<span class="text-xl font-bold">{data.user?.username}</span>
			</a>
			
			<hr class="my-3">

			<a href="/user/{data.user.id}" onclick={closeModal} class="py-0.5 text-left transition-all hover:font-medium">My Bookmarks</a>
			<a href="/user/{data.user.id}" onclick={closeModal} class="py-0.5 text-left transition-all hover:font-medium">My Profile</a>

			<hr class="my-3">

			<a href="/author-dashboard" onclick={closeModal} class="py-0.5 text-left transition-all hover:font-medium">Author Dashboard</a>
			<a href="/coin-store" onclick={closeModal} class="py-0.5 text-left transition-all hover:font-medium">Coin Store</a>
			<a href="/help" onclick={closeModal} class="py-0.5 text-left transition-all hover:font-medium">Help</a>

			<hr class="my-3">
			
			<button onclick={logout} class="py-0.5 text-left transition-colors text-red-400 hover:text-red-500 hover:font-medium">
				<span>Sign Out</span>
			</button>
		</div>
	{/if}

	<nav class="w-full px-[24rem] py-4 border-b-2 border-accent sticky top-0 z-10 flex justify-between bg-background">
		<a href="/">
			<img src="{Logo}" alt="logo.png" class="h-[2.5rem]">
		</a>
		<div class="flex space-x-2">
			<div class="flex items-center relative">
				<IconSearch class="absolute right-[10px]" weight="bold" size={18} color="#ffffff" />
				<input type="search" placeholder="Search" name="searchbar" class="w-[20rem] pl-3.5 pr-8 py-1.5 rounded-md border-transparent font-medium text-white placeholder:text-white focus:placeholder:text-transparent bg-foreground-alt">
			</div>
			<div class="flex items-center">
				{#if data.user}
					<button onclick="{() => showMenu = !showMenu}" class="rounded-full overflow-clip">
						<img src="{data.user.avatar ?? DefaultProfile}" alt="User's Profile" class="w-10 h-10 object-cover rounded-full">
					</button>
				{:else}
					<div class="flex space-x-2">
						<a href="/register" class="px-4 py-2 align-middle rounded text-sm font-bold transition-colors hover:bg-background-alt">Register</a>
						<a href="/login" class="px-4 py-2 align-middle rounded text-sm font-bold transition-colors bg-accent/90 hover:bg-accent">Sign-in</a>
					</div>
				{/if}
			</div>
		</div>
	</nav>

	<main class="max-w-screen mx-[24rem] my-8">
		{@render children()}
	</main>
</div>