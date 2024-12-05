<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import Search from "phosphor-svelte/lib/MagnifyingGlass";
    import Logo from "$lib/images/icon.png";
	import DefaultProfile from "$lib/images/placeholder-profile.png"
    import { currentUser, pb } from "$lib/utils/pocketbase";
    import type { PageData } from "./$types";
    import type { Snippet } from "svelte";
    import { browser } from '$app/environment';

	let { data, children }: {data: PageData, children: Snippet} = $props();
	let showMenu = $state(false);

	// ClickOutside
	let parentNode: HTMLElement;
	function clickOutside() {
		showMenu = false;
	}

	async function logout() {
		const res = await fetch('/api/logout', { method: 'POST' });
		if (browser && res.ok) {
			location.reload();
		}
	}
</script>

<div class="w-full max-w-screen">
	{#if currentUser && showMenu}
		<div bind:this={parentNode} class="w-screen h-screen z-50 absolute bg-black/35"></div>
		<div use:clickoutside={{ limit: { parent: parentNode } }} onclickoutside={clickOutside} class="w-fit p-4 absolute top-16 right-8 z-50 flex flex-col rounded shadow bg-foreground">
			<a href="/user/{data.user?.id}" class="flex flex-col items-center">
				<img src="{data.user?.profilePicture ?? DefaultProfile}" alt="User's Profile" class="w-14 mb-1">
				<span class="text-xl font-bold">{data.user?.username}</span>
			</a>
			
			<hr class="my-2">
			<a href="/user/{data.user?.id}" class="text-left">
				<span>My Bookmarks</span>
			</a>
			<a href="/user/{data.user?.id}" class="text-left">
				<span>My Profile</span>
			</a>
			<hr class="my-2">
			<button onclick={logout} class="text-left text-red-400">
				<span>Sign Out</span>
			</button>
		</div>
	{/if}

	<nav class="w-full px-8 py-4 border-b-2 border-accent sticky top-0 z-10 flex justify-between bg-background">
		<img src="{Logo}" alt="logo.png" class="h-[2.5rem]">
		<div class="flex items-center relative">
			<Search class="absolute right-[10px]" weight="bold" size={18} color="#ffffff" />
			<input type="search" placeholder="Search" name="searchbar" class="w-[26rem] pl-3.5 pr-8 py-1.5 rounded-md border-transparent font-medium text-white placeholder:text-white focus:placeholder:text-transparent bg-background-alt">
		</div>
		<div class="flex items-center">
			{#if data.user}
				<button onclick="{() => showMenu = !showMenu}">
					<img src="{data.user?.profilePicture ?? DefaultProfile}" alt="User's Profile" class="w-[2.4rem]">
				</button>
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