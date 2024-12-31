<script lang="ts">
    import type { PageData } from "./$types";
    import type { Snippet } from "svelte";
	import { clickoutside } from '@svelte-put/clickoutside';
    import { browser } from '$app/environment';
	import { Toaster } from 'svelte-sonner';

	import IconSearch from "phosphor-svelte/lib/MagnifyingGlass";
	import IconCoins from "phosphor-svelte/lib/Coins";
    import Logo from "$lib/images/logo-no-text.png";
	import DefaultProfile from "$lib/images/default-profile.png"

	let { data, children }: {data: PageData, children: Snippet} = $props();
	const user = data.user;
	let showMenu = $state(false);
	let showSearch = $state(false);

	function openMenu() {
		showMenu = true;
		document.body.classList.add('overflow-hidden');
	}

	let menuParentNode: any = $state();
	function closeMenu() {
		showMenu = false;
		document.body.classList.remove('overflow-hidden');
	}

	// ClickOutside Search
	let searchParentNode: any = $state();
	function closeSearch() {
		showSearch = false;
	}

	async function logout() {
		const res = await fetch('/logout', { method: 'POST' });
		if (browser && res.ok) {
			location.reload();
		}
	}
</script>


<Toaster position="bottom-center" theme="dark" duration={3000}/>

{#if showMenu}
	<div bind:this={menuParentNode} class="w-screen h-screen z-50 absolute bg-black/50"></div>
	<div use:clickoutside={{ limit: { parent: menuParentNode } }} onclickoutside={closeMenu} class="w-[12rem] p-4 absolute top-16 right-10 md:right-32 lg:right-48 xl:right-64 2xl:right-96 z-50 flex flex-col rounded shadow bg-foreground">
		<a href="/user/{data.user.id}" class="flex flex-col items-center">
			<img src="{data.user.avatar || DefaultProfile}" alt="User's Profile" class="w-20 h-20 mb-2 object-cover rounded-full">
			<span class="text-xl font-bold">{data.user?.username}</span>
			<div class="px-1.5 py-0.5 flex items-center space-x-1.5 rounded bg-accent">
				<IconCoins />
				<span class="text-sm">{data.wallet.coins}</span>
			</div>
		</a>
		
		<hr class="my-3">

		<a href="/bookmarks" onclick={closeMenu} class="py-0.5 text-left transition-all hover:font-medium">My Bookmarks</a>
		<a href="/user/{data.user.id}" onclick={closeMenu} class="py-0.5 text-left transition-all hover:font-medium">My Profile</a>
		<a href="/my-novels" onclick={closeMenu} class="py-0.5 text-left transition-all hover:font-medium">My Novels</a>
		<a href="/transactions" onclick={closeMenu} class="py-0.5 text-left transition-all hover:font-medium">My Transactions</a>

		<hr class="my-3">

		<a href="/coin-store" onclick={closeMenu} class="py-0.5 text-left transition-all hover:font-medium">Coin Store</a>
		<a href="/help" onclick={closeMenu} class="py-0.5 text-left transition-all hover:font-medium">Help</a>

		<hr class="my-3">
		
		<button onclick={logout} class="py-0.5 text-left transition-colors text-red-400 hover:text-red-500 hover:font-medium">
			<span>Sign Out</span>
		</button>
	</div>
{/if}

{#if showSearch}
	<div bind:this={searchParentNode} class="w-screen h-screen z-50 absolute bg-black/50"></div>
	<div use:clickoutside={{ limit: { parent: searchParentNode } }} onclickoutside={closeSearch} class="p-4 absolute top-16 right-7 md:right-[20rem] z-50 flex flex-col rounded shadow bg-foreground">
		<!-- <input type="search" name="searchbar"> -->
		<div class="mr-2 flex items-center relative">
			<IconSearch class="absolute right-[10px]" weight="bold" size={18} color="#ffffff" />
			<input type="search" placeholder="Search" name="searchbar" class="w-[20rem] pl-3.5 pr-8 py-1.5 rounded-md border-transparent font-medium text-white placeholder:text-white focus:placeholder:text-transparent bg-foreground-alt">
		</div>
	</div>
{/if}

<svelte:head>
	<title>Novel Lounge</title>
</svelte:head>

<nav class="w-full px-10 md:px-32 lg:px-48 xl:px-64 2xl:px-96 py-4 border-b-2 border-accent flex justify-between bg-background">
	<a href="/">
		<img src="{Logo}" alt="logo.png" class="h-[2.5rem]">
	</a>
	<div class="flex">
		<div class="mr-2 hidden md:flex items-center relative">
			<IconSearch class="absolute right-[10px]" weight="bold" size={18} color="#ffffff" />
			<input type="search" placeholder="Search" name="searchbar" class="w-[20rem] pl-3.5 pr-8 py-1.5 rounded-md border-transparent font-medium text-white placeholder:text-white focus:placeholder:text-transparent bg-foreground-alt">
		</div>
		<button type="button" onclick={() => showSearch = !showSearch} class="mr-4 md:hidden">
			<IconSearch weight="bold" size={20} color="#ffffff" />
		</button>
		<div class="flex items-center">
			{#if user}
				<button onclick="{openMenu}" class="rounded-full overflow-clip">
					<img src="{user.avatar || DefaultProfile}" alt="User's Profile" class="w-10 h-10 object-cover rounded-full">
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

<main class="max-w-screen min-h-full my-8 mx-10 md:mx-32 lg:mx-48 xl:mx-64 2xl:mx-96">
	{@render children()}
</main>

<footer class="mx-w-screen py-8 mx-10 md:mx-32 lg:mx-48 xl:mx-64 2xl:mx-96">
	<img src={Logo} alt="'Novel Lounge' logo" class="h-8">
	<p class="text-sm">© 2024 All rights reserved.</p>
</footer>